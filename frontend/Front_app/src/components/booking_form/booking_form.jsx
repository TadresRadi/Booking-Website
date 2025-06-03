import style from '../../page/booking/booking.module.css';
import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useBooking } from '../../context/BookingContext.jsx';
import { useNavigate } from "react-router-dom";

export default function BookingForm({ hotelData }) {
    const [showLogInAlert, setShowLogInAlert] = useState(false);
    const { bookingDetails, setBookingDetails } = useBooking();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        city: "",
        zip_code: "",
        country: "",
        phone: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access');
        if (!token) {
            setShowLogInAlert(true);
            return;
        }
        setBookingDetails(formData);
        localStorage.setItem('bookingUserData', JSON.stringify(formData));
        // تحقق من وجود بيانات الفندق
        if (!hotelData.hotel_name) {
            alert("Hotel data is missing! Please go back and select your hotel/room.");
            return;
        }
        // دمج بيانات الفورم مع الفندق لإرسالها لصفحة الدفع
        const booking = {
            ...hotelData,
            ...formData,
        };
        navigate("/payment", { state: { booking } });
    };

    useEffect(() => {
        console.log("BookingDetails context updated:", bookingDetails);
    }, [bookingDetails]);

    return (
        <>
            {showLogInAlert && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    zIndex: 9999,
                    width: '50%',
                    left: '25%',
                }}>
                    <Alert show={showLogInAlert} variant="danger" onClose={() => setShowLogInAlert(false)} dismissible>
                        <Alert.Heading>Login Required</Alert.Heading>
                        <p>You need to be logged in to make a booking.</p>
                        <div className="d-flex justify-content-end">
                            <Button size="sm" variant="outline-danger" onClick={() => {
                                setShowLogInAlert(false);
                                window.location.href = "/login";
                            }}>
                                Go to Login
                            </Button>
                        </div>
                    </Alert>
                </div>
            )}
            <div className={style.informationInput}>
                <div>
                    <h2 className={style.bookingTitle}>Enter your details</h2>
                    <p>
                        Almost done! Just fill in the <span style={{ color: "red" }}>*</span> required info
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className={style.inputGroup}>
                            <label htmlFor="first_name" className={style.label}>
                                First name<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                id="first_name"
                                className={style.input}
                                name="first_name"
                                value={formData.first_name || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={style.inputGroup}>
                            <label htmlFor="last_name" className={style.label}>
                                Last name<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                id="last_name"
                                className={style.input}
                                name="last_name"
                                value={formData.last_name || ""}
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
                                value={formData.email || ""}
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
                                value={formData.address || ""}
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
                                value={formData.city || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={style.inputGroup}>
                            <label htmlFor="zip_code" className={style.label}>
                                Zip Code (optional)
                            </label>
                            <input
                                id="zip_code"
                                className={style.input}
                                name="zip_code"
                                value={formData.zip_code || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={style.inputGroup}>
                            <label htmlFor="country" className={style.label}>
                                Country/Region<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                id="country"
                                className={style.select}
                                name="country"
                                value={formData.country || ""}
                                onChange={handleChange}
                                required
                            />
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
                                    value={formData.phone || ""}
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
        </>
    );
}