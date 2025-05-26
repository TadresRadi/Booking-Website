import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';  // إضافة NavLink
import './message.css';

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('active');
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const dummyMessages = [
        {
          id: 1,
          name: 'Michle Afodn',
          issue: 'Unable to select currency when booking.',
          description: 'Hello team, I am facing problem as I can not book a page.',
          tab: 'active',
          avatar: 'https://via.placeholder.com/50',
        },
        {
          id: 2,
          name: 'Nicilie Dlan',
          issue: 'I can not submit KYC application',
          description: 'Hello support! I can not upload my documents on KYC application.',
          tab: 'closed',
          avatar: 'https://via.placeholder.com/50',
        },
        {
          id: 3,
          name: 'Tomas Divon',
          issue: 'I can not submit KYC application',
          description: 'Hello support! I can not upload my documents on KYC application.',
          tab: 'active',
          avatar: 'https://via.placeholder.com/50',
        },
      ];
      setMessages(dummyMessages);
    };

    fetchMessages();
  }, []);

  const filteredMessages = activeTab === 'all' ? messages : messages.filter(msg => msg.tab === activeTab);

  // لو الرسالة المختارة مش في القائمة الحالية للفلتر، نبعد الاختيار عشان ما يعرضش حاجة غلط
  useEffect(() => {
    if (selectedMessage && !filteredMessages.some(msg => msg.id === selectedMessage.id)) {
      setSelectedMessage(null);
    }
  }, [activeTab, filteredMessages, selectedMessage]);

  return (
    <Container fluid className="message-page">
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
          <h2>Message</h2>
          <Nav variant="tabs" activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)} className="mb-3">
            <Nav.Item>
              <Nav.Link eventKey="active">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="closed">Closed</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="started">Started</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="all">All</Nav.Link>
            </Nav.Item>
          </Nav>
          <Row>
            <Col xs={12} md={5} className="message-list">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`message-item ${selectedMessage?.id === msg.id ? 'selected' : ''}`}
                    onClick={() => setSelectedMessage(msg)}
                  >
                    <img src={msg.avatar} alt={msg.name} className="avatar" />
                    <div>
                      <h5>{msg.name}</h5>
                      <p className="issue">{msg.issue}</p>
                      <p className="description">{msg.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">No messages found in this tab.</p>
              )}
            </Col>
            <Col xs={12} md={7} className="message-details">
              {selectedMessage ? (
                <>
                  <div className="message-header">
                    <img src={selectedMessage.avatar} alt={selectedMessage.name} className="avatar" />
                    <div>
                      <h5>{selectedMessage.name}</h5>
                      <p>{selectedMessage.issue}</p>
                    </div>
                  </div>
                  <div className="message-body">
                    <p>{selectedMessage.description}</p>
                  </div>
                  <Form>
                    <Form.Group controlId="response">
                      <Form.Control as="textarea" rows={3} placeholder="Type your response..." />
                    </Form.Group>
                    <Button variant="primary" className="mt-2">
                      Send
                    </Button>
                  </Form>
                </>
              ) : (
                <p>Select a message to view details</p>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Message;