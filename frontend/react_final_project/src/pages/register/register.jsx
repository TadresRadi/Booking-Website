import React from 'react';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaInstagram, FaGoogle, FaFacebook } from 'react-icons/fa';

import 'bootstrap/dist/css/bootstrap.min.css';
import './register.css'; 

export function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
//from here we call the api
  };

  return (
    <Container className="form-container">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="card-custom">
            <Card.Body>
              <Card.Title className="card-title-center">Sign Up</Card.Title>
              <div className='div_re'>Create your account in seconds</div>

              <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Form.Group className="mb-3" controlId="firstName">
                  <Form.Control 
                    type="text" 
                    placeholder="First Name" 
                    {...register("firstName", { required: " Name is required" })}
                  />
                  {errors.firstName && <div className="error-message">{errors.firstName.message}</div>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Control 
                    type="text" 
                    placeholder="Last Name" 
                    {...register("lastName", { required: " Name is required" })}
                  />
                  {errors.lastName && <div className="error-message">{errors.lastName.message}</div>}
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
                  {errors.email && <div className="error-message">{errors.email.message}</div>}
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
                  {errors.password && <div className="error-message">{errors.password.message}</div>}
                </Form.Group>

                <Form.Group className="mb-3 check_box" controlId="terms">
                  <Form.Check 
                    type="checkbox" 
                    label="I agree to the terms and policies" 
                    {...register("terms", { required: "You must agree to the terms" })}
                  />
                  {errors.terms && <div className="error-message">{errors.terms.message}</div>}
                </Form.Group>

                <Button variant="primary" type="submit" className="create-account-button w-100">
                  Create Account
                </Button>
              </Form>

              <p className='register_p'>or continue with</p>

              <div className="social-icons">
              
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <FaGoogle size={30} color="#4285F4" className="social-icon" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <FaFacebook size={30} color="#1877F2" className="social-icon" />
                </a>
              </div>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
