import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Form, InputGroup, FormControl, Pagination, Button, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';  // استيراد NavLink
import './customer.css';

const Customer = () => {
  const [customers, setCustomers] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          `https://your-api-endpoint/customers?page=${currentPage}&search=${encodeURIComponent(searchQuery)}`
        );
        const data = await response.json();
        setCustomers(data.customers);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, [currentPage, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  return (
    <Container fluid className="customer-page">
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
          <h2>Customer Lists</h2>
          <InputGroup className="mb-3 search-bar">
            <FormControl
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon2"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <InputGroup.Text id="basic-addon2">🔍</InputGroup.Text>
          </InputGroup>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.createdAt}</td>
                    <td>
                      <Button variant="link" className="action-btn">
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <Pagination className="justify-content-end">
            <Pagination.Prev
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              prev
            </Pagination.Prev>
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === currentPage}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              next
            </Pagination.Next>
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default Customer;