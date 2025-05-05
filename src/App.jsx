import { useState } from "react";
import Report from "./components/Report";
import { runAuditInTab } from "./utils/auditFunctions";

function App() {
  const [results, setResults] = useState([]);

  const handleAudit = async () => {
    console.log("QQQQQQQQQQQQQQQQQQQ");
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
    <div style={{ padding: "1rem", fontFamily: "Arial", minWidth: "300px" }}>
      <h1 style={{ fontWeight: "bold", fontSize: "18px" }}>🕵️ UI Audit</h1>
      <button onClick={handleAudit} style={{
        marginTop: "1rem",
        padding: "0.5rem 1rem",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "4px"
      }}>
        Run Audit
      </button>

      <Report results={results} />
    </div>
  );
}

export default App;
