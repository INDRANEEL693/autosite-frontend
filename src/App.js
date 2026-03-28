import { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [html, setHtml] = useState("");

  const generate = async () => {
    if (!prompt) return;

    try {
      const res = await axios.post("http://localhost:5000/generate", { prompt });
      setHtml(res.data.html);
    } catch (err) {
      console.error(err);
      alert("Error generating website");
    }
  };

  const download = () => {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "website.html";
    a.click();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>AutoSite Builder</h1>

      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g. todo app with add/delete"
        style={{ width: "60%", padding: 10 }}
      />

      <button onClick={generate} style={{ marginLeft: 10 }}>
        Generate
      </button>

      <button onClick={download} style={{ marginLeft: 10 }}>
        Download
      </button>

      {/* CODE VIEW */}
      <pre
        style={{
          marginTop: 20,
          background: "#111",
          color: "#0f0",
          padding: 10,
          maxHeight: 200,
          overflow: "auto"
        }}
      >
        {html}
      </pre>

      {/* PREVIEW */}
      <iframe
        title="preview"
        srcDoc={html}
        sandbox="allow-scripts"
        style={{
          width: "100%",
          height: "500px",
          marginTop: 20,
          border: "1px solid #ccc",
          background: "#fff"
        }}
      />
    </div>
  );
}

export default App;