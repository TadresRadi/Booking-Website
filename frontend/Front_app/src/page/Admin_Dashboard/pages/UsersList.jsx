import React, { useState, useEffect } from "react";

const roleLabel = {
  host: { text: "Host", color: "#2f8a5f" },
  guest: { text: "Guest", color: "#2262b6" },
};

function formatMoney(amount) {
  if (amount == null) return "--";
  return amount.toLocaleString() + " EGP";
}

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("access");
        if (!token) {
          setError("No access token found, please login as admin.");
          setLoading(false);
          return;
        }
        const response = await fetch("http://localhost:8000/api/users/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          if (response.status === 401) {
            setError("Unauthorized: Please login as admin.");
          } else {
            setError("Failed to fetch users. (" + response.status + ")");
          }
          setLoading(false);
          return;
        }
        const data = await response.json();
        console.log("API response:", data);

        setUsers(data.results || []);
      } catch (err) {
        setError("Network error.");
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  // فلترة المستخدمين بناءً على الاسم الأول أو الأخير
  const filteredUsers = users.filter(
    (u) =>
      (`${u.first_name} ${u.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: "calc(100vh - 60px)",
        background: "#f7f9fb",
        padding: "40px 0",
        position: "relative",
      }}
    >
      <div
        className="users-table-wrapper"
        style={{
          width: "100%",
          height: "100%",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="bg-white p-4 rounded-3 mb-4 flex-grow-1"
          style={{
            boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
            width: "100%",
            maxWidth: "100%",
            overflowX: "auto",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
            <h3 style={{ fontWeight: 700, marginBottom: 0 }}>Users</h3>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name or email..."
              style={{
                maxWidth: 300,
                marginLeft: "auto",
                marginRight: 0,
                borderRadius: 8,
                border: "1px solid #ddd",
                background: "#f7f9fb",
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <div style={{ textAlign: "center", marginTop: 60, fontSize: 18 }}>
              Loading users...
            </div>
          ) : error ? (
            <div style={{ textAlign: "center", marginTop: 60, color: "#b22c2c" }}>
              {error}
            </div>
          ) : (
            <div className="table-responsive" style={{ width: "100%", flex: 1 }}>
              <table className="table align-middle" style={{ minWidth: 800, width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ minWidth: 60 }}></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Account Creation</th>
                    <th>Total Spend</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.id}>
                      <td>
                        <img
                          src={
                            u.profile_image ||
                            "https://ui-avatars.com/api/?name=" +
                              encodeURIComponent(`${u.first_name} ${u.last_name}` || "U")
                          }
                          alt={`${u.first_name} ${u.last_name}`}
                          style={{
                            width: 56,
                            height: 56,
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "2px solid #eee",
                          }}
                        />
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{`${u.first_name} ${u.last_name}`}</div>
                      </td>
                      <td>
                        <span style={{ fontSize: "0.96em", color: "#444" }}>{u.email}</span>
                      </td>
                      <td>
                        <span
                          style={{
                            background: roleLabel[u.role]?.color || "#888",
                            color: "#fff",
                            borderRadius: 8,
                            fontSize: 13,
                            padding: "4px 16px",
                            fontWeight: 500,
                            letterSpacing: 1,
                            display: "inline-block",
                          }}
                        >
                          {roleLabel[u.role]?.text || u.role || "-"}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: 500 }}>
                          Account creation
                        </div>
                        <div style={{ color: "#888", fontSize: 13 }}>
                          {u.accountCreation || u.date_joined?.slice(0, 10) || "-"}
                        </div>
                      </td>
                      <td>
                        <span style={{ fontWeight: 600, color: "#2262b6" }}>
                          {formatMoney(u.totalSpend || u.total_spend)}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: "center" }}>
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          html, body, #root {
            height: 100%;
          }
          .users-table-wrapper, .bg-white {
            height: 100%;
          }
          @media (max-width: 991px) {
            .users-table-wrapper {
              padding: 0 4px;
            }
            .table-responsive {
              overflow-x: auto;
            }
            .table thead {
              font-size: 15px;
            }
          }
          @media (max-width: 700px) {
            .users-table-wrapper {
              padding: 0 1px;
            }
            .table thead {
              display: none;
            }
            .table tr {
              display: block;
              margin-bottom: 15px;
              border-bottom: 2px solid #eaeaea;
            }
            .table td {
              display: flex;
              align-items: center;
              border: none;
              padding: 8px 0;
            }
            .table td:before {
              content: attr(data-label);
              font-weight: 600;
              color: #888;
              min-width: 100px;
              display: inline-block;
            }
          }
        `}
      </style>
    </div>
  );
};

export default UsersList;