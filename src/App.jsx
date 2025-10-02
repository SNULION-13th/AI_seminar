// App.jsx
import { useEffect, useState } from "react";
import { initMCP } from "./api/mcpClient";

function App() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function run() {
      const client = await initMCP();

      // listTools로 schema 확인
      const tools = await client.listTools();
      console.log("Tools:", JSON.stringify(tools, null, 2));

      // schema에 맞게 arguments 전달해야 함!
      const result = await client.callTool({
        name: "get_weather_by_datetime_range",
        arguments: {
          city: "Seoul",
          start_date: "2025-09-01",
          end_date: "2025-09-05",
        },
      });

      if (mounted) setWeather(result);
    }

    run();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      <h1>Weather Forecast</h1>
      <pre>{JSON.stringify(weather, null, 2)}</pre>
    </div>
  );
}

export default App;
