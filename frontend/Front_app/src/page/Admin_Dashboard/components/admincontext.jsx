import React, { createContext, useState, useEffect } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    profileImage: "",
    username: "",
  });

  // جلب بيانات الأدمن أول ما يدخل على صفحات الأدمن
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access");
        if (!token) return;
        const response = await fetch("http://localhost:8000/api/user/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) return;
        const data = await response.json();
        setUserData({
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          email: data.email || "",
          phone: data.phone_number || "",
          address: data.address || "",
          profileImage: data.profile_image || "",
          username: data.username || "",
        });
      } catch (error) {
        console.error("Failed to fetch admin profile:", error);
      }
    };
    fetchProfile();
  }, []); // يحصل أول مرة فقط

  return (
    <AdminContext.Provider value={{ userData, setUserData }}>
      {children}
    </AdminContext.Provider>
  );
};