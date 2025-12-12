import React, { useState, useEffect } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import AdminPage from "./AdminPage";

 const api = "https://backendunion.onrender.com"

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [me, setMe] = useState(null);

  useEffect(() => {
    if (!token) return;
    fetch(`${API}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => {
        if (!r.ok) throw new Error("Auth failed");
        return r.json();
      })
      .then(setMe)
      .catch(() => {
        setToken(null);
        localStorage.removeItem("token");
      });
  }, [token]);

  if (!token) return <Login api={API} onLogin={setToken} />;

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      {me && (
        <>
          <h2>Mock Banking App</h2>
          <p>
            Logged in as <b>{me.username}</b> ({me.is_admin ? "Admin" : "User"})
            <button onClick={() => { setToken(null); localStorage.removeItem("token"); }} style={{ marginLeft: 10 }}>
              Logout
            </button>
          </p>

          <Dashboard api={API} token={token} user={me} />

          {me.is_admin && <AdminPage api={API} token={token} />}
        </>
      )}
    </div>
  );
}

export default App;
