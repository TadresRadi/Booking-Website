import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ProgressBar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboradoverview.module.css';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalBooking: 11230,
    roomAvailable: 312,
    revenue: 79358.5,
    totalProperty: 1250,
    topProperties: [
      { name: 'Hotel Name 1', percentage: 58 },
      { name: 'Hotel Name 2', percentage: 45 },
      { name: 'Hotel Name 3', percentage: 32 },
      { name: 'Hotel Name 4', percentage: 15 },
    ],
  });

  useEffect(() => {
    const fetchData = () => {
      console.log('Simulating API call with dummy data...');
    };
    fetchData();
  }, []);

  return (
    <Container fluid className="admin-dashboard">
      <Row>
        <Col xs={12} md={3} className="sidebar">
          <Nav className="flex-column">
            {/* استخدم NavLink بدل Nav.Link مع href */}
            <Nav.Link as={NavLink} to="/admin" className="sidebar-item" end>
              Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/admin/booking" className="sidebar-item">
              Booking
            </Nav.Link>
            <Nav.Link as={NavLink} to="/admin/customer" className="sidebar-item">
              Customers
            </Nav.Link>
            <Nav.Link as={NavLink} to="/admin/message" className="sidebar-item">
              Message
            </Nav.Link>
            <Nav.Link as={NavLink} to="/admin/user-manage" className="sidebar-item">
              User Manage
            </Nav.Link>
          </Nav>
        </Col>

        <Col xs={12} md={9} className="content">
          <h2>Dashboard Overview</h2>
          <p>Welcome to DashLite Dashboard Template.</p>
          <Row>
            <Col xs={12} md={3}>
              <Card className="info-card">
                <Card.Body>
                  <Card.Title>Total Booking</Card.Title>
                  <Card.Text>{dashboardData.totalBooking}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={3}>
              <Card className="info-card">
                <Card.Body>
                  <Card.Title>Activity</Card.Title>
                  <Card.Text>{dashboardData.roomAvailable}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={3}>
              <Card className="info-card">
                <Card.Body>
                  <Card.Title>Revenue</Card.Title>
                  <Card.Text>{dashboardData.revenue} USD</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={3}>
              <Card className="info-card">
                <Card.Body>
                  <Card.Title>Total Property</Card.Title>
                  <Card.Text>{dashboardData.totalProperty}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Card className="property-card">
                <Card.Body>
                  <Card.Title>Top Selected Property</Card.Title>
                  <Card.Text>In last 30 days top selected property.</Card.Text>
                  <div>
                    {dashboardData.topProperties.map((property, index) => (
                      <p key={index}>
                        {property.name}{' '}
                        <ProgressBar now={property.percentage} label={`${property.percentage}%`} />
                      </p>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;