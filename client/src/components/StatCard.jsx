const StatCard = ({ title, value }) => {
  return (
    <div style={{
      padding: "15px",
      background: "#f5f5f5",
      borderRadius: "10px",
      width: "200px"
    }}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
};

export default StatCard;