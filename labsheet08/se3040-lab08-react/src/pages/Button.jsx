export default function Button({ children, size = "medium", styleType = "primary", onClick }) {
  const sizes = {
    small: "0.5rem 1rem",
    medium: "0.75rem 1.5rem",
    large: "1rem 2rem"
  };
  const styles = {
    primary: { background: "#007bff", color: "white" },
    secondary: { background: "#6c757d", color: "white" }
  };
  return (
    <button
      onClick={onClick}
      style={{
        ...styles[styleType],
        padding: sizes[size],
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        margin: "0.5rem"
      }}
    >
      {children}
    </button>
  );
}
