const Report = ({ results }) => {
    if (!results.length) return null;
  
    return (
      <div style={{ marginTop: "1rem" }}>
        {results.map((item, idx) => (
          <div key={idx} style={{
            border: "1px solid #ccc",
            padding: "0.5rem",
            marginBottom: "0.5rem",
            borderRadius: "5px"
          }}>
            <strong>{item.type}</strong>: {item.message}
            <pre style={{
              fontSize: "10px",
              background: "#f5f5f5",
              padding: "0.25rem",
              marginTop: "0.25rem"
            }}>
              {item.element}
            </pre>
          </div>
        ))}
      </div>
    );
  };
  
  export default Report;
  