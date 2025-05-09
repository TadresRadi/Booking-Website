import React from 'react';
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

export function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
      accept_terms: data.accept_terms,
    };

    const response = await fetch('http://127.0.0.1:5000/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <div className={styles.bodylike}>
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center px-2">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <Card className={`${styles.cardCustom} w-100`}>
            <Card.Body>
              <Card.Title className="text-center mb-3">Sign Up</Card.Title>
              <p className="text-center text-muted mb-4">Create your account in seconds</p>

              <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Form.Group className="mb-3" controlId="firstName">
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    {...register("firstName", { required: "First name is required" })}
                  />
                  {errors.firstName && <div className={styles.errorMessage}>{errors.firstName.message}</div>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    {...register("lastName", { required: "Last name is required" })}
                  />
                  {errors.lastName && <div className={styles.errorMessage}>{errors.lastName.message}</div>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9]+@gmail\.com$/,
                        message: "Invalid email format"
                      }
                    })}
                  />
                  {errors.email && <div className={styles.errorMessage}>{errors.email.message}</div>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
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
