import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
    window.location.reload(); // refresh state
  };

  return (
    <div className="navbar">
      <h2>🚦 Smart City Dashboard</h2>

      <div>
        <span
          className={location.pathname === "/dashboard" ? "active" : ""}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </span>

        <span
          className={location.pathname === "/analytics" ? "active" : ""}
          onClick={() => navigate("/analytics")}
        >
          Analytics
        </span>

        <span
          className={location.pathname === "/reports" ? "active" : ""}
          onClick={() => navigate("/reports")}
        >
          Reports
        </span>

        {/* 🔴 LOGOUT */}
        <span className="logout" onClick={handleLogout}>
          Logout
        </span>
      </div>
    </div>
  );
};

export default Navbar;