import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";

// Custom icons (colors)
const redIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [25, 25]
});

const greenIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [25, 25]
});

const yellowIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
  iconSize: [25, 25]
});

// Sample locations (Vijayawada)
const locations = [
  {
    name: "Benz Circle",
    coords: [16.5062, 80.6480],
    density: 85
  },
  {
    name: "MG Road",
    coords: [16.5150, 80.6300],
    density: 55
  },
  {
    name: "Bus Stand",
    coords: [16.5200, 80.6200],
    density: 30
  }
];

// Function to choose color
const getIcon = (density) => {
  if (density > 70) return redIcon;
  if (density > 40) return yellowIcon;
  return greenIcon;
};

const MapView = () => {
  return (
    <MapContainer center={[16.5062, 80.6480]} zoom={13} style={{ height: "400px" }}>
      
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locations.map((loc, index) => (
        <Marker key={index} position={loc.coords} icon={getIcon(loc.density)}>
          
          <Popup>
            <strong>{loc.name}</strong><br />
            Traffic: {loc.density}% <br />
            Status: {loc.density > 70 ? "Heavy 🚨" : loc.density > 40 ? "Moderate ⚠️" : "Smooth ✅"}<br />
            Time: {new Date().toLocaleTimeString()}
          </Popup>

          {/* Circle highlight */}
          <Circle
            center={loc.coords}
            radius={300}
            pathOptions={{
              color:
                loc.density > 70
                  ? "red"
                  : loc.density > 40
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