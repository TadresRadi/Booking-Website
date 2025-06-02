import React, { useState } from "react";

// Dummy transaction data
const dummyTransactions = [
  {
    id: 1,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/paypal/paypal-original.svg",
    name: "Mohamed Ali",
    date: "Nov 23, 01:00 PM",
    price: 2567.88,
    status: "Success",
  },
  {
    id: 2,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg",
    name: "Sara Youssef",
    date: "Nov 22, 09:00 PM",
    price: 2567.88,
    status: "Pending",
  },
  {
    id: 3,
    icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/kickstarter.svg",
    name: "Omar Hassan",
    date: "Oct 12, 03:54 PM",
    price: 6754.99,
    status: "Success",
  },
  {
    id: 4,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg",
    name: "Nourhan Kamel",
    date: "Sep 09, 02:00 AM",
    price: 1445.41,
    status: "Success",
  },
  {
    id: 5,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
    name: "Tadres Radi",
    date: "Feb 35, 08:00 PM",
    price: 5698.55,
    status: "Failed",
  },
];

// For status coloring
const statusStyles = {
  Success: { background: "#e8f9f1", color: "#23b26d" },
  Pending: { background: "#fff7e6", color: "#ffc043" },
  Failed:  { background: "#ffeaea", color: "#ff5a5a" },
};

function formatMoney(amount) {
  return "$" + amount.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

const TransactionsList = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Pagination config
  const pageSize = 5;
  const totalPages = 10; // dummy for layout
  const filtered = dummyTransactions.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  // For demo, only show first page
  const shown = filtered.slice(0, pageSize);

  return (
    <div style={{
      width: "100%",
      minHeight: "calc(100vh - 60px)",
      background: "#f7f9fb",
      padding: "40px 0"
    }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
          padding: 24,
          border: "1.5px solid #ececec"
        }}
      >
        <h5 className="mb-4" style={{ fontWeight: 700, fontSize: 18 }}>Latest Transactions</h5>
        {/* Search Bar */}
        <div className="d-flex justify-content-end mb-3">
          <input
            type="text"
            placeholder="Search..."
            className="form-control"
            style={{
              maxWidth: 250,
              borderRadius: 8,
              border: "1px solid #e2e2e2",
              fontSize: 15,
              color: "#555",
              background: "#fafbfc",
            }}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="table align-middle" style={{ minWidth: 900, width: "100%" }}>
            <thead>
              <tr>
                <th style={{ minWidth: 160 }}>Name</th>
                <th style={{ minWidth: 160 }}>Date</th>
                <th style={{ minWidth: 120 }}>Price</th>
                <th style={{ minWidth: 120 }}>Status</th>
                <th style={{ width: 40 }}></th>
              </tr>
            </thead>
            <tbody>
              {shown.map((item) => (
                <tr key={item.id}>
                  <td>
                    <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <img src={item.icon} alt="" style={{ width: 32, height: 32, borderRadius: "50%", background: "#f5f5f5" }} />
                      <span style={{ fontWeight: 500 }}>{item.name}</span>
                    </span>
                  </td>
                  <td>{item.date}</td>
                  <td style={{ fontWeight: 600 }}>{formatMoney(item.price)}</td>
                  <td>
                    <span
                      style={{
                        display: "inline-block",
                        borderRadius: 8,
                        padding: "2px 16px",
                        fontSize: 14,
                        fontWeight: 500,
                        ...statusStyles[item.status]
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: 22, color: "#bbb", cursor: "pointer" }}>⋯</span>
                  </td>
                </tr>
              ))}
              {shown.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", color: "#aaa" }}>No transactions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button className="btn btn-light border" disabled={page === 1} style={{ borderRadius: 8 }}>
            &larr; Previous
          </button>
          <div>
            {[...Array(totalPages)].map((_, i) =>
              <button
                key={i + 1}
                className="btn"
                style={{
                  borderRadius: 8,
                  background: page === (i + 1) ? "#e9eafe" : "#fff",
                  color: page === (i + 1) ? "#5956e9" : "#333",
                  minWidth: 38,
                  fontWeight: 500,
                  margin: "0 3px",
                  border: "none"
                }}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            )}
          </div>
          <button className="btn btn-light border" disabled={page === totalPages} style={{ borderRadius: 8 }}>
            Next &rarr;
          </button>
        </div>
      </div>
      {/* Responsive */}
      <style>
        {`
          @media (max-width: 900px) {
            table { min-width: 600px !important; }
          }
          @media (max-width: 600px) {
            .table thead { display: none; }
            .table tr { display: block; margin-bottom: 12px; }
            .table td { display: flex; align-items: center; border: none; }
          }
        `}
      </style>
    </div>
  );
};

export default TransactionsList;