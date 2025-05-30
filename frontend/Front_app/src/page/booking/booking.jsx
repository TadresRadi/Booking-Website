import React, { useState, useEffect, useMemo } from 'react';
import style from './booking.module.css';

import { IoLocationSharp } from "react-icons/io5";
import Rating from '@mui/material/Rating';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

export function Booking() {
  const location = useLocation();
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load check-in/out dates from localStorage on mount
  useEffect(() => {
    const storedCheckIn = localStorage.getItem("checkIn");
    const storedCheckOut = localStorage.getItem("checkOut");

    if (storedCheckIn) setCheckIn(new Date(storedCheckIn));
    if (storedCheckOut) setCheckOut(new Date(storedCheckOut));
  }, []);

  // Fetch booking details when location.state changes
  useEffect(() => {
    const fetchBookingDetails = async () => {
      const { hotelId, selectedRoom, totalPrice } = location.state || {};
      if (!hotelId) {
        setBookingDetails(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await axiosInstance.get(`/hoteldetailesForBooking/${hotelId}`);
        const updatedDetails = {
          ...response.data,
          selectedRoom: selectedRoom || {},
          totalPrice: totalPrice || 0,
        };
        setBookingDetails(updatedDetails);
      } catch (error) {
        console.error("Error fetching booking details:", error);
        setBookingDetails(null);
      }
      setLoading(false);
    };

    fetchBookingDetails();
  }, [location.state]);

  // Calculate nights between check-in and check-out
  const getNumberOfNights = () => {
    if (checkIn && checkOut) {
      const diffTime = Math.abs(checkOut - checkIn);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };
  const nights = useMemo(() => getNumberOfNights(), [checkIn, checkOut]);

  // Form data with initial state (load from localStorage if available)
  const [formData, setFormData] = useState(() => {
    const savedForm = localStorage.getItem("bookingForm");
    return savedForm
      ? JSON.parse(savedForm)
      : {
          firstName: "Esraa",
          lastName: "Salman",
          email: "salman77esraa@gmail.com",
          address: "",
          city: "",
          zipCode: "",
          country: "Egypt",
          phone: "",
        };
  });

  // Save form data to localStorage on changes
  useEffect(() => {
    localStorage.setItem("bookingForm", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add validation or API calls here
    console.log("Booking confirmed:", formData);
    setSuccess(true);
  };

  // Show loading spinner or message while loading
  if (loading) {
    return (
      <div className={style.bookingContainer}>
        <p>Loading booking details...</p>
      </div>
    );
  }

  // If no booking details, show message
  if (!bookingDetails) {
    return (
      <div className={style.bookingContainer}>
        <p>No booking details available.</p>
      </div>
    );
  }

  // Safe destructuring with fallback
  const {
    hotel_name,
    star_rating,
    location: hotelLocation,
    reviews_count,
    selectedRoom = {},
    totalPrice,
  } = bookingDetails;

  return (
    <div className={style.bookingContainer}>
      {/* hotel information */}
      <div className={style.hotelCard}>
        <div className="d-flex space-between align-items-center">
          <h2 className={style.hotelName}>{hotel_name || "Hotel Name"}</h2>
          <Rating
            sx={{
              fontSize: "clamp(20px, 2vw, 1.5rem)",
              '& .MuiRating-iconFilled': {
                color: 'rgba(230, 116, 44, 1)',
              },
              '& .MuiRating-iconEmpty': {
                color: 'rgba(230, 116, 44, 1)',
              },
              marginLeft: 'auto',
            }}
            name="read-only"
            value={Number(star_rating) || 0}
            readOnly
          />
        </div>
        <div className="d-flex">
          <IoLocationSharp className="m-1" />
          <p>{`Location: ${hotelLocation || "Unknown"}`}</p>
          <p className={style.reveiw}>{reviews_count || 0} Reviews</p>
        </div>
      </div>

      {/* booking details */}
      <div className={style.BookingDetails}>
        <h2 className={style.bookingTitle}>Booking Details</h2>
        <div className={style.bookDate}>
          <div className={style.checkin}>
            <p className="fs-5 fw-bold">Check-in Date:</p>
            <p>{checkIn ? checkIn.toLocaleDateString() : "N/A"}</p>
          </div>
          <div className={style.checkout}>
            <p className="fs-5 fw-bold">Check-Out Date:</p>
            <p>{checkOut ? checkOut.toLocaleDateString() : "N/A"}</p>
          </div>
        </div>

        <p className="fs-4">Total length of stay:</p>
        <p className="fs-6 fw-bold">
          {nights} {nights === 1 ? "Night" : "Nights"}
        </p>

        {/* booking rooms and price summary */}
        <div className={style.summaryCard}>
          <h2 className={style.summaryTitle}>You Will Book</h2>

          <div className={style.summaryItem}>
            <span>Selected Room:</span>
            <span className="fs-6 fw-bold">
              {selectedRoom.count && selectedRoom.type
                ? `${selectedRoom.count} ${selectedRoom.type}`
                : "N/A"}
            </span>
          </div>

          <div className={style.summaryItem}>
            <span>Number of Adults:</span>
            <span className="fs-6 fw-bold">6</span>
          </div>

          <div className={style.summaryItem}>
            <span className="fs-4 fw-bold">Total Price:</span>
            <span className="fs-4 fw-bold text-danger">
              ${selectedRoom.total || totalPrice || 0}
            </span>
          </div>
        </div>
      </div>

      {/* information input */}
      <div className={style.informationInput}>
        <div>
          <h2 className={style.bookingTitle}>Enter your details</h2>
          <p>
            Almost done! Just fill in the <span style={{ color: "red" }}>*</span> required info
          </p>

          <form onSubmit={handleSubmit}>
            <div className={style.inputGroup}>
              <label htmlFor="firstName" className={style.label}>
                First name<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="firstName"
                className={style.input}
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={style.inputGroup}>
              <label htmlFor="lastName" className={style.label}>
                Last name<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="lastName"
                className={style.input}
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={style.inputGroup}>
              <label htmlFor="email" className={style.label}>
                Email address<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="email"
                className={style.input}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={style.inputGroup}>
              <label htmlFor="address" className={style.label}>
                Address<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="address"
                className={style.input}
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className={style.inputGroup}>
              <label htmlFor="city" className={style.label}>
                City<span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="city"
                className={style.input}
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className={style.inputGroup}>
              <label htmlFor="zipCode" className={style.label}>Zip Code (optional)</label>
              <input
                id="zipCode"
                className={style.input}
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>

            <div className={style.inputGroup}>
              <label htmlFor="country" className={style.label}>
                Country/Region<span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="country"
                className={style.select}
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="Egypt">Egypt</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="UAE">UAE</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className={style.inputGroup}>
              <label htmlFor="phone" className={style.label}>
                Phone number<span style={{ color: "red" }}>*</span>
              </label>
              <div style={{ display: "flex" }}>
                <span
                  style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRight: "none",
                    borderRadius: "4px 0 0 4px",
                    background: "#f0f0f0",
                  }}
                >
                  +20
                </span>
                <input
                  id="phone"
                  className={style.input}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={{ borderRadius: "0 4px 4px 0" }}
                />
              </div>
              <p className={style.note}>Needed by the property to validate your booking</p>
            </div>

            <button type="submit" className={style.submitBtn}>
              Confirm Booking
            </button>
            {success && (
              <p style={{ color: 'green', marginTop: '10px' }}>
                Booking confirmed successfully!
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
