import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, FaUser, FaTasks, FaWpforms, 
  FaTable 
} from 'react-icons/fa';

const navLinks = [
  {
    to: "/admin/dashboard",
    icon: <FaTachometerAlt className="me-2" />,
    label: "Dashboard",
    group: "Menu"
  },
  {
    to: "/admin/user-profile",
    icon: <FaUser className="me-2" />,
    label: "User Profile",
    group: "Menu"
  },
  {
    to: "/admin/users-list",
    icon: <FaTasks className="me-2" />,
    label: "Users List",
    group: "Menu"
  },
  {
    to: "/admin/transactions-list",
    icon: <FaWpforms className="me-2" />,
    label: "Transactions List",
    group: "Menu"
  },
  {
    to: "/admin/chat-room",
    icon: <FaTable className="me-2" />,
    label: "Chats",
    group: "Support"
  },
  {
    to: "/admin/manager-list",
    icon: <FaTable className="me-2" />,
    label: "Managers",
    group: "Support"
  }
];

const AdminSidebar = () => {
  const location = useLocation();

  // Group links
  const menuLinks = navLinks.filter(l => l.group === "Menu");
  const supportLinks = navLinks.filter(l => l.group === "Support");

  return (
    <div
      className="d-flex flex-column bg-white shadow-sm admin-sidebar"
      style={{
        width: 260,
        minHeight: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 100,
        justifyContent: 'space-between',
        transition: 'box-shadow 0.2s'
      }}
    >
      {/* Header */}
      <div className="p-4 border-bottom">
        <h4 className="mb-0 fw-bold" style={{letterSpacing: 1, color: "#5956e9"}}>Admin Dashboard</h4>
        <h5 className="mb-0 fw-bold" style={{color: "#888"}}>Diva</h5>
      </div>
      {/* Nav links */}
      <Nav className="flex-column px-3 py-3" style={{flex: 1, gap:10, justifyContent: 'flex-start'}}>
        <div className="mb-2 text-uppercase text-muted small" style={{letterSpacing: 1}}>Menu</div>
        {menuLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className="d-flex align-items-center sidebar-link"
            style={{
              textDecoration: 'none',
              color: location.pathname === link.to ? "#fff" : "#222",
              marginBottom: 6,
              background: location.pathname === link.to ? "#5956e9" : "transparent",
              borderRadius: 8,
              padding: "10px 14px",
              fontWeight: 500,
              boxShadow: location.pathname === link.to ? "0 2px 8px #5956e91a" : "none",
              transition: 'background 0.18s, color 0.18s'
            }}
          >
            {link.icon} {link.label}
          </Link>
        ))}
        <div className="mt-4 mb-2 text-uppercase text-muted small" style={{letterSpacing: 1}}>Support</div>
        {supportLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className="d-flex align-items-center sidebar-link"
            style={{
              textDecoration: 'none',
              color: location.pathname === link.to ? "#fff" : "#222",
              marginBottom: 6,
              background: location.pathname === link.to ? "#5956e9" : "transparent",
              borderRadius: 8,
              padding: "10px 14px",
              fontWeight: 500,
              boxShadow: location.pathname === link.to ? "0 2px 8px #5956e91a" : "none",
              transition: 'background 0.18s, color 0.18s'
            }}
          >
            {link.icon} {link.label}
          </Link>
        ))}
      </Nav>
      <div style={{padding: "24px 0", textAlign: "center", color: "#bfbfbf", fontSize: 13}}>
        &copy; {new Date().getFullYear()} Diva Admin
      </div>
      {/* Extra Sidebar Styling */}
      <style>
        {`
        .admin-sidebar .sidebar-link:hover {
          background: #e9eafe;
          color: #5956e9 !important;
          transition: background 0.16s, color 0.18s;
        }
        .admin-sidebar .sidebar-link.active, 
        .admin-sidebar .sidebar-link:active {
          background: #5956e9 !important;
          color: #fff !important;
        }
        `}
      </style>
    </div>
  );
};

export default AdminSidebar;