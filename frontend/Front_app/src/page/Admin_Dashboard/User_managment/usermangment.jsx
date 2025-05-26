import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';  // استيراد NavLink
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  FormControl,
  InputGroup,
  Pagination,
  Nav,
} from 'react-bootstrap';
import './usermanage.css';

const UserManage = () => {
  const dummyUsers = [
    { id: 1, name: 'Tadres', image: '', role: 'manager' },
    { id: 2, name: 'Afaf', image: '', role: 'user' },
    { id: 3, name: 'Essra', image: '', role: 'manager' },
    { id: 4, name: 'Mai', image: '', role: 'user' },
  ];

  const [users, setUsers] = useState(dummyUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  // وظيفة لتغيير دور المستخدم إلى مدير (manager)
  const handleSetManager = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, role: 'manager' } : user
      )
    );
  };

  return (
    <Container fluid className="user-manage-page">
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
          <h2>User Management</h2>

          <InputGroup className="mb-3 search-bar">
            <FormControl
              placeholder="Search users"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
            <InputGroup.Text>🔍</InputGroup.Text>
          </InputGroup>

          <Row>
            {displayedUsers.length > 0 ? (
              displayedUsers.map((user) => (
                <Col key={user.id} xs={12} md={6} lg={4} className="mb-4">
                  <Card className="user-card text-center p-3">
                    <div className="avatar-container">
                      <img
                        src={
                          user.image
                            ? user.image
                            : 'https://via.placeholder.com/100?text=Avatar'
                        }
                        alt={user.name}
                        className="avatar"
                      />
                    </div>
                    <Card.Body>
                      <Card.Title>
                        {user.name}{' '}
                        <small className="text-muted">({user.role})</small>
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        ID: {user.id}
                      </Card.Subtitle>
                      <Button
                        variant="primary"
                        onClick={() => handleSetManager(user.id)}
                        disabled={user.role === 'manager'}
                      >
                        Set as Manager
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <p>No users found.</p>
              </Col>
            )}
          </Row>

          <Pagination className="justify-content-end">
            <Pagination.Prev
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
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
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default UserManage;