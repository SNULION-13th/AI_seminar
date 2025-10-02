/* eslint-env node */
// server.js
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dayjs = require("dayjs");
const cron = require("node-cron");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT || 5175);
const CAL_URL = process.env.CAL_URL?.trim(); // Smithery URL (mcp?api_key=...&profile=...)
const NOTION_DB = process.env.NOTION_DB || "";
const TZ = process.env.TZ || "Asia/Seoul";

// 서버마다 툴 이름이 달라서 순차 시도
const CAL_LIST_TOOLS = ["getEvents", "list_events", "listEvents", "get_events"];

const normalizeBase = (b) => (b || "").replace(/\/+$/, "");
async function callTool(base, tool, args = {}) {
  if (!base) throw new Error("CAL_URL missing");
  const url = `${normalizeBase(base)}/tools/${tool}`;
  const { data } = await axios.post(url, args, { timeout: 25000 });
  return data;
}
async function tryTools(base, tools, args = {}) {
  let lastErr;
  for (const t of tools) {
    try {
      return await callTool(base, t, args);
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error("no-tools-worked");
}
const dayRangeUTC = (d) => ({ start: `${d}T00:00:00Z`, end: `${d}T23:59:59Z` });

async function fetchCalendarBullets(date) {
  const { start, end } = dayRangeUTC(date);
  const payload = { timeMin: start, timeMax: end, tz: TZ };

  const result = await tryTools(CAL_URL, CAL_LIST_TOOLS, payload);
  const events = result?.events ?? result ?? [];

  const bullets = (Array.isArray(events) ? events : [])
    .slice(0, 12)
    .map((ev) => {
      const title = ev.summary || ev.title || "일정";
      const t = ev.start?.dateTime || ev.start?.date || "";
      const hhmm = t?.slice(11, 16) || "";
      return `• ${hhmm ? hhmm + " " : ""}${title}`;
    });

  return { events, bullets, raw: result };
}

function makeNotionPayload({
  date,
  bullets = [],
  tasks = [],
  gratitude = [],
  notes = "",
  mood = "😀",
  score = 7,
}) {
  const title = `${date} 일기`;
  return {
    pages: [
      {
        parent: { database_id: NOTION_DB },
        properties: {
          Name: { title: [{ text: { content: title } }] },
          Date: { date: { start: date } },
          Mood: { select: { name: mood } },
          Score: { number: Number(score) },
        },
        children: [
          {
            object: "block",
            type: "heading_2",
            heading_2: { rich_text: [{ text: { content: "오늘 일정" } }] },
          },
          ...(bullets.length ? bullets : ["(일정 없음)"]).map((t) => ({
            object: "block",
            type: "bulleted_list_item",
            bulleted_list_item: { rich_text: [{ text: { content: t } }] },
          })),
          {
            object: "block",
            type: "heading_2",
            heading_2: { rich_text: [{ text: { content: "Tasks" } }] },
          },
          ...tasks.map((t) => ({
            object: "block",
            type: "to_do",
            to_do: { rich_text: [{ text: { content: t } }], checked: false },
          })),
          {
            object: "block",
            type: "heading_2",
            heading_2: { rich_text: [{ text: { content: "감사 3가지" } }] },
          },
          ...(gratitude.length ? gratitude : ["", "", ""])
            .slice(0, 3)
            .map((g, i) => ({
              object: "block",
              type: "bulleted_list_item",
              bulleted_list_item: {
                rich_text: [{ text: { content: `${i + 1}) ${g}` } }],
              },
            })),
          {
            object: "block",
            type: "heading_2",
            heading_2: { rich_text: [{ text: { content: "Notes" } }] },
          },
          {
            object: "block",
            type: "paragraph",
            paragraph: { rich_text: [{ text: { content: notes } }] },
          },
        ],
      },
    ],
  };
}

/* ───── API ───── */

// 서버 상태 확인
app.get("/health", (req, res) =>
  res.json({ ok: true, port: PORT, tz: TZ, hasCal: !!CAL_URL })
);

// 캘린더 디버그(요약)
app.get("/debug/cal", async (req, res) => {
  try {
    const date = req.query.date || dayjs().format("YYYY-MM-DD");
    const out = await fetchCalendarBullets(date);
    res.json({
      date,
      bullets: out.bullets,
      eventsCount: out.events.length,
      sample: out.events[0] ?? null,
    });
  } catch (e) {
    res.status(500).json({
      error: "calendar_failed",
      message: e.message,
      status: e.response?.status,
      data: e.response?.data,
    });
  }
});

// 오늘 일정 가져오기
app.get("/api/journal", async (req, res) => {
  try {
    const date = req.query.date || dayjs().format("YYYY-MM-DD");
    const { events, bullets } = await fetchCalendarBullets(date);
    res.json({ date, events, bullets });
  } catch (e) {
    res.status(500).json({
      error: "calendar_failed",
      message: e.message,
      status: e.response?.status,
      data: e.response?.data,
    });
  }
});

// 노션 업로드용 payload 만들기(요청이 오면 반환만)
app.post("/api/journal", async (req, res) => {
  try {
    const date = req.body.date || dayjs().format("YYYY-MM-DD");
    const payload = makeNotionPayload({ ...req.body, date });
    res.json({ ok: true, payload });
  } catch (e) {
    res.status(500).json({ error: "notion_failed", message: e.message });
  }
});

/* ───── Cron (07:30 KST) ───── */
cron.schedule(
  "30 7 * * *",
  async () => {
    try {
      const date = dayjs().format("YYYY-MM-DD");
      const { bullets } = await fetchCalendarBullets(date);
      console.log("⏰ payload ready for", date, bullets.length, "items");
    } catch (e) {
      console.error("cron-error", e.message);
    }
  },
  { scheduled: true, timezone: TZ }
);

app.listen(PORT, () =>
  console.log(`BulletSync API on http://localhost:${PORT}`)
);

// 맨 아래 app.listen 위 아무 데나 추가
app.get("/health", (req, res) => {
  res.json({
    ok: true,
    uptime: process.uptime(),
    now: new Date().toISOString(),
  });
});

app.get("/", (req, res) => {
  res
    .type("text/plain")
    .send(
      "BulletSync running.\n" +
        "Try: /health\n" +
        "or  : /api/journal?date=YYYY-MM-DD"
    );
});
