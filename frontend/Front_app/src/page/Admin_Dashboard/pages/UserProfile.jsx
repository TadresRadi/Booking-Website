import React, { useState, useEffect, useCallback, useContext } from "react";
import { AdminContext } from "../components/admincontext.jsx"; // المسار صحيح

const UserProfile = () => {
  const { userData, setUserData } = useContext(AdminContext);

  const [loading, setLoading] = useState(true);
  const [editSection, setEditSection] = useState(null);
  const [editPersonal, setEditPersonal] = useState({});
  const [editAddress, setEditAddress] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [savingImage, setSavingImage] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // جلب بيانات البروفايل
  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access");
      const response = await fetch("http://localhost:8000/api/user/profile/", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      const newUser = {
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        email: data.email || "",
        phone: data.phone_number || "",
        address: data.address || "",
        profileImage: data.profile_image || "",
        username: data.username || "",
      };
      setUserData(newUser);
      setEditPersonal({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phone: newUser.phone,
      });
      setEditAddress(newUser.address);
      setErrorMsg("");
    } catch {
      setErrorMsg("Failed to load profile data.");
    }
    setLoading(false);
  }, [setUserData]);

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const handleEdit = (section) => setEditSection(section);

  const handleInputChange = (section, e) => {
    const { name, value } = e.target;
    if (section === "personal") {
      setEditPersonal((prev) => ({ ...prev, [name]: value }));
    } else if (section === "address") {
      setEditAddress(value);
    }
  };

  // تعديل بيانات نصية فقط
  const handleSave = async (section) => {
    try {
      const token = localStorage.getItem("access");
      const formData = new FormData();

      if (section === "personal") {
        formData.append("first_name", editPersonal.firstName);
        formData.append("last_name", editPersonal.lastName);
        formData.append("phone_number", editPersonal.phone);
      } else if (section === "address") {
        formData.append("address", editAddress);
      }

      const response = await fetch("http://localhost:8000/api/user/profile/", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData
      });
      if (response.ok) {
        // نحاول ناخد الداتا الجديدة من السيرفر، ولو مفيش نستخدم القيم اللي عدلناها
        const data = await response.json().catch(() => ({}));
        setSuccessMsg("Profile updated successfully");
        setEditSection(null);

        setUserData((prev) => ({
          ...prev,
          firstName: data.first_name ?? (section === "personal" ? editPersonal.firstName : prev.firstName),
          lastName: data.last_name ?? (section === "personal" ? editPersonal.lastName : prev.lastName),
          phone: data.phone_number ?? (section === "personal" ? editPersonal.phone : prev.phone),
          address: data.address ?? (section === "address" ? editAddress : prev.address),
        }));

        if (section === "personal") {
          setEditPersonal({
            firstName: data.first_name ?? editPersonal.firstName,
            lastName: data.last_name ?? editPersonal.lastName,
            phone: data.phone_number ?? editPersonal.phone,
          });
        }
        if (section === "address") {
          setEditAddress(data.address ?? editAddress);
        }
      } else {
        const errorText = await response.text();
        setErrorMsg(`Failed to update profile. Server says: ${errorText}`);
      }
    } catch  {
      setErrorMsg("Failed to update profile. Error in request.");
    }
  };

  // رفع صورة فقط (FormData)
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;
    setSavingImage(true);
    setSuccessMsg("");
    setErrorMsg("");
    const token = localStorage.getItem("access");
    const formData = new FormData();
    formData.append("profile_image", selectedImage);

    try {
      const response = await fetch("http://localhost:8000/api/user/profile/", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });
      if (response.ok) {
        const data = await response.json().catch(() => ({}));
        setSuccessMsg("Image updated successfully");
        setSelectedImage(null);

        setUserData((prev) => ({
          ...prev,
          profileImage: data.profile_image
            ? `${data.profile_image}?t=${Date.now()}`
            : prev.profileImage,
        }));
      } else {
        const errorText = await response.text();
        setErrorMsg(`Failed to upload image. Server says: ${errorText}`);
      }
    } catch  {
      setErrorMsg("Failed to upload image.");
    }
    setSavingImage(false);
  };

  const handleCancel = () => {
    setEditPersonal({
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      phone: userData.phone || "",
    });
    setEditAddress(userData.address || "");
    setEditSection(null);
    setSelectedImage(null);
    setErrorMsg("");
    setSuccessMsg("");
  };

  if (loading)
    return <div className="text-center mt-5">Loading...</div>;

  return (
    <div style={{
      width: "100%",
      minHeight: "calc(100vh - 60px)",
      background: "#f7f9fb",
      padding: "40px 0"
    }}>
      <div className="container-fluid" style={{ maxWidth: "1300px", width: "100%", margin: "0 auto" }}>
        {successMsg && <div className="alert alert-success">{successMsg}</div>}
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
        {/* Profile Card */}
        <div className="bg-white p-4 rounded-3 mb-4" style={{
          boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
            <div className="image-wrapper" style={{ position: "relative", width: 80, height: 80 }}>
              <img
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : userData.profileImage || "/default-avatar.png"
                }
                alt="avatar"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #f4f4f4"
                }}
              />
              <label
                htmlFor="profile-image-upload"
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.25)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "1.1em",
                  letterSpacing: "1px",
                  transition: "opacity 0.3s",
                  zIndex: 2,
                }}
                className="change-overlay"
                title="Change profile image"
              >
                Change
              </label>
              <input
                id="profile-image-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
                disabled={savingImage}
              />
              {selectedImage &&
                <button
                  className="btn btn-sm btn-primary mt-2"
                  style={{ position: "absolute", left: "100%", top: 0, marginLeft: 12, zIndex: 3 }}
                  onClick={handleImageUpload}
                  disabled={savingImage}
                >
                  {savingImage ? "Uploading..." : "Upload"}
                </button>
              }
            </div>
            <div>
              <h4 className="mb-0 ms-4">{userData.username || ""}</h4>
              <div className="text-muted ms-4">{userData.email}</div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white p-4 rounded-3 mb-4" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.02)" }}>
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
            <h5 className="mb-0">Personal Information</h5>
            {editSection === "personal" ? (
              <span>
                <button className="btn btn-primary btn-sm me-2" onClick={() => handleSave("personal")}>Save</button>
                <button className="btn btn-outline-secondary btn-sm" onClick={handleCancel}>Cancel</button>
              </span>
            ) : (
              <button className="btn btn-light border" onClick={() => handleEdit("personal")}>
                <i className="bi bi-pencil"></i> Edit
              </button>
            )}
          </div>
          <div className="row">
            <div className="col-md-4 col-12 mb-3">
              <label className="text-muted small">First Name</label>
              {editSection === "personal" ? (
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={editPersonal.firstName}
                  onChange={(e) => handleInputChange("personal", e)}
                />
              ) : (
                <div>{userData.firstName || "-"}</div>
              )}
            </div>
            <div className="col-md-4 col-12 mb-3">
              <label className="text-muted small">Last Name</label>
              {editSection === "personal" ? (
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={editPersonal.lastName}
                  onChange={(e) => handleInputChange("personal", e)}
                />
              ) : (
                <div>{userData.lastName || "-"}</div>
              )}
            </div>
            <div className="col-md-4 col-12 mb-3">
              <label className="text-muted small">Phone Number</label>
              {editSection === "personal" ? (
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={editPersonal.phone}
                  onChange={(e) => handleInputChange("personal", e)}
                />
              ) : (
                <div>{userData.phone || "-"}</div>
              )}
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white p-4 rounded-3 mb-4" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.02)" }}>
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
            <h5 className="mb-0">Address</h5>
            {editSection === "address" ? (
              <span>
                <button className="btn btn-primary btn-sm me-2" onClick={() => handleSave("address")}>Save</button>
                <button className="btn btn-outline-secondary btn-sm" onClick={handleCancel}>Cancel</button>
              </span>
            ) : (
              <button className="btn btn-light border" onClick={() => handleEdit("address")}>
                <i className="bi bi-pencil"></i> Edit
              </button>
            )}
          </div>
          <div className="row">
            <div className="col-12 mb-3">
              <label className="text-muted small">Address</label>
              {editSection === "address" ? (
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={editAddress}
                  onChange={(e) => handleInputChange("address", e)}
                />
              ) : (
                <div>{userData.address || "-"}</div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* --- Style for hover overlay --- */}
      <style>
        {`
          .image-wrapper:hover .change-overlay {
            opacity: 1 !important;
          }
          .change-overlay {
            opacity: 0.55;
            transition: opacity 0.3s;
          }
        `}
      </style>
    </div>
  );
};

export default UserProfile;