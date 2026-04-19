import TrafficChart from "../components/TrafficChart";

const Analytics = () => {
  return (
    <div className="container">
      <h1 className="title">📊 Analytics</h1>

      <div className="card">
        <p>Traffic Trends</p>
        <TrafficChart data={[
          { time: "10:00", density: 40 },
          { time: "10:10", density: 70 },
          { time: "10:20", density: 55 }
        ]} />
      </div>
    </div>
  );
};

export default Analytics;