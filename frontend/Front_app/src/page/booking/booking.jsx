import React, { useState, useEffect, useMemo } from 'react';
import style from './booking.module.css';

import { IoLocationSharp } from "react-icons/io5";
import Rating from '@mui/material/Rating';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import BookingForm from '../../components/booking_form/booking_form.jsx';
import { useBooking } from '../../context/BookingContext.jsx';


export function Booking() {
  const location = useLocation();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const { checkIn ,setCheckIn, checkOut,setCheckOut, setNights, setTotalPrice } = useBooking();
  // Load check-in/out dates from localStorage on mount
  useEffect(() => {
    const storedCheckIn = localStorage.getItem("checkIn");
    const storedCheckOut = localStorage.getItem("checkOut");

    if (storedCheckIn) setCheckIn(new Date(storedCheckIn));
    if (storedCheckOut) setCheckOut(new Date(storedCheckOut));
    if (storedCheckIn && storedCheckOut) {
      const nights = Math.ceil((new Date(storedCheckOut) - new Date(storedCheckIn)) / (1000 * 60 * 60 * 24));
      setNights(nights);
      
    }
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

  setTotalPrice(totalPrice || selectedRoom.total || 0);

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
           {checkIn && checkOut && checkIn.getTime() === checkOut.getTime()
              ? "1 Night (Dayuse)"
              : `${nights} ${nights === 1 ? "Night" : "Nights"}`
            }
            
           
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
            <span className="fs-4 fw-bold">Total Price:</span>
            <span className="fs-4 fw-bold text-danger">
              ${selectedRoom.total || totalPrice || 0}
            </span>
          </div>
        </div>
      </div>

      {/* information input */}
      <BookingForm></BookingForm>
      
    </div>
  );
}
