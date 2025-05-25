import React from 'react';
import style from './booking.module.css';

import { IoLocationSharp } from "react-icons/io5";
import Rating from '@mui/material/Rating';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export function Booking() {


    const location = useLocation();
    
    const BookingDetails= location.state || {};

    console.log("Booking Details:", BookingDetails);

    const [formData, setFormData] = useState({
        firstName: "Esraa",
        lastName: "Salman",
        email: "salman77esraa@gmail.com",
        address: "",
        city: "",
        zipCode: "",
        country: "Egypt",
        phone: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Booking confirmed:", formData);
        // You can add form validation and actual API call here
    };



    // Add this at the top, inside useState (example data)
    const [bookingSummary, ] = useState({
        selectedRoom: " 2 Deluxe Suite",
        numAdults: 4,
        totalPrice: 2400,
    });




    return (
        <>
            <div className={style.bookingContainer}>

                {/* hotel card  */}
                <div className={style.hotelCard}>
                    <div className=' d-flex space-between align-items-center '>
                        <h2 className={style.hotelName}>{`${BookingDetails.hotelName}`}</h2>
                        <Rating
                            sx={{
                                fontSize: "clamp(20px, 2vw, 1.5rem)",
                                '& .MuiRating-iconFilled': {
                                    color: 'rgba(230, 116, 44, 1)', // filled star color
                                },
                                '& .MuiRating-iconEmpty': {
                                    color: 'rgba(230, 116, 44, 1)', // empty star color
                                },
                                marginLeft: 'auto', // Align to the right
                            }}
                            name="read-only"
                            value={Number(BookingDetails.hotelRating) || 0}
                            readOnly
                        />
                    </div>
                    <div className=' d-flex'>
                        <IoLocationSharp className=' m-1 ' />
                        <p>{`Location:${BookingDetails.hotalLocation}`} </p>
                        <p className={style.reveiw}>30 Reviews</p>
                    </div>
                </div>
                {/* booking detailes */}
                <div className={style.BookingDetails}>
                    <h2 className={style.bookingTitle}>Booking Details</h2>
                    <div className={style.bookDate}>
                        <div className={style.checkin}>
                            <p className=' fs-5 fw-bold'>Check-in Date: </p>
                            <p>Thu, Jun 12, 2025</p>
                        </div>
                        <div className={style.checkout}>
                            <p className=' fs-5 fw-bold'>Check-Out Date: </p>
                            <p className=' '>Thu, Jun 12, 2025</p>
                        </div>

                    </div>

                    <p className=' fs-4'>Total length of stay:</p>
                    <p className=' fs-6 fw-bold'>2 Nights</p>

                {/* booking rooms and price summary */}
                      
                      <div className={style.summaryCard}>
                    <h2 className={style.summaryTitle}>You Will Book </h2>

                    <div className={style.summaryItem}>
                        <span>Selected Room:</span>
                        <span className=' fs-6 fw-bold'>{bookingSummary.selectedRoom}</span>
                    </div>

                    <div className={style.summaryItem}>
                        <span>Number of Adults:</span>
                        <span className=' fs-6 fw-bold'>{bookingSummary.numAdults}</span>
                    </div>

                    <div className={style.summaryItem}>
                        <span className=' fs-4 fw-bold '>Total Price:</span>
                        <span className=' fs-4 fw-bold text-danger'>${bookingSummary.totalPrice}</span>
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
                                <label className={style.label}>
                                    First name<span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    className={style.input}
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={style.inputGroup}>
                                <label className={style.label}>
                                    Last name<span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    className={style.input}
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={style.inputGroup}>
                                <label className={style.label}>
                                    Email address<span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    className={style.input}
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={style.inputGroup}>
                                <label className={style.label}>
                                    Address<span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    className={style.input}
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={style.inputGroup}>
                                <label className={style.label}>
                                    City<span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    className={style.input}
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={style.inputGroup}>
                                <label className={style.label}>Zip Code (optional)</label>
                                <input
                                    className={style.input}
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={style.inputGroup}>
                                <label className={style.label}>
                                    Country/Region<span style={{ color: "red" }}>*</span>
                                </label>
                                <select
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
                                <label className={style.label}>
                                    Phone number<span style={{ color: "red" }}>*</span>
                                </label>
                                <div style={{ display: "flex" }}>
                                    <span style={{ padding: "8px", border: "1px solid #ccc", borderRight: "none", borderRadius: "4px 0 0 4px", background: "#f0f0f0" }}>
                                        +20
                                    </span>
                                    <input
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
                        </form>
                    </div>
                </div>

              

            </div>










        </>

    );
}
