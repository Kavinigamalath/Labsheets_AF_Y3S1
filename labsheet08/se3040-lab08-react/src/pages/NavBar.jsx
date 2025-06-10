// src/NavBar.jsx
export default function NavBar() {
  return (
    <nav>
      <ul style={{ listStyle: "none", display: "flex", gap: "1rem" }}>
        <li><a href="#home">Home</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}
