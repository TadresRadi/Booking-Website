import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './register.module.css';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setServerError('');

    const formData = new FormData();
    formData.append('first_name', data.firstName);
    formData.append('last_name', data.lastName);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('accept_terms', data.accept_terms);
    formData.append('birth_date', data.birth_date);
    formData.append('phone_number', data.phone_number);
    if (data.profile_image && data.profile_image[0]) {
      formData.append('profile_image', data.profile_image[0]);
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        navigate('/register-success');
      } else {
        if (result && typeof result === 'object') {
          const firstError = Object.values(result)[0];
          setServerError(Array.isArray(firstError) ? firstError[0] : firstError);
        } else {
          setServerError('Something went wrong. Please try again.');
        }
      }
    } catch {
      setServerError('Network error, please try again later.');
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  // معاينة الصورة قبل الرفع
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className={styles.bodylike}>
      <Container fluid className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className="w-100 justify-content-center px-2">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <Card className={`${styles.cardCustom} w-100`}>
              <Card.Body>
                <Card.Title className="text-center mb-3 txt">Sign Up</Card.Title>
                <p className="text-center text-muted mb-4">Create your account in seconds</p>

                {serverError && <div className={styles.errorMessage}>{serverError}</div>}

                <Form onSubmit={handleSubmit(onSubmit)} noValidate encType="multipart/form-data">
                  <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      {...register("firstName", { required: "First name is required" })}
                    />
                    {errors.firstName && <div className={styles.errorMessage}>{errors.firstName.message}</div>}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      {...register("lastName", { required: "Last name is required" })}
                    />
                    {errors.lastName && <div className={styles.errorMessage}>{errors.lastName.message}</div>}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email Address"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                          message: "Invalid email format"
                        }
                      })}
                    />
                    {errors.email && <div className={styles.errorMessage}>{errors.email.message}</div>}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Create Password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters"
                        }
                      })}
                    />
                    {errors.password && <div className={styles.errorMessage}>{errors.password.message}</div>}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="birth_date">
                    <Form.Label>Birth Date</Form.Label>
                    <Form.Control
                      type="date"
                      {...register("birth_date", { required: "Birth date is required" })}
                    />
                    {errors.birth_date && <div className={styles.errorMessage}>{errors.birth_date.message}</div>}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="phone_number">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Phone Number"
                      {...register("phone_number", { required: "Phone number is required" })}
                    />
                    {errors.phone_number && <div className={styles.errorMessage}>{errors.phone_number.message}</div>}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="profile_image">
                    <Form.Label>Profile Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      {...register("profile_image")}
                      onChange={handleImageChange}
                    />
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mt-2"
                        style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover', borderRadius: '50%' }}
                      />
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="accept_terms">
                    <Form.Check
                      type="checkbox"
                      label="I agree to the terms and policies"
                      {...register("accept_terms", { required: "You must agree to the terms" })}
                      className="text-muted"
                    />
                    {errors.accept_terms && <div className={styles.errorMessage}>{errors.accept_terms.message}</div>}
                  </Form.Group>

                  <Button variant="primary" type="submit" className={styles.createAccountButton}>
                    Create Account
                  </Button>
                  <Button variant="link" onClick={goToLogin} className={styles.createAccountButton}>
                    Login
                  </Button>
                </Form>

                <p className="text-center text-muted mt-4">or continue with</p>

                <div className="d-flex justify-content-center mt-2">
                  <a href="#" className="me-3"><FaGoogle size={30} color="#4285F4" /></a>
                  <a href="#"><FaFacebook size={30} color="#1877F2" /></a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;