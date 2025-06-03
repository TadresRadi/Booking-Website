import React, { useEffect, useState } from "react";
import axios from "axios";

const ManagerList = ({ currentUserId }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("access");
      const res = await axios.get("http://127.0.0.1:8000/api/users/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (Array.isArray(res.data.results)) {
        setUsers(res.data.results);
      } else if (Array.isArray(res.data)) {
        setUsers(res.data);
      } else {
        console.error("Unexpected response format:", res.data);
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users. Please try again.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleManagerStatus = async (id) => {
    if (id === currentUserId) {
      alert("لا يمكنك تغيير صلاحياتك الخاصة.");
      return;
    }
    try {
      const token = localStorage.getItem("access");
      await axios.post(
        `http://127.0.0.1:8000/api/users/${id}/toggle-manager-status/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchUsers();
    } catch (error) {
      console.error("Failed to toggle manager status:", error);
      alert("فشل تحديث صلاحيات المستخدم. حاول مرة أخرى.");
    }
  };

  const filteredUsers = users.filter((u) =>
    `${u.first_name} ${u.last_name} ${u.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        width: "100%",
        minHeight: "calc(100vh - 60px)",
        background: "#f7f9fb",
        padding: "40px 0",
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
          border: "1.5px solid #ececec",
        }}
      >
        <h5 className="mb-4" style={{ fontWeight: 700, fontSize: 18 }}>
          Manager List
        </h5>

        <div className="d-flex justify-content-end mb-3">
          <input
            type="text"
            placeholder="Search by name or email..."
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
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {error && (
          <div style={{ color: "red", marginBottom: 10, textAlign: "center" }}>
            {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: "center", padding: 20 }}>Loading users...</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              className="table align-middle"
              style={{ minWidth: 800, width: "100%" }}
            >
              <thead>
                <tr>
                  <th style={{ minWidth: 160 }}>Users</th>
                  <th style={{ minWidth: 230 }}>Email</th>
                  <th style={{ minWidth: 120 }}>Role</th>
                  <th style={{ minWidth: 120 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((u) => (
                    <tr key={u.id}>
                      <td>
                        <span
                          style={{ display: "flex", alignItems: "center", gap: 10 }}
                        >
                          <img
                            src={u.profile_image || "https://via.placeholder.com/38"}
                            alt=""
                            style={{
                              width: 38,
                              height: 38,
                              borderRadius: "50%",
                              objectFit: "cover",
                              border: "2px solid #eee",
                            }}
                          />
                          <span style={{ fontWeight: 500 }}>
                            {u.first_name} {u.last_name}
                          </span>
                        </span>
                      </td>
                      <td>
                        <span style={{ fontSize: "0.96em", color: "#444" }}>
                          {u.email}
                        </span>
                      </td>
                      <td>
                        <span
                          style={{
                            background: u.is_superuser ? "#e8f9f1" : "#f0f0f0",
                            color: u.is_superuser ? "#23b26d" : "#888",
                            borderRadius: 8,
                            fontSize: 13,
                            padding: "4px 16px",
                            fontWeight: 500,
                            letterSpacing: 1,
                            display: "inline-block",
                          }}
                        >
                          {u.is_superuser ? "super user" : "not super user"}
                        </span>
                      </td>
                      <td>
                        {/* زرار set as super user (للي مش سوبر يوزر) */}
                        <button
                          className="btn btn-primary btn-sm"
                          style={{
                            borderRadius: 8,
                            background: "#5956e9",
                            border: "none",
                            color: "#fff",
                            marginRight: 8,
                          }}
                          onClick={() => handleToggleManagerStatus(u.id)}
                          disabled={u.is_superuser || u.id === currentUserId}
                          title={
                            u.is_superuser
                              ? "هذا المستخدم هو سوبر يوزر بالفعل"
                              : u.id === currentUserId
                              ? "لا يمكنك تغيير صلاحياتك الخاصة"
                              : ""
                          }
                        >
                          Set as super user
                        </button>

                        {/* زرار remove from super user (للي سوبر يوزر) */}
                        <button
                          className="btn btn-outline-danger btn-sm"
                          style={{
                            borderRadius: 8,
                            background: "transparent",
                            border: "1px solid #dc3545",
                            color: "#dc3545",
                          }}
                          onClick={() => handleToggleManagerStatus(u.id)}
                          disabled={!u.is_superuser || u.id === currentUserId}
                          title={
                            !u.is_superuser
                              ? "هذا المستخدم ليس سوبر يوزر"
                              : u.id === currentUserId
                              ? "لا يمكنك تغيير صلاحياتك الخاصة"
                              : ""
                          }
                        >
                          Remove from super user
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center", color: "#aaa" }}>
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

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