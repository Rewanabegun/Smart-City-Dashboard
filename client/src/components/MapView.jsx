import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import L from "leaflet";

const socket = io("http://localhost:5001");

// Icons
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

const getIcon = (density) => {
  if (density > 80) return redIcon;
  if (density > 50) return yellowIcon;
  return greenIcon;
};

// Initial fallback data
const initialLocations = [
  { name: "Benz Circle", coords: [16.5062, 80.6480], density: 40 },
  { name: "MG Road", coords: [16.5150, 80.6300], density: 30 },
  { name: "Bus Stand", coords: [16.5200, 80.6200], density: 20 }
];

const MapView = ({ traffic }) => {
  const [locations, setLocations] = useState(initialLocations);
  const [notifications, setNotifications] = useState([]);

  // 🔴 MAIN FIX: use real socket updates
  useEffect(() => {
    socket.on("trafficUpdate", (data) => {
      // Expecting: { name, density }
      setLocations((prev) =>
        prev.map((loc) =>
          loc.name === data.name
            ? { ...loc, density: data.density }
            : loc
        )
      );
    });

    return () => socket.off("trafficUpdate");
  }, []);

  // 🔔 Notification system (FIXED)
  useEffect(() => {
    setNotifications((prev) => {
      let updated = [...prev];

      locations.forEach((loc) => {
        const exists = updated.find((n) => n.name === loc.name);

        // 🚨 Add alert for heavy traffic
        if (loc.density > 80 && !exists) {
          updated.push({
            id: Date.now() + Math.random(),
            name: loc.name,
            message: `🚨 Heavy Traffic at ${loc.name} (${loc.density}%)`
          });
        }

        // ✅ Remove alert if traffic normal
        if (loc.density <= 80 && exists) {
          updated = updated.filter((n) => n.name !== loc.name);
        }
      });

      return updated;
    });
  }, [locations]);

  return (
    <div style={{ position: "relative" }}>

      {/* 🔔 Notifications */}
      <div className="notification-container">
        {notifications.map((n) => (
          <div key={n.id} className="notification">
            {n.message}
          </div>
        ))}
      </div>

      {/* 🗺️ MAP */}
      <MapContainer
        center={[16.5062, 80.6480]}
        zoom={13}
        style={{ height: "400px", borderRadius: "12px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {locations.map((loc, index) => (
          <Marker
            key={index}
            position={loc.coords}
            icon={getIcon(loc.density)}
            eventHandlers={{
              mouseover: (e) => e.target.openPopup(),
              mouseout: (e) => e.target.closePopup()
            }}
          >
            <Popup>
              <strong>{loc.name}</strong><br />
              🚦 Traffic: {loc.density}% <br />
              Status:{" "}
              {loc.density > 80
                ? "Heavy 🚨"
                : loc.density > 50
                ? "Moderate ⚠️"
                : "Smooth ✅"}<br />
              🕒 {new Date().toLocaleTimeString()}
            </Popup>

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
    </div>
  );
};

export default MapView;