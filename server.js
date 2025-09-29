import "dotenv/config";
import express from "express";
import cors from "cors";
import cron from "node-cron";
import db from "./db.js"; // db.js에서 db 객체 가져오기

const app = express();
const port = 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// --- API 라우트 설정 ---

// GET /api/todos - 모든 할 일 목록 가져오기
app.get("/api/todos", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM todos ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error("GET /api/todos Error:", error);
    res
      .status(500)
      .json({ error: "데이터베이스 조회 중 오류가 발생했습니다." });
  }
});

// POST /api/todos - 새로운 할 일 추가
app.post("/api/todos", async (req, res) => {
  try {
    const { task } = req.body;
    if (!task) {
      return res.status(400).json({ error: "할 일 내용(task)이 필요합니다." });
    }
    const [result] = await db.query("INSERT INTO todos (task) VALUES (?)", [
      task,
    ]);
    const [[newTodo]] = await db.query("SELECT * FROM todos WHERE id = ?", [
      result.insertId,
    ]);
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("POST /api/todos Error:", error);
    res
      .status(500)
      .json({ error: "데이터베이스 추가 중 오류가 발생했습니다." });
  }
});

// PUT /api/todos/:id - 할 일 상태 업데이트 (완료/미완료)
app.put("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { is_completed } = req.body;

    if (typeof is_completed !== "boolean") {
      return res
        .status(400)
        .json({ error: "is_completed는 boolean 타입이어야 합니다." });
    }

    await db.query("UPDATE todos SET is_completed = ? WHERE id = ?", [
      is_completed,
      id,
    ]);
    const [[updatedTodo]] = await db.query("SELECT * FROM todos WHERE id = ?", [
      id,
    ]);
    res.json(updatedTodo);
  } catch (error) {
    console.error(`PUT /api/todos/${req.params.id} Error:`, error);
    res
      .status(500)
      .json({ error: "데이터베이스 업데이트 중 오류가 발생했습니다." });
  }
});

// DELETE /api/todos/:id - 할 일 삭제
app.delete("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query("DELETE FROM todos WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "해당 ID의 할 일을 찾을 수 없습니다." });
    }
    res.status(204).send(); // No Content
  } catch (error) {
    console.error(`DELETE /api/todos/${req.params.id} Error:`, error);
    res
    res.status(500).json({ error: "데이터베이스 삭제 중 오류가 발생했습니다." });
  }
});



// --- Bulk Insert Calendar Events ---
app.post("/api/calendar/bulk-insert", async (req, res) => {
  try {
    const eventsToInsert = req.body.events; // Expecting an array of { summary, id }
    if (!Array.isArray(eventsToInsert) || eventsToInsert.length === 0) {
      return res.status(400).json({ error: "No events provided for bulk insert." });
    }

    const connection = await db.getConnection();
    let insertedCount = 0;

    try {
      for (const event of eventsToInsert) {
        const { summary, id } = event;
        if (!summary || !id) {
          console.warn("Skipping event due to missing summary or id:", event);
          continue;
        }

        // Check if event already exists to prevent duplicates
        const [rows] = await connection.query(
          "SELECT id FROM todos WHERE google_calendar_event_id = ?",
          [id]
        );

        if (rows.length === 0) {
          const eventDate = event.start.dateTime || event.start.date;
          const mysqlTimestamp = new Date(eventDate).toISOString().slice(0, 19).replace('T', ' ');

          await connection.query(
            "INSERT INTO todos (task, google_calendar_event_id, created_at) VALUES (?, ?, ?)",
            [summary, id, mysqlTimestamp]
          );
          insertedCount++;
        }
      }
    } finally {
      connection.release();
    }

    res.json({ message: `Bulk insert successful. Added ${insertedCount} new event(s).` });

  } catch (error) {
    console.error("Error during bulk insert of calendar events:", error);
    res.status(500).json({ error: "Failed to bulk insert calendar events." });
  }
});

// --- Reusable Sync Function ---
const syncGoogleCalendar = async () => {
  console.log('Running scheduled calendar sync...');
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const timeMin = today.toISOString();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const timeMax = tomorrow.toISOString();

    // Note: This assumes the tool environment can access the calendar API.
    // In a real-world scenario, you'd use the Google Calendar API library directly here.
    const eventsResponse = await default_api.list_events({
      calendar_id: "primary",
      timeMin: timeMin,
      timeMax: timeMax,
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = eventsResponse.items || [];
    if (events.length === 0) {
      console.log('No new events to sync today.');
      return;
    }

    const connection = await db.getConnection();
    let newEventsCount = 0;

    try {
      for (const event of events) {
        const [rows] = await connection.query(
          "SELECT id FROM todos WHERE google_calendar_event_id = ?",
          [event.id]
        );

        if (rows.length === 0) {
          const task = event.summary;
          const eventDate = event.start.dateTime || event.start.date;
          const mysqlTimestamp = new Date(eventDate).toISOString().slice(0, 19).replace('T', ' ');

          await connection.query(
            "INSERT INTO todos (task, google_calendar_event_id, created_at) VALUES (?, ?, ?)",
            [task, event.id, mysqlTimestamp]
          );
          newEventsCount++;
        }
      }
    } finally {
      connection.release();
    }

    if (newEventsCount > 0) {
      console.log(`Sync successful. Added ${newEventsCount} new event(s).`);
    }

  } catch (error) {
    console.error("Error during scheduled calendar sync:", error);
  }
};

// --- Google OAuth2 Callback ---
app.get("/oauth2callback", async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send("Authorization code not found.");
  }

  try {
    console.log("Received authorization code:", code);
    res.send("Authentication successful! Please copy the authorization code from the server console and provide it to the CLI agent.");
  } catch (error) {
    console.error("Error processing auth code:", error);
    res.status(500).send("Authentication failed. Please check server logs.");
  }
});


// --- 서버 시작 및 테이블 자동 생성 ---

const createTodosTable = async () => {
  const connection = await db.getConnection();
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        task VARCHAR(255) NOT NULL,
        is_completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP,
        google_calendar_event_id VARCHAR(255) NULL
      )
    `);
    console.log("✅ `todos` 테이블이 성공적으로 준비되었습니다.");
  } finally {
    connection.release();
  }
};

const startServer = async () => {
  try {
    // 서버 시작 전 테이블 생성 또는 확인
    await createTodosTable();

    // Schedule a job to run every hour to sync calendar
    cron.schedule('0 * * * *', syncGoogleCalendar, {
      scheduled: true,
      timezone: "Asia/Seoul"
    });

    app.listen(port, () => {
      console.log(`🚀 서버가 http://localhost:${port} 에서 실행 중입니다.`);
      console.log('🕒 Google Calendar 자동 동기화가 매시간 정각에 실행됩니다.');
    });
  } catch (err) {
    console.error(
      "❌ MySQL 데이터베이스 연결 또는 테이블 생성에 실패했습니다:",
      err
    );
    process.exit(1);
  }
};

startServer();