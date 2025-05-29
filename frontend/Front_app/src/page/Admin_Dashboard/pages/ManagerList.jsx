import React, { useState } from "react";

// Dummy users data
const dummyUsers = [
  {
    id: 1,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Mohamed Ali",
    email: "mohamed.ali@email.com",
    role: "manager",
  },
  {
    id: 2,
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    name: "Sara Youssef",
    email: "sara.youssef@email.com",
    role: "not manager",
  },
  {
    id: 3,
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
    name: "Omar Hassan",
    email: "omar.hassan@email.com",
    role: "manager",
  },
  {
    id: 4,
    avatar: "https://randomuser.me/api/portraits/women/37.jpg",
    name: "Nourhan Kamel",
    email: "nourhan.kamel@email.com",
    role: "not manager",
  },
];

const ManagerList = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [search, setSearch] = useState("");

  // Filter users by email
  const filteredUsers = users.filter((u) =>
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  // Handler to set/remove admin
  const handleSetAdmin = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, role: "manager" } : u
      )
    );
  };
  const handleRemoveAdmin = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, role: "not manager" } : u
      )
    );
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "calc(100vh - 60px)",
        background: "#f7f9fb",
        padding: "40px 0"
      }}
    >
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
        <h5 className="mb-4" style={{ fontWeight: 700, fontSize: 18 }}>
          Manager List
        </h5>
        {/* Search Bar */}
        <div className="d-flex justify-content-end mb-3">
          <input
            type="text"
            placeholder="Search by email..."
            className="form-control"
            style={{
              maxWidth: 300,
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
          <table className="table align-middle" style={{ minWidth: 800, width: "100%" }}>
            <thead>
              <tr>
                <th style={{ minWidth: 160 }}>Users</th>
                <th style={{ minWidth: 230 }}>Email</th>
                <th style={{ minWidth: 120 }}>Role</th>
                <th style={{ minWidth: 120 }}>Set As</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td>
                    <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <img src={u.avatar} alt="" style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover", border: "2px solid #eee" }} />
                      <span style={{ fontWeight: 500 }}>{u.name}</span>
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: "0.96em", color: "#444" }}>{u.email}</span>
                  </td>
                  <td>
                    <span
                      style={{
                        background: u.role === "manager" ? "#e8f9f1" : "#f0f0f0",
                        color: u.role === "manager" ? "#23b26d" : "#888",
                        borderRadius: 8,
                        fontSize: 13,
                        padding: "4px 16px",
                        fontWeight: 500,
                        letterSpacing: 1,
                        display: "inline-block",
                      }}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        className="btn btn-primary btn-sm"
                        style={{
                          background: "#5956e9",
                          border: "none",
                          borderRadius: 8,
                          opacity: u.role === "manager" ? 0.7 : 1,
                          pointerEvents: u.role === "manager" ? "none" : "auto",
                        }}
                        disabled={u.role === "manager"}
                        onClick={() => handleSetAdmin(u.id)}
                      >
                        Set as admin
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        style={{
                          borderRadius: 8,
                          opacity: u.role === "not manager" ? 0.7 : 1,
                          pointerEvents: u.role === "not manager" ? "none" : "auto",
                        }}
                        disabled={u.role === "not manager"}
                        onClick={() => handleRemoveAdmin(u.id)}
                      >
                        Remove from admin
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", color: "#aaa" }}>No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
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

export default ManagerList;