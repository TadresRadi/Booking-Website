import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  function handleFav() {
    navigate('/fav');
  }
  function handleLogin() {
    navigate('/login');
  }
  function handleRegister() {
    navigate('/register');
  }
  function handleHome() {
    navigate('/home'); 
  }
  function handleProfile() {
    setMenuOpen(false);
    navigate('/profile');
  }
  function handleSettings() {
    setMenuOpen(false);
    navigate('/settings');
  }
  function handleLogout() {
    setMenuOpen(false);
    localStorage.removeItem("username");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUsername(null);
    navigate('/login');
  }

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo" style={{ cursor: 'pointer' }} onClick={handleHome}>Logo</div>
        <div className="auth-buttons">
          <button className="login-btn" onClick={handleFav}>Favorite</button>
          <button className="login-btn" onClick={handleHome}>Home</button>
          {!username ? (
            <>
              <button className="login-btn" onClick={handleLogin}>Log in</button>
              <button className="create-account-btn" onClick={handleRegister}>Create Account</button>
            </>
          ) : (
            <div className="user-menu-wrapper" ref={menuRef}>
              <button
                className="login-btn"
                style={{ backgroundColor: "#f7c873", color: "#3e3e3e", position: "relative" }}
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                {username}
                <span style={{marginLeft: 8, fontSize: 12}}>▼</span>
              </button>
              {menuOpen && (
                <div className="user-dropdown-menu">
                  <button onClick={handleProfile} className="dropdown-item">My Profile</button>
                  <button onClick={handleSettings} className="dropdown-item">Setting</button>
                  <hr className="dropdown-divider" />
                  <button onClick={handleLogout} className="dropdown-item logout-btn">Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;