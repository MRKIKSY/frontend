// import React, { useState, useEffect } from "react";

// export default function Dashboard({ api, token, user }) {
//   const [balance, setBalance] = useState(null);
//   const [txs, setTxs] = useState([]);
//   const [withdrawAmount, setAmount] = useState("");
//   const [msg, setMsg] = useState("");

//   function load() {
//     fetch(`${api}/balance`, { headers: { Authorization: `Bearer ${token}` } })
//       .then(r => r.json()).then(setBalance);

//     fetch(`${api}/transactions`, { headers: { Authorization: `Bearer ${token}` } })
//       .then(r => r.json()).then(setTxs);
//   }

//   useEffect(load, []);

//   function withdraw(e) {
//     e.preventDefault();
//     setMsg("");

//     fetch(`${api}/withdraw`, {
//       method: "POST",
//       headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//       body: JSON.stringify({ amount: parseFloat(withdrawAmount), description: "Withdrawal" })
//     })
//       .then(r => r.json())
//       .then(data => {
//         setMsg(data.detail);
//         setAmount("");
//         load();
//       })
//       .catch(() => setMsg("Error"));
//   }

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">

//       {/* HEADER */}
//       <div className="bg-white shadow rounded-xl p-6 mb-6">
//         <h2 className="text-2xl font-bold text-blue-700">Welcome to Texan Union Bank</h2>

//         <p className="mt-3 text-gray-700"><b>Name:</b> Mr. Femi Adebayo</p>
//         <p className="text-gray-700"><b>Address:</b> {user.address}</p>
//       </div>

//       {/* BALANCE CARDS */}
//       {balance && (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

//           <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
//             <h3 className="text-gray-600 font-semibold">Current Balance</h3>
//             <p className="text-3xl font-bold text-blue-700 mt-2">${balance.balance}</p>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
//             <h3 className="text-gray-600 font-semibold">Total Credits</h3>
//             <p className="text-2xl font-bold text-green-600 mt-2">${balance.total_credits}</p>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
//             <h3 className="text-gray-600 font-semibold">Total Debits</h3>
//             <p className="text-2xl font-bold text-red-600 mt-2">${balance.total_debits}</p>
//           </div>
//         </div>
//       )}

//       {/* WITHDRAW FORM */}
//       <div className="bg-white rounded-xl shadow p-6 border border-gray-200 mb-8">
//         <h3 className="text-xl font-semibold text-gray-800 mb-4">Withdraw Funds</h3>

//         <form onSubmit={withdraw} className="flex gap-4 items-center">
//           <input
//             className="w-48 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//             value={withdrawAmount}
//             onChange={(e) => setAmount(e.target.value)}
//             placeholder="Amount"
//           />
//           <button
//             className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition font-semibold"
//           >
//             Withdraw
//           </button>
//         </form>

//         {msg && <p className="text-green-600 font-medium mt-3">{msg}</p>}
//       </div>

//       {/* TRANSACTIONS TABLE */}
//       <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
//         <h3 className="text-xl font-semibold text-gray-800 mb-4">Transactions</h3>

//         <div className="overflow-auto">
//           <table className="min-w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-200 text-left">
//                 <th className="p-3 font-semibold">Date</th>
//                 <th className="p-3 font-semibold">Type</th>
//                 <th className="p-3 font-semibold">Amount</th>
//                 <th className="p-3 font-semibold">Description</th>
//               </tr>
//             </thead>
//             <tbody>
//               {txs.map((t) => (
//                 <tr key={t.id} className="border-b hover:bg-gray-50 transition">
//                   <td className="p-3">{new Date(t.created_at).toLocaleString()}</td>
//                   <td className="p-3 capitalize">{t.type}</td>
//                   <td className={`p-3 font-semibold 
//                     ${t.type === "credit" ? "text-green-600" : "text-red-600"}`}>
//                     ${t.amount}
//                   </td>
//                   <td className="p-3">{t.description}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//     </div>
//   );
// }

