import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      let profileImage = localStorage.getItem("profileImage") || null;

      if (profileImage && !profileImage.includes("?t=")) {
        profileImage = `${profileImage}?t=${Date.now()}`;
      }

      setUserData({
        username,
        fullname: {
          first: localStorage.getItem("first_name") || "",
          last: localStorage.getItem("last_name") || "",
        },
        profileImage,
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};