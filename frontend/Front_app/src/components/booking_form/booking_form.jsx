import style from '../../page/booking/booking.module.css';
import { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';


export default function BookingForm() {

    // Success state for booking confirmation
    const [success, setSuccess] = useState(false);
    // Form data state
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        city: '',
        zip_code: '',
        country: '',
        phone: ''

    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log("Form Data:", formData);
    };


   const handleSubmit = async (e) => {
    e.preventDefault();


     // Check if user is logged in
    const token = localStorage.getItem('access');
    if (!token) {
        alert("You need to be logged in to make a booking.");
        // Optionally redirect to login
        window.location.href = "/login";
        return;
    }


    try {
        const response = await axiosInstance.post(
            '/booking/',
            formData,
        );
        setSuccess(true);
        console.log("Booking confirmed:", response.data);
    } catch (error) {
        setSuccess(false);
        if (error.response) {
            if (error.response.status === 401) {
                console.error("Authentication failed. Please login again.");
                // Optionally redirect to login
                // window.location.href = '/login';
            }
            console.error("Error data:", error.response.data);
        } else {
            console.error("Error:", error.message);
        }
    }
};



    return <>

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
                            value={formData.first_name}
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
                            value={formData.last_name}
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
                        <label htmlFor="zip_code" className={style.label}>Zip Code (optional)</label>
                        <input
                            id="zip_code"
                            className={style.input}
                            name="zip_code"
                            value={formData.zip_code}
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
                            value={formData.country}
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


    </>
}