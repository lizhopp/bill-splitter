import "./App.css";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { useAuth } from "./auth/AuthContext";

function App() {
  const { token, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <nav>
        <Link to="/">Home</Link> |{" "}
        {token ? (
          <>
           <Link to="/account">Account</Link>{" "}
            |   <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link> |{" "}
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </>
  );
}

function Home() {
  const { token } = useAuth();
  const [message, setMessage] = useState("Loading...");
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

  useEffect(() => {
    loadData();
    async function loadData() {
      const greetingResponse = await fetch(`${API_BASE}/greet`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (greetingResponse.ok) {
        const { message } = await greetingResponse.json();
        setMessage(message);
      } else if (greetingResponse.status === 401) {
        setMessage("Please Login or Register");
      } else {
        setMessage("Error: Cannot Load");
      }
    }
  }, [API_BASE, token]);
  return (
    <>
      <h1>{message}</h1>
    </>
  );
}

function Account() {
  const { token } = useAuth();

  return (
    <section>
      <h1>Account</h1>
      <p>{token ? "You are logged in." : "You are not logged in yet."}</p>
    </section>
  );
}

export default App;
