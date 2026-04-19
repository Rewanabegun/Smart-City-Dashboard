import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔥 ALWAYS RESET LOGIN ON REFRESH
  useEffect(() => {
    localStorage.removeItem("auth");
    setIsLoggedIn(false);
  }, [setIsLoggedIn]);

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      localStorage.setItem("auth", "true");
      setIsLoggedIn(true);
      navigate("/dashboard");
    } else {
      alert("Invalid Credentials ❌");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">

        <h2>Smart City Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p className="hint">Use: admin / 1234</p>

      </div>
    </div>
  );
};

export default Login;