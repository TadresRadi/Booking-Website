import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import "./AfterReservation.css";
import { useLocation, useNavigate } from "react-router-dom";

const AfterReservation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};

  // حماية: لو booking غير متوفرة، redirect
  useEffect(() => {
    if (!booking) {
      navigate("/", { replace: true });
    }
  }, [booking, navigate]);

  if (!booking) return null;

  const {
    hotel_name,
    room_type,
    room_count,
    checkIn,
    checkOut,
    totalPrice,
    hotelLocation,
    image,
  } = booking;

  return (
    <div className="after-reservation-root">
      <Card className="after-reservation-card shadow-sm">
        <div className="d-flex flex-column align-items-center mb-3">
          <img
            src={image || "/hotel-placeholder.png"}
            alt={hotel_name}
            className="reservation-hotel-img"
          />
        </div>
        <h2 className="hotel-title">{hotel_name}</h2>
        <p className="hotel-location">
          <i className="bi bi-geo-alt"></i> {hotelLocation}
        </p>
        <div className="reservation-details mt-4">
          <div>
            <span className="label">Room:</span>
            <span>{room_count} {room_type}</span>
          </div>
          <div>
            <span className="label">Check-in:</span>
            <span>{checkIn}</span>
          </div>
          <div>
            <span className="label">Check-out:</span>
            <span>{checkOut}</span>
          </div>
          <div>
            <span className="label">Total Price:</span>
            <span className="text-danger fw-bold">${totalPrice}</span>
          </div>
        </div>
        <div className="reservation-status mt-5 mb-3">
          <span className="pending">Pending</span>
          <p className="pending-msg">Within 24 hours, you will receive a response regarding your reservation.</p>
        </div>
        <div className="d-flex justify-content-center">
          <Button variant="outline-secondary" className="me-2" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button variant="primary" onClick={() => navigate("/myreservations")}>
            My Bookings
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AfterReservation;