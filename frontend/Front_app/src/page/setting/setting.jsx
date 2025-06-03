import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Form, Button, Image, Alert, Spinner, Card, Table } from "react-bootstrap";
import { UserContext } from "../../context/UserContext.jsx";
import "./Settings.css";

const Setting = () => {
  const { userData, setUserData } = useContext(UserContext);

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

  const [payments, setPayments] = useState([]);
  const [paymentsLoading, setPaymentsLoading] = useState(true);
  const [paymentsError, setPaymentsError] = useState("");

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8000/api/user/profile/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to load data");
        const data = await res.json();

        setLocalUserData({
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          email: data.email || "",
          phone_number: data.phone_number || "",
          profileImage: data.profile_image || "https://via.placeholder.com/140",
        });

        if (!userData) {
          setUserData({
            username: data.username || "",
            fullname: {
              first: data.first_name || "",
              last: data.last_name || "",
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
    // eslint-disable-next-line
  }, []);

  // Fetch user payments
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setPaymentsLoading(true);
        const res = await fetch("http://localhost:8000/api/user/payments/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error("Failed to load payments");
        const data = await res.json();
        setPayments(data);
      } catch (err) {
        setPaymentsError(err.message);
      } finally {
        setPaymentsLoading(false);
      }
    };
    fetchPayments();
  }, []);

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

      const formData = new FormData();
      formData.append(fieldName, localUserData[editField]);

      const res = await fetch("http://localhost:8000/api/user/profile/", {
        method: "PUT",
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update data.");
      const data = await res.json();

      setLocalUserData((prev) => ({
        ...prev,
        [editField]:
          fieldName === "first_name"
            ? data.first_name ?? prev[editField]
            : fieldName === "last_name"
            ? data.last_name ?? prev[editField]
            : fieldName === "phone_number"
            ? data.phone_number ?? prev[editField]
            : prev[editField],
      }));

      setUserData((prev) => ({
        ...prev,
        fullname: {
          ...prev.fullname,
          first:
            data.first_name ??
            (editField === "firstName" ? localUserData.firstName : prev.fullname.first),
          last:
            data.last_name ??
            (editField === "lastName" ? localUserData.lastName : prev.fullname.last),
        },
      }));

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
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload image.");
      const data = await res.json();

      setLocalUserData((prev) => ({
        ...prev,
        profileImage: data.profile_image || prev.profileImage,
      }));

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
      <Col md={4}><span className="setting-label">{label}</span></Col>
      <Col md={5}>
        {editField === name ? (
          <Form.Control
            type={type}
            name={name}
            value={localUserData[name]}
            onChange={handleChange}
            disabled={saving}
            className="fancy-input"
          />
        ) : (
          <span className="value-text">{localUserData[name] || "-"}</span>
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
              className="me-2 simple-btn"
            >
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="simple-btn"
              onClick={() => setEditField(null)}
            >
              Cancel
            </Button>
          </>
        ) : name !== "email" ? (
          <Button
            className="button-edit simple-btn"
            size="sm"
            onClick={() => setEditField(name)}
          >
            Edit
          </Button>
        ) : null}
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
    <Container className="setting-root py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={7}>
          <Card className="profile-card p-4 shadow-sm border-0 mb-4">
            <div className="d-flex flex-column align-items-center mb-4">
              <div className="image-wrapper mb-2">
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
                  className="mt-2 simple-btn"
                  variant="primary"
                  onClick={handleImageUpload}
                  disabled={saving}
                >
                  {saving ? "Uploading..." : "Upload Image"}
                </Button>
              )}
            </div>
            <h2 className="fw-bold text-center mb-1">Profile Setting</h2>
            {message && <Alert variant="success" className="text-center">{message}</Alert>}
            <Form className="my-4">
              {renderField("First Name", "firstName")}
              {renderField("Last Name", "lastName")}
              {renderField("Email", "email")}
              {renderField("Phone", "phone_number")}
            </Form>
          </Card>
          {/* Purchase History Section */}
          <Card className="purchase-card shadow-sm border-0">
            <Card.Body>
              <h4 className="fw-bold mb-3 text-center">Purchase History</h4>
              {paymentsLoading ? (
                <div className="text-center"><Spinner animation="border" /></div>
              ) : paymentsError ? (
                <Alert variant="danger" className="text-center">{paymentsError}</Alert>
              ) : payments.length === 0 ? (
                <p className="text-center text-muted">No purchase history found.</p>
              ) : (
                <div className="table-responsive">
                  <Table hover className="simple-table align-middle mb-0">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Method</th>
                        <th>Billing Address</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.payment_method}</td>
                          <td>{item.billing_address}</td>
                          <td>{item.created_at ? new Date(item.created_at).toLocaleString() : "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Setting;