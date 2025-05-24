import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import styles from './register.module.css';

function RegisterSuccess() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className={styles.bodylike}>
      <Container fluid className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className="w-100 justify-content-center px-2">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <Card className={`${styles.cardCustom} w-100 text-center`}>
              <Card.Body>
                <Card.Title className="mb-4" style={{ fontSize: '2rem', color: '#4caf50' }}>
                  🎉 Congratulations!
                </Card.Title>
                <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
                  You have successfully registered a new user.<br />
                  <span style={{ color: "#888" }}>  Congratulations, you have successfully created a new user  </span>
                </p>
                <Button variant="primary" onClick={goToLogin} className={styles.createAccountButton}>
                  Go to Login
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RegisterSuccess;