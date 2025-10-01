import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { Client } from "@notionhq/client";

// API 요청을 처리하는 커스텀 미들웨어 플러그인
const apiMiddlewarePlugin = {
  name: 'api-handler',
  configureServer(server) {
    server.middlewares.use('/api/addTask', async (req, res, next) => {
      // .env 파일의 환경 변수를 사용하여 Notion 클라이언트 초기화
      const notion = new Client({ auth: process.env.NOTION_API_KEY });
      const databaseId = process.env.VITE_NOTION_DATABASE_ID;

      if (req.method !== 'POST') {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'POST 요청만 허용됩니다.' }));
        return;
      }

      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', async () => {
        try {
          const { taskName, dueDate } = JSON.parse(body);

          if (!taskName) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'taskName은 필수 항목입니다.' }));
            return;
          }

          const properties = {
            '이름': { title: [{ text: { content: taskName } }] },
          };

          if (dueDate) {
            properties['마감일'] = { date: { start: dueDate } };
          }

          const notionResponse = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: properties,
          });

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: '성공적으로 추가되었습니다.', data: notionResponse }));

        } catch (error) {
          console.error("미들웨어 Notion API 에러:", error);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: '서버 내부 오류가 발생했습니다.' }));
        }
      });
    });
  }
};

export default defineConfig({
  plugins: [react(), tailwindcss(), apiMiddlewarePlugin],
});