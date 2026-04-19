// ================= IMPORTS =================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

// ================= APP SETUP =================
const app = express();
const server = http.createServer(app);

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("Smart City Server Running 🚀");
});

// ================= MONGODB CONNECTION =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("Mongo Error ❌", err));

// ================= SOCKET.IO =================
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// ================= SOCKET CONNECTION =================
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  // 🔥 Real-time traffic data every 3 sec
  const interval = setInterval(() => {
    const liveData = {
      time: new Date().toLocaleTimeString(),
      density: Math.floor(Math.random() * 100)
    };

    socket.emit("trafficUpdate", liveData);
  }, 3000);

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
    clearInterval(interval); // ✅ prevent memory leak
  });
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});