// mcpClient.js
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

let client = null;

export async function initMCP() {
  if (client) return client; // 이미 연결된 클라이언트 재사용

  const url = new URL(
    "https://server.smithery.ai/@isdaniel/mcp_weather_server/mcp"
  );
  url.searchParams.set("api_key", "9feef763-cacb-4832-bfba-e92ca78a6a42");
  const serverUrl = url.toString();

  const transport = new StreamableHTTPClientTransport(serverUrl);
  client = new Client({ name: "My App", version: "1.0.0" });

  await client.connect(transport); // 여기서 초기화까지 끝남
  console.log("✅ MCP connected");
  return client;
}
