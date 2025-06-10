export default function Banner({ message, buttonText, onClick }) {
  return (
    <div style={{
      background: "linear-gradient(90deg, #ff7e5f, #feb47b)",
      color: "#fff",
      padding: "2rem",
      borderRadius: "8px",
      margin: "1rem 0",
      textAlign: "center"
    }}>
      <h2>{message}</h2>
      <button 
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1.5rem",
          background: "#fff",
          color: "#ff7e5f",
          border: "none",
          borderRadius: "4px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
}



