import React, { useState } from "react";

// Dummy data for the profile (replace with backend data when available)
const initialProfile = {
  avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  fullName: "Musharof Chowdhury",
  jobTitle: "Team Manager",
  location: "Arizona, United States.",
  personal: {
    firstName: "Chowdhury",
    lastName: "Musharof",
    email: "randomuser@pimjo.com",
    phone: "+09 363 398 46",
    bio: "Team Manager",
  },
  address: {
    country: "United States",
    city: "Arizona, United States.",
  },
};

const UserProfile = () => {
  const [profile, setProfile] = useState(initialProfile);

  // Editing states
  const [editSection, setEditSection] = useState(null);
  const [editPersonal, setEditPersonal] = useState(profile.personal);
  const [editAddress, setEditAddress] = useState(profile.address);

  // Edit handlers
  const handleEdit = (section) => setEditSection(section);

  const handleInputChange = (section, e) => {
    const { name, value } = e.target;
    if (section === "personal") {
      setEditPersonal((prev) => ({ ...prev, [name]: value }));
    } else if (section === "address") {
      setEditAddress((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = (section) => {
    if (section === "personal") {
      setProfile((prev) => ({ ...prev, personal: editPersonal }));
    } else if (section === "address") {
      setProfile((prev) => ({ ...prev, address: editAddress }));
    }
    setEditSection(null);
  };

  const handleCancel = () => {
    setEditPersonal(profile.personal);
    setEditAddress(profile.address);
    setEditSection(null);
  };

  return (
    <div style={{
      width: "100%",
      minHeight: "calc(100vh - 60px)",
      background: "#f7f9fb",
      padding: "40px 0"
    }}>
      <div
        className="container-fluid"
        style={{
          maxWidth: "1300px",
          width: "100%",
          margin: "0 auto"
        }}
      >
        {/* Profile Card */}
        <div className="bg-white p-4 rounded-3 mb-4"
          style={{
            boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={profile.avatar}
              alt="avatar"
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: 32,
                border: "3px solid #f4f4f4"
              }}
            />
            <div>
              <h4 className="mb-0">{profile.fullName}</h4>
              <div className="text-muted">{profile.jobTitle} &nbsp;|&nbsp; {profile.location}</div>
            </div>
          </div>
        </div>
        {/* Personal Information */}
        <div className="bg-white p-4 rounded-3 mb-4"
          style={{
            boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
          }}>
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
            <div className="col-md-2 col-12 mb-3">
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
                <div>{profile.personal.firstName}</div>
              )}
            </div>
            <div className="col-md-2 col-12 mb-3">
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
                <div>{profile.personal.lastName}</div>
              )}
            </div>
            <div className="col-md-3 col-12 mb-3">
              <label className="text-muted small">Email address</label>
              {editSection === "personal" ? (
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={editPersonal.email}
                  onChange={(e) => handleInputChange("personal", e)}
                />
              ) : (
                <div>{profile.personal.email}</div>
              )}
            </div>
            <div className="col-md-3 col-12 mb-3">
              <label className="text-muted small">Phone</label>
              {editSection === "personal" ? (
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={editPersonal.phone}
                  onChange={(e) => handleInputChange("personal", e)}
                />
              ) : (
                <div>{profile.personal.phone}</div>
              )}
            </div>
            <div className="col-md-2 col-12 mb-3">
              <label className="text-muted small">Bio</label>
              {editSection === "personal" ? (
                <input
                  type="text"
                  className="form-control"
                  name="bio"
                  value={editPersonal.bio}
                  onChange={(e) => handleInputChange("personal", e)}
                />
              ) : (
                <div>{profile.personal.bio}</div>
              )}
            </div>
          </div>
        </div>
        {/* Address */}
        <div className="bg-white p-4 rounded-3 mb-4"
          style={{
            boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
          }}>
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
            <div className="col-md-6 col-12 mb-3">
              <label className="text-muted small">Country</label>
              {editSection === "address" ? (
                <input
                  type="text"
                  className="form-control"
                  name="country"
                  value={editAddress.country}
                  onChange={(e) => handleInputChange("address", e)}
                />
              ) : (
                <div>{profile.address.country}</div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label className="text-muted small">City/State</label>
              {editSection === "address" ? (
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={editAddress.city}
                  onChange={(e) => handleInputChange("address", e)}
                />
              ) : (
                <div>{profile.address.city}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;