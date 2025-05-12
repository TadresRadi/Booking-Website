import React, { useState } from 'react';
import axios from 'axios';
import styles from './AddHotelForm.module.css';
import backgroundImage from '../../assets/images/natural.jpg';

const AddHotelForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    postal_code: '',
    city: '',
    street_address: '',
    check_in_from: '',
    check_in_until: '',
    check_out_from: '',
    check_out_until: '',
    serves_breakfast: false,
    parking: 'no',
  
    restaurant: false,
    room_service: false,
    sauna: false,
    fitness_centre: false,
    garden: false,
    terrace: false,
    non_smoking_rooms: false,
    airport_shuttle: false,
    family_rooms: false,
    spa: false,
    jacuzzi: false,
    free_wifi: false,
    air_conditioning: false,
    water_park: false,
    ev_charging: false,
    swimming_pool: false,
    beach: false,
    electric_kettle: false,
    tea_coffee_maker: false,
    dining_area: false,
    microwave: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/add-hotel/', formData);
      alert('Hotel added successfully!');
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert('Something went wrong!');
    }
  };

  const amenities = [
    { name: 'restaurant', label: 'Restaurant' },
    { name: 'room_service', label: 'Room service' },
    { name: 'sauna', label: 'Sauna' },
    { name: 'fitness_centre', label: 'Fitness Centre' },
    { name: 'garden', label: 'Garden' },
    { name: 'terrace', label: 'Terrace' },
    { name: 'non_smoking_rooms', label: 'Non-smoking rooms' },
    { name: 'airport_shuttle', label: 'Airport shuttle' },
    { name: 'family_rooms', label: 'Family rooms' },
    { name: 'spa', label: 'Spa and wellness centre' },
    { name: 'jacuzzi', label: 'Hot tub/Jacuzzi' },
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

  return (
    <div
      className={styles.hotelFormBackground}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className={`col-11 col-md-10 col-lg-7 p-4 shadow ${styles.hotelFormCard}`}>
            <form onSubmit={handleSubmit}>
              <h3 className="text-center mb-4">Add Your Hotel</h3>

              <div className="mb-3">
                <label className="form-label">Name your hotel</label>
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
              </div>

              <h5 className="mt-4">Where is your hotel location?</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Country/region</label>
                  <input type="text" className="form-control" name="country" value={formData.country} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Post code / ZIP code</label>
                  <input type="text" className="form-control" name="postal_code" value={formData.postal_code} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">City</label>
                  <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Street address</label>
                  <input type="text" className="form-control" name="street_address" value={formData.street_address} onChange={handleChange} />
                </div>
              </div>

              <h5 className="mt-4">Check-in and Check-out times</h5>
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

              <h5 className="mt-4">What can guests use at your hotel?</h5>
              <div className="row">
                {amenities.map((item, index) => (
                  <div className="col-6 col-md-4" key={index}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id={item.name} name={item.name} checked={formData[item.name]} onChange={handleChange} />
                      <label className="form-check-label" htmlFor={item.name}>{item.label}</label>
                    </div>
                  </div>
                ))}
              </div>

              <h5 className="mt-4">Do you serve guests breakfast?</h5>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="serves_breakfast" id="yesBreakfast" value={true} checked={formData.serves_breakfast === true} onChange={() => setFormData({ ...formData, serves_breakfast: true })} />
                <label className="form-check-label" htmlFor="yesBreakfast">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="serves_breakfast" id="noBreakfast" value={false} checked={formData.serves_breakfast === false} onChange={() => setFormData({ ...formData, serves_breakfast: false })} />
                <label className="form-check-label" htmlFor="noBreakfast">No</label>
              </div>

              <h5 className="mt-4">Is parking available?</h5>
              {['free', 'paid', 'no'].map((val, idx) => (
                <div className="form-check" key={idx}>
                  <input className="form-check-input" type="radio" name="parking" id={`parking-${val}`} value={val} checked={formData.parking === val} onChange={handleChange} />
                  <label className="form-check-label" htmlFor={`parking-${val}`}>{val === 'free' ? 'Yes, free' : val === 'paid' ? 'Yes, paid' : 'No'}</label>
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





