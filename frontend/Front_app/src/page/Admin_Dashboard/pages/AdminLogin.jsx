import React, { useState } from "react";
import { Button, Form, Card, Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setShowError(false);
  setLoading(true);

  try {
    const response = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });

    const result = await response.json();
    console.log("Login response:", result);

    if (
      response.ok &&
      result.tokens &&
      result.tokens.access &&
      result.tokens.refresh &&
      result.user &&
      result.user.is_superuser
    ) {
      // حفظ التوكنات وبيانات المستخدم
      localStorage.setItem("admin_access", result.tokens.access);
      localStorage.setItem("admin_refresh", result.tokens.refresh);
      localStorage.setItem("access", result.tokens.access);
      localStorage.setItem("refresh", result.tokens.refresh);
      localStorage.setItem("admin_username", result.user.username || "");
      localStorage.setItem("admin_first_name", result.user.first_name || "");
      localStorage.setItem("admin_last_name", result.user.last_name || "");
      if (result.user.profile_image) {
        const imageUrl = `${result.user.profile_image}?t=${Date.now()}`;
        localStorage.setItem("admin_profileImage", imageUrl);
      } else {
        localStorage.removeItem("admin_profileImage");
      }
      window.location.href = "/admin/dashboard";
    } else {
      setShowError(true);
    }
  } catch (error) {
    console.error("Login error:", error);
    setShowError(true);
  }
  setLoading(false);
};

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f2027 0%, #2c5364 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow-lg" style={{ borderRadius: "20px", background: "rgba(255,255,255,0.95)" }}>
              <Card.Body>
                <div className="text-center mb-4">
                  <img src="/WebLogo.svg" alt="Admin Logo" height="50" />
                  <h3 className="mt-2" style={{ color: "#2c5364" }}>Admin Login</h3>
                  <p className="text-muted">Welcome back, Admin!</p>
                </div>
                {showError && (
                  <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                    Invalid credentials or you are not a superuser!
                  </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicUsername" className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword" className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    style={{
                      background: "linear-gradient(90deg, #0f2027 0%, #2c5364 100%)",
                      border: "none",
                      fontWeight: "bold",
                      letterSpacing: "1px"
                    }}
                    disabled={loading}
                  >
                    {loading ? <Spinner animation="border" size="sm" /> : "Login"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
            <div className="text-center mt-3 text-white">
              <small>&copy; {new Date().getFullYear()} Admin Dashboard</small>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminLogin;