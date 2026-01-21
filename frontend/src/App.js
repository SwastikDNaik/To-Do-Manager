import { useEffect, useState } from "react";
import TaskPage from "./TaskPage";
import Login from "./login";
import Signup from "./signup";

function App() {
  const [page, setPage] = useState("login");

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (uid) {
      setPage("task");
    }
  }, []);

  const handleLogin = (uid) => {
    localStorage.setItem("uid", uid);
    setPage("task");
  };

  const handleLogout = () => {
    localStorage.removeItem("uid");
    setPage("login");
  };

  return (
    <>
      {page === "login" && (
        <Login
          onLogin={handleLogin}
          onSignup={() => setPage("signup")}
        />
      )}

      {page === "signup" && (
        <Signup onBackToLogin={() => setPage("login")} />
      )}

      {page === "task" && <TaskPage onLogout={handleLogout} />}
    </>
  );
}

export default App;
