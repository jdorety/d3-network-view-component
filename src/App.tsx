import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import useSWR from "swr";
import "./App.css";

const baseUrl = import.meta.env.VITE_NEXUS_URL;
const apiKey = import.meta.env.VITE_API_KEY;
console.log(baseUrl, apiKey);
const url = new URL("/fluree/query", baseUrl);

function App() {
  const [count, setCount] = useState(0);
  const query = {
    from: "fluree-jld/387028092977998",
    where: { "@id": "?s", "?p": "?o" },
    select: ["?s", "?p", "?o"],
  };
  const { data } = useSWR(url, (url) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(query),
    })
      .then((res) => {
        console.log("status", res.status);
        return res.json();
      })
      .catch((err) => {
        console.error(err);
      })
  );

  console.log({ data });
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
