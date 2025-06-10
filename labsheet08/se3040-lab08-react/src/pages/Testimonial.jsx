export default function Testimonial({ quote, name, photo }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "1rem",
      width: "350px",
      margin: "1rem auto",
      background: "#0000"
    }}>
      <img src={photo} alt={name} style={{width: "60px", borderRadius: "50%"}} />
      <blockquote>"{quote}"</blockquote>
      <p>- {name}</p>
    </div>
  );
}
