import { useState, useEffect } from "react";
import "./auth.css";
import logo from "./assets/logo.png";


import "./auth.css";

function Login({ onLogin, onSignup }) {
  const [uid, setUid] = useState("");
  const [error, setError] = useState("");

    useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);


  const handleLogin = async () => {
  // Frontend validation
  if (!uid) {
    setError("UID is required");
    return;
  }

  if (uid.length != 6) {
    setError("UID must be exactly 6 characters");
    return;
  }

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }

    // Success
setError("");
localStorage.setItem("uid", data.uid);
localStorage.setItem("name", data.name);

// redirect to TaskPage
window.location.href = "/";

  } catch (err) {
    setError("Server error. Please try again.");
  }
};


  return (
    <div className="auth-container">
      <div className="auth-card">
      <img src={logo} alt="App Logo" className="auth-logo" />
        <h2 className="auth-title">Login</h2>

        <input
          className="auth-input"
          placeholder="Enter UID"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
        />

        {error && (
  <div className="auth-toast">
    {error}
  </div>
)}


        <button className="auth-button" onClick={handleLogin}>
          Login
        </button>

        <div className="auth-link">
          Don’t have a UID? <span onClick={onSignup}>Sign up</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
