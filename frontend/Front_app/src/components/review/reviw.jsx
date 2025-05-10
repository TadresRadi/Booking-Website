import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

const reviews = [
  {
    text: "Staying was nice, clean, good service..",
    author: "Esraa Salman",
    date: "1 May, 2025",
  },
  {
    text: "Staying was nice, clean, good service..",
    author: "Esraa Salman",
    date: "1 May, 2025",
  },
];

export default function ReviewSection() {
  return (
    <div className="p-4 border rounded ">
      <h5 className="mb-3">Review</h5>
      <Row className="align-items-center">
        <Col md={2} className="text-center">
          <h3 className="text-info fw-bold">8/10</h3>
          <div className="text-warning">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
          <small className="text-muted">12.2k reviews</small>
        </Col>

        <Col md={10}>
          <Row className="g-3">
            {reviews.map((review, i) => (
              <Col md={6} key={i}>
                <Card className="p-3 shadow-sm">
                  <p className="text-muted mb-2">{review.text}</p>
                  <div className="d-flex justify-content-between">
                    <a href="#" className="text-info">see more</a>
                    <div className="text-end">
                      <div className="fw-semibold">{review.author}</div>
                      <small className="text-muted">{review.date}</small>
                    </div>
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
