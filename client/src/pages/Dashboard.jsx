import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import Navbar from "../components/Navbar";
import TrafficChart from "../components/TrafficChart";
import PollutionChart from "../components/PollutionChart";
import MapView from "../components/MapView";
import EventsList from "../components/EventsList";

const socket = io("http://localhost:5001");

const Dashboard = () => {
  const [traffic, setTraffic] = useState([]);
  const [pollution, setPollution] = useState([]);

  useEffect(() => {
    socket.on("trafficUpdate", (data) => {
      setTraffic((prev) => [...prev.slice(-20), data]);
    });

    setInterval(() => {
      const p = {
        time: new Date().toLocaleTimeString(),
        aqi: Math.floor(Math.random() * 300),
      };
      setPollution((prev) => [...prev.slice(-20), p]);
    }, 3000);

    return () => socket.off("trafficUpdate");
  }, []);

  const latestTraffic = traffic.slice(-1)[0]?.density || 0;
  const latestAQI = pollution.slice(-1)[0]?.aqi || 0;

  return (
    <>
      

      <div className="container">

        <h1 className="title">Vijayawada Smart City Dashboard</h1>

        {/* STATS */}
        <div className="grid grid-3">

          <div className="card">
            <div className="subtitle">Traffic Density</div>
            <h2 className="green">{latestTraffic}</h2>
          </div>

          <div className="card">
            <div className="subtitle">Air Quality (AQI)</div>
            <h2 className="red">{latestAQI}</h2>
          </div>

          <div className="card">
            <div className="subtitle">City Status</div>
            <h2 className="yellow">
  {latestAQI > 200 ? "Unhealthy 🚨" : "Moderate ✅"}
</h2>
          </div>

        </div>

        {/* CHARTS */}
        <div className="grid grid-2" style={{ marginTop: "30px" }}>

          <div className="card">
            <div className="subtitle">Traffic Flow</div>
            <TrafficChart data={traffic} />
          </div>

          <div className="card">
            <div className="subtitle">Pollution Levels</div>
            <PollutionChart data={pollution} />
          </div>

        </div>

        {/* MAP */}
        <div className="card" style={{ marginTop: "30px" }}>
          <div className="subtitle">City Map</div>
          <MapView />
        </div>

        {/* EVENTS */}
        <div className="card" style={{ marginTop: "30px" }}>
          <EventsList />
        </div>

      </div>
    </>
  );
};

export default Dashboard;