import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");
  const [user, setUser] = useState("Loading...");
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

  useEffect(() => {
    loadData();
    async function loadData() {
      const userResponse = await fetch(`${API_BASE}/users/1`);
      const greetingResponse = await fetch(`${API_BASE}/greet`);
      if (userResponse.ok && greetingResponse.ok) {
        const user = await userResponse.json();
        setUser(user);
        const {message} = await greetingResponse.json();
        setMessage(message);
      }else{
        setMessage("Error: Could not Load");
      }
    }
  });
  return <>
  <h2>Hi {user.name}! Or should I say...</h2>
  <h1>{message}</h1></>;
}

export default App;
