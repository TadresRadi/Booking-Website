import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">Logo</div>
        <nav className="nav-links">
          <a href="/hotels" className="nav-link">Hotels & Rooms</a>
          <a href="/locations" className="nav-link">Location</a>
          <a href="/free-rooms" className="nav-link">date of free rooms</a>
        </nav>
        <div className="auth-buttons">
          <button className="login-btn">Log in</button>
          <button className="create-account-btn">Create Account</button>
        </div>
      </div>
    </header>
  );
};

export default Header;