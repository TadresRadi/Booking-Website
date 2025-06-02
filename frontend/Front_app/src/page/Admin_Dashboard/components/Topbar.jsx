import React from 'react';
import { FormControl, InputGroup, Button, Dropdown } from 'react-bootstrap';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';

const AdminTopbar = ({ userName = "User" }) => (
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

    {/* Icons */}
    <div className="d-flex align-items-center gap-3">
      <Button variant="light" className="rounded-circle p-2">
        <FaBell size={18} />
      </Button>
      <Dropdown align="end">
        <Dropdown.Toggle
          variant="light"
          className="d-flex align-items-center gap-2 rounded-pill p-2"
        >
          <FaUserCircle size={24} />
          <span className="d-none d-md-inline">{userName}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  </div>
);

export default AdminTopbar;