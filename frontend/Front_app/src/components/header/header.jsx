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
    const handleClickOutside = (event) => {
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

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo" onClick={() => navigateTo("/home")}>
          Diva
        </div>

        <div className="auth-buttons">
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