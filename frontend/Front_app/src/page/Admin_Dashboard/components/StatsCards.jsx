import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaUsers, FaShoppingCart } from 'react-icons/fa';

const AdminTopbar = ({ stats }) => {
  // حماية من الداتا الناقصة
  if (
    !stats ||
    !stats.customers ||
    !stats.orders ||
    !stats.target
  ) {
    return (
      <div className="alert alert-warning">
        Stats data is missing or invalid.
      </div>
    );
  }

  return (
    <Row className="g-3">
      <Col md={4}>
        <Card className="h-100">
          <Card.Body>
            <div className="d-flex align-items-center">
              <FaUsers size={28} className="me-3 text-primary" />
              <div>
                <div className="small text-muted">Customers</div>
                <div className="fs-4 fw-bold">{stats.customers.count}</div>
                <div className={
                  stats.customers.diff > 0 ? "small text-success" : "small text-danger"
                }>
                  {stats.customers.diff > 0
                    ? `↑ ${stats.customers.diff}%`
                    : `↓ ${Math.abs(stats.customers.diff)}%`
                  }
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="h-100">
          <Card.Body>
            <div className="d-flex align-items-center">
              <FaShoppingCart size={28} className="me-3 text-primary" />
              <div>
                <div className="small text-muted">Orders</div>
                <div className="fs-4 fw-bold">{stats.orders.count}</div>
                <div className={
                  stats.orders.diff > 0 ? "small text-success" : "small text-danger"
                }>
                  {stats.orders.diff > 0
                    ? `↑ ${stats.orders.diff}%`
                    : `↓ ${Math.abs(stats.orders.diff)}%`
                  }
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="h-100">
          <Card.Body>
            <div>
              <div className="small text-muted">Monthly Target!</div>
              <div className="fs-4 fw-bold">{stats.target.percent}%</div>
              <div className="small text-success">{stats.target.note}</div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AdminTopbar;