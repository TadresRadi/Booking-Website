import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // 1) لازم تعتمد على وجود access token, حتى لو مفيش username
    const access = localStorage.getItem("access");
    if (access) {
      const username = localStorage.getItem("username") || "";
      const first_name = localStorage.getItem("first_name") || "";
      const last_name = localStorage.getItem("last_name") || "";
      let profileImage = localStorage.getItem("profileImage") || null;

      if (profileImage && !profileImage.includes("?t=")) {
        profileImage = `${profileImage}?t=${Date.now()}`;
      }

      // طالما فيه access token، اعتبر المستخدم مسجل دخول حتى لو مفيش username (يعني login session فقط)
      setUserData({
        username,
        fullname: {
          first: first_name,
          last: last_name,
        },
        profileImage,
      });
    } else {
      setUserData(null);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};