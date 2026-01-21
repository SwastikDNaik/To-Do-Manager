import { useState, useEffect } from "react";
import "./auth.css";
import logo from "./assets/logo.png";


function Signup({ onBackToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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


  const handleSignup = async () => {
  if (!name || !email || !password) {
    setError("All fields are required");
    return;
  }

  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }

    setError("");
    setUid(data.uid);

  } catch (err) {
    setError("Server error. Please try again.");
  }
};


  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src={logo} alt="App Logo" className="auth-logo" />

        <h2 className="auth-title">Create Account</h2>
        {error && (
      <div className="auth-toast">
        {error}
      </div>
    )}
        {!uid ? (
          <>
            <input className="auth-input" placeholder="Name" value={name}
              onChange={(e) => setName(e.target.value)} />

            <input className="auth-input" placeholder="Email" value={email}
              onChange={(e) => setEmail(e.target.value)} />

            <input className="auth-input" type="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)} />

            <button className="auth-button" onClick={handleSignup}>
              Sign Up
            </button>
            <div className="auth-link">
  Already have a UID? <span onClick={onBackToLogin}>Login</span>
</div>

          </>
        ) : (
          <>
            <p><strong>Your UID:</strong> {uid}</p>
            <button className="auth-button" onClick={onBackToLogin}>
              Go to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Signup;
