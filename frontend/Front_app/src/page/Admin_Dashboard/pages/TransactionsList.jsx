import React, { useEffect, useState } from "react";
import axios from "axios";

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access");
        const res = await axios.get(
          "http://127.0.0.1:8000/api/admin/payments/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTransactions(res.data);
      } catch {
        setTransactions([]);
      }
    };
    fetchData();
  }, []);
  const filtered = transactions.filter((item) =>
    (item.full_name || "").toLowerCase().includes(search.toLowerCase()) ||
    (item.id + "").includes(search) ||
    (item.created_at || "").toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const shown = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div style={{
      width: "100%",
      minHeight: "calc(100vh - 60px)",
      background: "#f7f9fb",
      padding: "40px 0"
    }}>
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
          padding: 24,
          border: "1.5px solid #ececec"
        }}
      >
        <h5 className="mb-4" style={{ fontWeight: 700, fontSize: 18 }}>Payments</h5>
        {/* Search Bar */}
        <div className="d-flex justify-content-end mb-3">
          <input
            type="text"
            placeholder="Search by name, payment id, or date..."
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
            onChange={e => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="table align-middle" style={{ minWidth: 700, width: "100%" }}>
            <thead>
              <tr>
                <th style={{ minWidth: 100 }}>Payment ID</th>
                <th style={{ minWidth: 200 }}>Full Name</th>
                <th style={{ minWidth: 220 }}>Created At</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 500 }}>{item.id}</td>
                  <td>{item.full_name || "--"}</td>
                  <td>{item.created_at ? new Date(item.created_at).toLocaleString() : "--"}</td>
                </tr>
              ))}
              {shown.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ textAlign: "center", color: "#aaa" }}>No payments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button className="btn btn-light border" disabled={page === 1} style={{ borderRadius: 8 }}
            onClick={() => setPage(page - 1)}
          >
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
          <button className="btn btn-light border" disabled={page === totalPages} style={{ borderRadius: 8 }}
            onClick={() => setPage(page + 1)}
          >
            Next &rarr;
          </button>
        </div>
      </div>
      {/* Responsive */}
      <style>
        {`
          @media (max-width: 900px) {
            table { min-width: 450px !important; }
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