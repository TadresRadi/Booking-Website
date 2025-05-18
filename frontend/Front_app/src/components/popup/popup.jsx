import React, { useState } from "react";
import { Row, Col, Modal, Carousel } from "react-bootstrap";

const BASE_URL = "http://127.0.0.1:8000";

export default function PhotoGallery({ photos = [] }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const previewPhotos = photos.slice(0, 3);

  const getPhotoUrl = (url) => {
    if (!url) {
      console.warn("Empty or undefined image URL detected.");
      return ""; // or placeholder image URL
    }

    if (url.startsWith("http")) {
      return url;
    }
    return url.startsWith("/") ? `${BASE_URL}${url}` : `${BASE_URL}/${url}`;
  };

  console.log("Photo URLs:", photos.map((p) => p.image));

  return (
    <>
      <div
        className="position-relative"
        onClick={handleShow}
        style={{ cursor: "pointer" }}
      >
        <Row className="opacity-50">
          {previewPhotos.map((photo, index) => (
            <Col key={photo.id || index} md={index === 0 ? 12 : 6} className="mb-1">
              <img
                src={getPhotoUrl(photo.image)}
                alt={`Preview ${index + 1}`}
                className="img-fluid rounded w-100"
              />
            </Col>
          ))}
        </Row>

        <div
          className="position-absolute top-50 start-50 translate-middle text-white px-4 py-2 rounded fs-5 fw-bold"
          style={{ zIndex: 2, opacity: 0.85 }}
        >
          See all photos
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>All Photos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {photos.map((photo, index) => (
              <Carousel.Item key={photo.id || index}>
                <img
                  src={getPhotoUrl(photo.image)}
                  className="d-block w-100 rounded"
                  alt={`Slide ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>
    </>
  );
}
