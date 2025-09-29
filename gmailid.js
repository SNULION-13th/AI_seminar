import { google } from "googleapis";

async function getLatestMessageId(oauth2Client) {
  const gmail = google.gmail({ version: "v1", auth: oauth2Client });
  const { data } = await gmail.users.messages.list({
    userId: "me",
    maxResults: 1,
  });
  console.log(data.messages?.[0]?.id);
  return data.messages?.[0]?.id; // <- 이 값을 Hero.jsx에 넣기
}
