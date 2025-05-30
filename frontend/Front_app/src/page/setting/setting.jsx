import React, { useState, useEffect, useContext } from "react";
import {Container,Row,Col,Form,Button,Image,Alert,Spinner,} from "react-bootstrap";
import { UserContext } from "../../context/UserContext.jsx";
import "./settings.css";

const Setting = () => {
  const { userData, setUserData } = useContext(UserContext); // استخدام الكونتكست

  const [localUserData, setLocalUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
    profileImage: "",
  });

  const [editField, setEditField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/user/profile/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to load data");

        const data = await res.json();

        setLocalUserData({
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          phone_number: data.phone_number,
          profileImage: data.profile_image || "https://via.placeholder.com/140",
        });

        // تحديث الكونتكست كمان لو فارغ
        if (!userData) {
          setUserData({
            username: data.username || "",
            fullname: {
              first: data.first_name,
              last: data.last_name,
            },
            profileImage: data.profile_image || "https://via.placeholder.com/140",
          });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [setUserData, userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");
      setError("");

      let fieldName = "";
      if (editField === "firstName") fieldName = "first_name";
      else if (editField === "lastName") fieldName = "last_name";
      else if (editField === "phone_number") fieldName = "phone_number";

      const updatedField = {
        [fieldName]: localUserData[editField],
      };

      const res = await fetch("http://localhost:8000/api/user/profile/", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedField),
      });

      if (!res.ok) throw new Error("Failed to update data");

      setMessage("Data updated successfully");
      setEditField(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("profile_image", selectedImage);

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const res = await fetch("http://localhost:8000/api/user/profile/", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload image");

      const data = await res.json();

      // تحديث الصورة في الـ local state
      setLocalUserData((prev) => ({
        ...prev,
        profileImage: data.profile_image || prev.profileImage,
      }));

      // تحديث صورة البروفايل في الكونتكست فورًا
      setUserData((prev) => ({
        ...prev,
        profileImage: data.profile_image
          ? `${data.profile_image}?t=${Date.now()}`
          : prev.profileImage,
      }));

      setMessage("Image updated successfully");
      setSelectedImage(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const renderField = (label, name, type = "text") => (
    <Row className="mb-3 align-items-center" key={name}>
      <Col md={3}>
        <strong>{label}:</strong>
      </Col>
      <Col md={6}>
        {editField === name ? (
          <Form.Control
            type={type}
            name={name}
            value={localUserData[name]}
            onChange={handleChange}
            disabled={saving}
          />
        ) : (
          <span>{localUserData[name] || "-"}</span>
        )}
      </Col>
      <Col md={3}>
        {editField === name ? (
          <>
            <Button
              variant="success"
              size="sm"
              onClick={handleSave}
              disabled={saving}
              className="me-2"
            >
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setEditField(null)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
          className="button-edit"
            size="sm"
            onClick={() => setEditField(name)}
          >
            Edit
          </Button>
        )}
      </Col>
    </Row>
  );

  if (loading)
    return (
      <div className="p-5 text-center">
        <Spinner animation="border" /> Loading...
      </div>
    );
  if (error)
    return (
      <Alert variant="danger" className="p-3 m-4 text-center">
        {error}
      </Alert>
    );

  return (
    <Container className="p-5">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">Profile Setting</h2>
          {message && <Alert variant="success">{message}</Alert>}
        </Col>
      </Row>

      <Row className="mb-4 align-items-center">
        <Col md={4}>
          <Form.Group controlId="formFile" className="mb-3">
            <div className="image-wrapper">
              <Image
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : localUserData.profileImage
                    ? `${localUserData.profileImage}?t=${Date.now()}`
                    : "https://via.placeholder.com/140"
                }
                className="profile-image"
                alt="Profile"
              />
              <div
                className="image-overlay"
                onClick={() => document.getElementById("imageUpload").click()}
              >
                Change
              </div>
            </div>
            <Form.Control
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files[0])}
              style={{ display: "none" }}
            />
            {selectedImage && (
              <Button
                className="mt-2"
                variant="primary"
                onClick={handleImageUpload}
                disabled={saving}
              >
                {saving ? "Uploading..." : "Upload Image"}
              </Button>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Form>
        {renderField("First Name", "firstName")}
        {renderField("Last Name", "lastName")}
        {renderField("Email", "email")}
        {renderField("Phone", "phone_number")}
      </Form>
    </Container>
  );
};

export default Setting;