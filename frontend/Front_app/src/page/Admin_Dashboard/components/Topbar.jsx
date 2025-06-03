import React, { useContext } from 'react';
import { FormControl, InputGroup, Button, Dropdown } from 'react-bootstrap';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import { AdminContext } from "../components/admincontext.jsx"; // عدل المسار حسب مشروعك

const AdminTopbar = () => {
  const { userData } = useContext(AdminContext);

  const adminName =
    (userData.firstName || "") + " " + (userData.lastName || "") ||
    userData.username ||
    "User";

  const adminImg = userData.profileImage;

  const handleLogout = () => {
    // امسح كل بيانات الأدمن من localStorage
    localStorage.removeItem("admin_access");
    localStorage.removeItem("admin_refresh");
    localStorage.removeItem("admin_username");
    localStorage.removeItem("admin_first_name");
    localStorage.removeItem("admin_last_name");
    localStorage.removeItem("admin_profileImage");
    window.location.href = "/admin/login";
  };

  return (
    <div
      className="d-flex align-items-center justify-content-between px-4 py-2 bg-white shadow-sm"
      style={{
        marginLeft: 260,
        minHeight: 60,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <InputGroup style={{ maxWidth: 400 }}>
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <FormControl placeholder="Search or type command..." />
        <Button variant="outline-secondary">⌘K</Button>
      </InputGroup>

      <div className="d-flex align-items-center gap-3">
        <Button variant="light" className="rounded-circle p-2">
          <FaBell size={18} />
        </Button>
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="light"
            className="d-flex align-items-center gap-2 rounded-pill p-2"
          >
            {adminImg ? (
              <img
                src={adminImg}
                alt="profile"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1px solid #ddd",
                  background: "#f6f6f6"
                }}
              />
            ) : (
              <FaUserCircle size={32} />
            )}
            <span className="d-none d-md-inline">{adminName.trim()}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Profile</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default AdminTopbar;