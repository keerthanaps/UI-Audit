
// App.js

import { useState } from "react";
import Report from "./components/Report";
import { runAuditInTab, downloadHTMLReport , downloadJSONReport } from "./utils/auditFunctions";

function App() {
  const [results, setResults] = useState([]);

  const handleAudit = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: runAuditInTab,
      },
      (results) => {
        const [data] = results;
        setResults(data.result);
      }
    );
  };

  return (
    <div style={{
      padding: "1rem",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      minWidth: "350px",
      background: "#f8f9fa",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
    }}>
      <h1 style={{
        fontSize: "20px",
        marginBottom: "1rem",
        color: "#343a40"
      }}>🕵️ UI Audit</h1>

      <button onClick={handleAudit} style={{
        padding: "10px 15px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
        transition: "background-color 0.3s"
      }}
        onMouseOver={e => e.target.style.backgroundColor = "#0056b3"}
        onMouseOut={e => e.target.style.backgroundColor = "#007bff"}
      >
        Run Audit
      </button>

      <div style={{ marginTop: "1.5rem" }}>
        <Report results={results} />
        {results.length > 0 && (
  <div style={{ marginTop: "1rem" }}>
    <button
      onClick={() => downloadHTMLReport(results)}
      style={{
        marginRight: "0.5rem",
        padding: "0.5rem 1rem",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "4px"
      }}
    >
      Download HTML Report
    </button>

    <button
      onClick={() => downloadJSONReport(results)}
      style={{
        padding: "0.5rem 1rem",
        backgroundColor: "#6c757d",
        color: "white",
        border: "none",
        borderRadius: "4px"
      }}
    >
      Download JSON Report
    </button>
   

  </div>
)}
      </div>
    </div>
  );
}

export default App;
