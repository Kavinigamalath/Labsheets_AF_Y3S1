export default function Card({ image, title, description }) {
  return (
    <div style={{border: "1px solid #ddd", borderRadius: "8px", width: "300px", padding: "1rem"}}>
      <img src={image} alt={title} style={{width: "100%", borderRadius: "8px"}} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
