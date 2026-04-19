import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("auth") === "true"
  );

  return (
    <Router>
      {isLoggedIn && <Navbar />}

      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
        />

        <Route
          path="/analytics"
          element={isLoggedIn ? <Analytics /> : <Navigate to="/" />}
        />

        <Route
          path="/reports"
          element={isLoggedIn ? <Reports /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;