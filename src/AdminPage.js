// import React, { useState } from "react";

// export default function AdminPage({ api, token }) {
//   const [username, setUser] = useState("");
//   const [amount, setAmount] = useState("");
//   const [msg, setMsg] = useState("");

//   function submit(e) {
//     e.preventDefault();
//     setMsg("");

//     fetch(`${api}/admin/credit`, {
//       method: "POST",
//       headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//       body: JSON.stringify({ username, amount: parseFloat(amount) })
//     })
//       .then(r => r.json())
//       .then(data => setMsg(data.detail))
//       .catch(() => setMsg("Error"));
//   }

//   return (
//     <div style={{ marginTop: 30 }}>
//       <h3>Admin — Add Credit</h3>

//       <form onSubmit={submit}>
//         <input placeholder="Username" value={username} onChange={e => setUser(e.target.value)} />
//         <br /><br />

//         <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
//         <br /><br />

//         <button>Add Credit</button>
//       </form>

//       {msg && <p>{msg}</p>}
//     </div>
//   );
// }


import React, { useState } from "react";

export default function AdminPage({ api, token }) {
  const [username, setUser] = useState("");
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");

  function submit(e) {
    e.preventDefault();
    setMsg("");

    fetch(`${api}/admin/credit`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ username, amount: parseFloat(amount) })
    })
      .then(r => r.json())
      .then(data => setMsg(data.detail))
      .catch(() => setMsg("Error"));
  }

  return (
    <div style={{ marginTop: 30 }}>
      <h3>Admin — Add Credit</h3>

      <form onSubmit={submit}>
        <input placeholder="Username" value={username} onChange={e => setUser(e.target.value)} />
        <br /><br />

        <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
        <br /><br />

        <button>Add Credit</button>
      </form>

      {msg && <p>{msg}</p>}
    </div>
  );
}
