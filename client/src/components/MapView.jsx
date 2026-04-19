import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import L from "leaflet";

// 🔌 SOCKET CONNECTION
const socket = io("http://localhost:5001");

// 🎯 ICONS
const redIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [30, 30]
});

const yellowIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
  iconSize: [30, 30]
});

const greenIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [30, 30]
});

// 🎯 ICON BASED ON DENSITY
const getIcon = (density) => {
  if (density > 80) return redIcon;
  if (density > 50) return yellowIcon;
  return greenIcon;
};

// 📍 INITIAL LOCATIONS (VIJAYAWADA)
const initialLocations = [
  { name: "Benz Circle", coords: [16.5062, 80.6480], density: 40 },
  { name: "MG Road", coords: [16.5150, 80.6300], density: 30 },
  { name: "Bus Stand", coords: [16.5200, 80.6200], density: 20 }
];

const MapView = () => {
  const [locations, setLocations] = useState(initialLocations);

  // 🔄 REAL-TIME UPDATE FROM SOCKET
  useEffect(() => {
    socket.on("trafficUpdate", (data) => {
      console.log("Map received:", data);

      setLocations((prev) =>
        prev.map((loc) => ({
          ...loc,
          density: Math.floor(Math.random() * 100) // simulate per location
        }))
      );
    });

    return () => socket.off("trafficUpdate");
  }, []);

  // 🚨 ALERT SYSTEM
  useEffect(() => {
    locations.forEach((loc) => {
      if (loc.density > 80) {
        alert(`🚨 High Traffic at ${loc.name}: ${loc.density}%`);
      }
    });
  }, [locations]);

  return (
    <MapContainer
      center={[16.5062, 80.6480]}
      zoom={13}
      style={{ height: "400px", borderRadius: "12px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locations.map((loc, index) => (
        <Marker
          key={index}
          position={loc.coords}
          icon={getIcon(loc.density)}

          // 🖱️ HOVER POPUP
          eventHandlers={{
            mouseover: (e) => e.target.openPopup(),
            mouseout: (e) => e.target.closePopup()
          }}
        >
          <Popup>
            <strong>{loc.name}</strong><br />
            🚦 Traffic: {loc.density}% <br />
            Status: {loc.density > 80 ? "Heavy 🚨" : loc.density > 50 ? "Moderate ⚠️" : "Smooth ✅"}<br />
            🕒 Time: {new Date().toLocaleTimeString()}
          </Popup>

          {/* 🔵 AREA HIGHLIGHT */}
          <Circle
            center={loc.coords}
            radius={300}
            pathOptions={{
              color:
                loc.density > 80
                  ? "red"
                  : loc.density > 50
                  ? "yellow"
                  : "green",
              fillOpacity: 0.2
            }}
          />
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;