import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">Logo</div>
        <nav className="nav-links">
        
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