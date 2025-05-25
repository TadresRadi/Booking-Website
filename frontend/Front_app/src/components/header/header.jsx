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

  // Navigation handlers adapted to work with <a> tags
  function handleFav(e) {
    e.preventDefault();
    navigate('/fav');
  }
  function handleLogin(e) {
    e.preventDefault();
    navigate('/login');
  }
  function handleRegister(e) {
    e.preventDefault();
    navigate('/register');
  }
  function handleHome(e) {
    e.preventDefault();
    navigate('/home'); 
  }
  function handleProfile(e) {
    e.preventDefault();
    setMenuOpen(false);
    navigate('/profile');
  }
  function handleSettings(e) {
    e.preventDefault();
    setMenuOpen(false);
    navigate('/settings');
  }
  function handleLogout(e) {
    e.preventDefault();
    setMenuOpen(false);
    localStorage.removeItem("username");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUsername(null);
    navigate('/login');
  }

  return (
    <header className="header" style={{ backgroundColor: 'white' }}>
      <div className="header-content">
        <div className="logo" style={{ cursor: 'pointer' }} onClick={handleHome}>Logo</div>
        <div className="auth-buttons">
          <a href="/fav" onClick={handleFav} className="login-btn" role="button">Favorite</a>
          <a href="/home" onClick={handleHome} className="login-btn" role="button">Home</a>
          {!username ? (
            <>
              <a href="/login" onClick={handleLogin} className="login-btn" role="button">Log in</a>
              <a href="/register" onClick={handleRegister} className="create-account-btn" role="button">Create Account</a>
            </>
          ) : (
            <div className="user-menu-wrapper" ref={menuRef}>
              <a
                href="#"
                className="login-btn"
                style={{ backgroundColor: "#f7c873", color: "#3e3e3e", position: "relative" }}
                onClick={(e) => { e.preventDefault(); setMenuOpen(prev => !prev); }}
                role="button"
              >
                {username}
                <span style={{marginLeft: 8, fontSize: 12}}>▼</span>
              </a>
              {menuOpen && (
                <div className="user-dropdown-menu">
                  <a href="/profile" onClick={handleProfile} className="dropdown-item" role="button">My Profile</a>
                  <a href="/settings" onClick={handleSettings} className="dropdown-item" role="button">Setting</a>
                  <hr className="dropdown-divider" />
                  <a href="/logout" onClick={handleLogout} className="dropdown-item logout-btn" role="button">Logout</a>
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
