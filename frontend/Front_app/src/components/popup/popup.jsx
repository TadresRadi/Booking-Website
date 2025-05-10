import React, { useState } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import locationImg from '../../assets/hotel4.jpg';

export default function PhotoGallery() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>

      <div className="position-relative " onClick={handleShow} style={{ cursor: "pointer" }}>
     
        <Row className="opacity-50">
          <Col md={12} className="mb-1">
            <img src={locationImg} alt="Top" className="img-fluid rounded w-100 " />
          </Col>

       
          <Col md={6}>
            <img src={locationImg} alt="Bottom Left" className=" rounded w-100" />
          </Col>
          <Col md={6}>
            <img src={locationImg} alt="Bottom Right" className=" rounded w-100" />
          </Col>
        </Row>

      
        <div
          className="position-absolute top-50 start-50 translate-middle text-white  px-4 py-2 rounded fs-5 fw-bold"
          style={{ zIndex: 2, opacity: 0.85 }}
        >
            See all photo
        </div>
      </div>

    
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>All Photos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="g-3">
            {[...Array(6)].map((_, i) => (
              <Col md={4} key={i}>
                <img src={locationImg} alt={`Photo ${i + 1}`} className="img-fluid rounded" />
              </Col>
            ))}
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
