import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Form, InputGroup, FormControl, Pagination, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';  // استيراد NavLink
import './booking.css';

const Booking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const dummyData = [
        {
          id: 1,
          customer: 'Alice',
          booking: 'Active',
          property: 'Property Name',
          roomType: 'Single',
          checkIn: '24/5',
          checkOut: '1/6',
          payment: 'Paid',
        },
        {
          id: 2,
          customer: 'Bob',
          booking: 'Cancelled',
          property: 'Another Property',
          roomType: 'Double',
          checkIn: '25/5',
          checkOut: '2/6',
          payment: 'Unpaid',
        },
        {
          id: 3,
          customer: 'Sally',
          booking: 'Confirmed',
          property: 'Another Property',
          roomType: 'Singel',
          checkIn: '25/5',
          checkOut: '2/6',
          payment: 'Pending',
        },
      ];
      setBookings(dummyData);
    };

    fetchBookings();
  }, []);

  return (
    <Container fluid className="booking-page">
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
          <h2>Booking Lists</h2>
          <InputGroup className="mb-3 search-bar">
            <FormControl
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Text id="basic-addon2">🔍</InputGroup.Text>
          </InputGroup>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>
                  <Form.Check type="checkbox" />
                </th>
                <th>ID</th>
                <th>Customer</th>
                <th>Booking</th>
                <th>Property</th>
                <th>Room Type</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <Form.Check type="checkbox" />
                  </td>
                  <td>{booking.id}</td>
                  <td>{booking.customer}</td>
                  <td>{booking.booking}</td>
                  <td>{booking.property}</td>
                  <td>{booking.roomType}</td>
                  <td>{booking.checkIn}</td>
                  <td>{booking.checkOut}</td>
                  <td>
                    <span className={`payment-status ${booking.payment.toLowerCase()}`}>
                      {booking.payment}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination className="justify-content-end">
            <Pagination.Prev>prev</Pagination.Prev>
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Next>next</Pagination.Next>
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default Booking;