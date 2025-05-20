import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default function ReviewSection({ reviews }) {

  const avgRating = reviews.length
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="p-4 border rounded">
      <h5 className="mb-3 fs-2" style={{ color: '#4697A8' }}>Reviews</h5>
      <Row className="align-items-center">
        <Col md={2} className="text-center">
          <h3 className="fw-bold" style={{ color: '#4697A8' }}>
            {avgRating}/10
          </h3>
          <div className="text-warning">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} color={i < Math.round(avgRating / 2) ? '#ffc107' : '#e4e5e9'} />
            ))}
          </div>
          <small className="text-muted">{reviews.length} reviews</small>
        </Col>

        <Col md={10}>
          <Row className="g-3">
            {reviews.map((review) => (
             <Col md={6} key={review.id}>
  <Card className="p-3 shadow-sm">
    {/* User name on the first line */}
    <div className="fw-semibold mb-2 text-start">{review.user}</div>

    {/* Comment centered on the next line */}
    <p className="text-muted text-center mb-2">{review.comment}</p>

    {/* Date aligned to the right */}
    <div className="text-end">
      <small className="text-muted">{formatDate(review.created_at)}</small>
    </div>
  </Card>
</Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}
