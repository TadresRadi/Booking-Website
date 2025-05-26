import React, { useState, useEffect, useRef, useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const defaultAvatar =
  "https://ui-avatars.com/api/?background=67bfd1&color=fff&name=User";

const Header = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
<<<<<<< HEAD
    const handleClickOutside = (event) => {
=======
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
>>>>>>> 76becd6f5489c9197121606fa662a43b81d04682
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

<<<<<<< HEAD
  const navigateTo = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setMenuOpen(false);
    [
      "username",
      "first_name",
      "last_name",
      "profileImage",
      "access",
      "refresh",
    ].forEach((item) => localStorage.removeItem(item));
    setUserData(null);
    navigate("/login");
  };

  // الاسم الأول والآخر بأمان
  const firstName = userData?.fullname?.first || "";
  const lastName = userData?.fullname?.last || "";

  // الصورة الشخصية أو الصورة الافتراضية
  const profileImg =
    userData?.profileImage && userData.profileImage.trim() !== ""
      ? userData.profileImage
      : defaultAvatar;
=======
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
>>>>>>> 76becd6f5489c9197121606fa662a43b81d04682

  return (
    <header className="header" style={{ backgroundColor: 'white' }}>
      <div className="header-content">
        <div className="logo" onClick={() => navigateTo("/home")}>
          Diva
        </div>

        <div className="auth-buttons">
<<<<<<< HEAD
          <button className="login-btn" onClick={() => navigateTo("/fav")}>
            Favorite
          </button>
          <button className="login-btn" onClick={() => navigateTo("/home")}>
            Home
          </button>

          {!userData || !userData.username ? (
            <>
              <button
                className="login-btn"
                onClick={() => navigateTo("/login")}
              >
                Log in
              </button>
              <button
                className="create-account-btn"
                onClick={() => navigateTo("/register")}
              >
                Create Account
              </button>
            </>
          ) : (
            <>
              <button
                className="create-account-btn"
                onClick={() => navigateTo("/add-hotel")}
              >
                Add Your Hotel
              </button>

              <div className="user-menu-wrapper" ref={menuRef}>
                <div
                  className="user-info"
                  onClick={() => setMenuOpen((prev) => !prev)}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <img
                    src={profileImg}
                    alt="Profile"
                    className="header-profile-image"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                    key={profileImg}
                  />
                  <span>
                    {firstName} {lastName}
                  </span>
=======
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
>>>>>>> 76becd6f5489c9197121606fa662a43b81d04682
                </div>

                {menuOpen && (
                  <div className="user-dropdown-menu">
                    <button
                      onClick={() => navigateTo("/profile")}
                      className="dropdown-item"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => navigateTo("/settings")}
                      className="dropdown-item"
                    >
                      Setting
                    </button>
                    <hr className="dropdown-divider" />
                    <button
                      onClick={handleLogout}
                      className="dropdown-item logout-btn"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