import React, { useState, useEffect } from "react";

export default function Dashboard({ api, token, user }) {
  const [balance, setBalance] = useState(null);
  const [txs, setTxs] = useState([]);
  const [amount, setAmount] = useState("");
  const [routing, setRouting] = useState("");
  const [account, setAccount] = useState("");
  const [check, setCheck] = useState("");
  const [ref, setRef] = useState("");
  const [msg, setMsg] = useState("");

  const load = () => {
    fetch(`${api}/balance`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setBalance);

    fetch(`${api}/transactions`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setTxs);
  };

  useEffect(load, []);

  const withdraw = (e) => {
    e.preventDefault();
    setMsg("");

    if (!amount || !routing || !account) {
      setMsg("Amount, routing number, and account number are required.");
      return;
    }

    fetch(`${api}/withdraw`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: parseFloat(amount),
        routing_number: routing,
        account_number: account,
        check_number: check,
        reference: ref,
      }),
    })
      .then(r => r.json())
      .then(d => {
        setMsg(d.detail);
        setAmount("");
        setRouting("");
        setAccount("");
        setCheck("");
        setRef("");
        load();
      })
      .catch(() => setMsg("Error submitting withdrawal"));
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center">

      {/* BANK INFO */}
      <div className="bg-white shadow-xl rounded-2xl p-8 mb-8 text-center w-full max-w-xl">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Amsterdam Local Union Bank</h1>
        <p className="text-gray-700 text-lg mb-1"><b>Name:</b> Mrs Maria Kelly Lars</p>
        <p className="text-gray-700 text-lg">
          <b>Address:</b> Keizersgracht 215, 1016 DW Amsterdam, Netherlands
        </p>
      </div>

      {/* BALANCE */}
      {balance && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full max-w-3xl">
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200 text-center">
            <h3 className="text-gray-600 font-semibold">Current Balance</h3>
            <p className="text-3xl font-bold text-blue-700 mt-2">€{balance.balance}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200 text-center">
            <h3 className="text-gray-600 font-semibold">Total Credits</h3>
            <p className="text-2xl font-bold text-green-600 mt-2">€{balance.total_credits}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200 text-center">
            <h3 className="text-gray-600 font-semibold">Total Debits</h3>
            <p className="text-2xl font-bold text-red-600 mt-2">€{balance.total_debits}</p>
          </div>
        </div>
      )}

      {/* WITHDRAW FORM */}
      <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200 mb-8 w-full max-w-xl">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Withdraw Funds</h3>

        <form onSubmit={withdraw} className="flex flex-col gap-4 items-center w-full">

          {/* Row 1 */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <input
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Amount"
            />
            <input
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={routing}
              onChange={e => setRouting(e.target.value)}
              placeholder="Routing #"
            />
            <input
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={account}
              onChange={e => setAccount(e.target.value)}
              placeholder="Account #"
            />
          </div>

          {/* Row 2 */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <input
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={check}
              onChange={e => setCheck(e.target.value)}
              placeholder="Check #"
            />
            <input
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={ref}
              onChange={e => setRef(e.target.value)}
              placeholder="Reference"
            />
            <button
              className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition font-semibold flex-shrink-0"
            >
              Withdraw
            </button>
          </div>
        </form>

        {msg && <p className="text-green-600 font-medium mt-3 text-center">{msg}</p>}
      </div>

      {/* TRANSACTIONS TABLE */}
      <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200 w-full max-w-3xl">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Transactions</h3>

        <div className="overflow-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3 font-semibold">Date</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold">Amount</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              {txs.map(t => (
                <tr key={t.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3">{new Date(t.created_at).toLocaleString()}</td>

                  <td className="p-3 flex items-center gap-2">
                    {t.status === "pending" && (
                      <span className="inline-block w-5 h-5 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></span>
                    )}
                    {t.status.toUpperCase()}
                  </td>

                  <td className={`p-3 font-semibold ${t.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                    €{t.amount}
                  </td>
                  <td className="p-3">{t.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
