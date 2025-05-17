import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './add_room.module.css';

const allFeatures = [
  { id: 1, name: 'clothes_rack', label: 'Clothes Rack' },
  { id: 2, name: 'flat_screen_tv', label: 'Flat Screen TV' },
  { id: 3, name: 'air_conditioning', label: 'Air Conditioning' },
  { id: 4, name: 'desk', label: 'Desk' },
  { id: 5, name: 'wake_up_service', label: 'Wake Up Service' },
  { id: 6, name: 'towels', label: 'Towels' },
  { id: 7, name: 'wardrobe_or_closet', label: 'Wardrobe or Closet' },
  { id: 8, name: 'heating', label: 'Heating' },
  { id: 9, name: 'fan', label: 'Fan' },
  { id: 10, name: 'safety_deposit_box', label: 'Safety Deposit Box' },
  { id: 11, name: 'extra_towels_fee', label: 'Extra Towels Fee' },
  { id: 12, name: 'ground_floor_unit', label: 'Ground Floor Unit' },
];

const AddRoomForm = () => {
  const [formData, setFormData] = useState({
    hotel: '',
    name: '',
    price_per_night: '',
    available_rooms: '',
    adult_capacity: '',
    room_size: '',
    outdoor_view: '',
    room_facilities: [],
  });

  const query = new URLSearchParams(useLocation().search);
  const hotelId = query.get('hotelId');

  useEffect(() => {
    if (hotelId) {
      setFormData(prev => ({ ...prev, hotel: hotelId }));
    }
  }, [hotelId]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleFacilityChange = (featureId) => {
    setFormData(prev => {
      const exists = prev.room_facilities.includes(featureId);
      return {
        ...prev,
        room_facilities: exists
          ? prev.room_facilities.filter(id => id !== featureId)
          : [...prev.room_facilities, featureId],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.room_facilities.length) {
      alert('Please select at least one feature.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/api/add-room/', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      alert('Room added successfully!');
      window.location.href = `/Add-Images?hotelId=${formData.hotel}&roomId=${res.data.id}`;
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        alert('Error: ' + JSON.stringify(error.response.data));
      } else {
        alert('An error occurred while saving the room.');
      }
    }
  };

  return (
    <div className={styles.roomFormBackground}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className={`col-11 col-md-10 col-lg-7 p-4 shadow ${styles.roomFormCard}`}>
            <h3 className="text-center mb-4">Add Your Room</h3>

            <form onSubmit={handleSubmit}>
              <input type="hidden" name="hotel" value={formData.hotel} />

              <div className="mb-3">
                <label className="form-label">Room Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Price per Night</label>
                <input
                  type="number"
                  name="price_per_night"
                  value={formData.price_per_night}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Available Rooms</label>
                <input
                  type="number"
                  name="available_rooms"
                  value={formData.available_rooms}
                  onChange={handleChange}
                  className="form-control"
                  required
                  min={0}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Adult Capacity</label>
                <input
                  type="number"
                  name="adult_capacity"
                  value={formData.adult_capacity}
                  onChange={handleChange}
                  className="form-control"
                  required
                  min={1}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Room Size</label>
                <input
                  type="text"
                  name="room_size"
                  value={formData.room_size}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Outdoor View</label>
                <select
                  name="outdoor_view"
                  value={formData.outdoor_view}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select View</option>
                  <option value="balcony">Balcony</option>
                  <option value="terrace">Terrace</option>
                  <option value="view">View</option>
                </select>
              </div>

              <h5 className="mt-4">Room Features</h5>
              <div className="row">
                {allFeatures.map((feature) => (
                  <div className="col-6 col-md-4" key={feature.id}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`feature-${feature.id}`}
                        checked={formData.room_facilities.includes(feature.id)}
                        onChange={() => handleFacilityChange(feature.id)}
                      />
                      <label className="form-check-label" htmlFor={`feature-${feature.id}`}>
                        {feature.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-end mt-4">
                <button type="submit" className={styles.saveButton}>
                  Save
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoomForm;
