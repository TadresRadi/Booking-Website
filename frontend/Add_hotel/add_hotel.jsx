import React, { useState } from 'react';
import axios from 'axios';
import styles from './AddHotelForm.module.css';
import backgroundImage from '../../assets/images/natural.jpg';
import { facilityMap } from '../../assets/hoteldata/facilityMap';

const amenities = [
  { name: 'restaurant', label: 'Restaurant' },
  { name: 'room_service', label: 'Room service' },
  { name: 'spa', label: 'Spa and wellness centre' },
  { name: 'fitness_centre', label: 'Fitness Centre' },
  { name: 'garden', label: 'Garden' },
  { name: 'terrace', label: 'Terrace' },
  { name: 'non_smoking_rooms', label: 'Non-smoking rooms' },
  { name: 'airport_shuttle', label: 'Airport shuttle' },
  { name: 'family_rooms', label: 'Family rooms' },
  { name: 'hot_tub', label: 'Hot tub/Jacuzzi' },
  { name: 'free_wifi', label: 'Free WiFi' },
  { name: 'air_conditioning', label: 'Air conditioning' },
  { name: 'water_park', label: 'Water Park' },
  { name: 'ev_charging', label: 'Electric vehicle charging station' },
  { name: 'swimming_pool', label: 'Swimming pool' },
  { name: 'beach', label: 'Beach' },
  { name: 'electric_kettle', label: 'Electric Kettle' },
  { name: 'tea_coffee_maker', label: 'Tea/Coffee maker' },
  { name: 'dining_area', label: 'Dining area' },
  { name: 'microwave', label: 'Microwave' },
];

const AddHotelForm = () => {
  const [formData, setFormData] = useState({
    hotel_name: '',
    description: '',
    star_rating: '',
    country: '',
    city: '',
    street_address: '',
    postal_code: '',
    check_in_from: '',
    check_in_until: '',
    check_out_from: '',
    check_out_until: '',
    parking: 'no',
    facilities: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFacilityChange = (facilityName) => {
    const facilityId = facilityMap[facilityName];
    if (!facilityId) return;

    setFormData((prev) => {
      const currentFacilities = prev.facilities;
      return {
        ...prev,
        facilities: currentFacilities.includes(facilityId)
          ? currentFacilities.filter(id => id !== facilityId)
          : [...currentFacilities, facilityId],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8000/api/add-hotel/', formData);
      const hotelId = res.data?.id;

      if (!hotelId) {
        alert('Hotel ID is missing from the response');
        return;
      }

      alert('Hotel added successfully!');
      window.location.href = `/add-room?hotelId=${hotelId}`;
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert('Something went wrong!');
    }
  };

  return (
    <div className={styles.hotelFormBackground} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className={`col-11 col-md-10 col-lg-7 p-4 shadow ${styles.hotelFormCard}`}>
            <form onSubmit={handleSubmit}>
              <h3 className="text-center mb-4">Add Your Hotel</h3>

              {/* Hotel name */}
              <div className="mb-3">
                <label className="form-label">Hotel Name</label>
                <input type="text" className="form-control" name="hotel_name" value={formData.hotel_name} onChange={handleChange} />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows="3" />
              </div>

              {/* Star rating */}
              <div className="mb-3">
                <label className="form-label">Star Rating (1 to 5)</label>
                <input type="number" min="1" max="5" className="form-control" name="star_rating" value={formData.star_rating} onChange={handleChange} />
              </div>

              {/* Location */}
              <h5 className="mt-4">Hotel Location</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Country</label>
                  <input type="text" className="form-control" name="country" value={formData.country} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Post code / ZIP</label>
                  <input type="text" className="form-control" name="postal_code" value={formData.postal_code} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">City</label>
                  <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Street Address</label>
                  <input type="text" className="form-control" name="street_address" value={formData.street_address} onChange={handleChange} />
                </div>
              </div>

              {/* Check-in/out times */}
              <h5 className="mt-4">Check-in & Check-out</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Check-in from</label>
                  <input type="time" className="form-control" name="check_in_from" value={formData.check_in_from} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Check-in until</label>
                  <input type="time" className="form-control" name="check_in_until" value={formData.check_in_until} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Check-out from</label>
                  <input type="time" className="form-control" name="check_out_from" value={formData.check_out_from} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Check-out until</label>
                  <input type="time" className="form-control" name="check_out_until" value={formData.check_out_until} onChange={handleChange} />
                </div>
              </div>

              {/* Facilities */}
              <h5 className="mt-4">Facilities</h5>
              <div className="row">
                {amenities.map((item, index) => (
                  <div className="col-6 col-md-4" key={index}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={item.name}
                        name={item.name}
                        checked={formData.facilities.includes(facilityMap[item.name])}
                        onChange={() => handleFacilityChange(item.name)}
                      />
                      <label className="form-check-label" htmlFor={item.name}>{item.label}</label>
                    </div>
                  </div>
                ))}
              </div>

              {/* Parking */}
              <h5 className="mt-4">Parking</h5>
              {['free', 'paid', 'no'].map((val, idx) => (
                <div className="form-check" key={idx}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="parking"
                    id={`parking-${val}`}
                    value={val}
                    checked={formData.parking === val}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor={`parking-${val}`}>
                    {val === 'free' ? 'Yes, free' : val === 'paid' ? 'Yes, paid' : 'No'}
                  </label>
                </div>
              ))}

              <div className="text-end mt-4">
                <button className={styles.saveButton} type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHotelForm;
