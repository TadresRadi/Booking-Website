import React, { useState, useEffect } from 'react';
import styles from "./filter.module.css";
import axiosInstance from '../../api/axiosInstance';
import { useHotel } from '../../context/HotelContext.jsx';

export function FilterSide() {
  const [facilities, setFacilities] = useState([]);
  const [roomAmenities, setRoomAmenities] = useState([]);
  const { selectedFacilities, setSelectedFacilities ,selectedRoomAmenities,
  setSelectedRoomAmenities } = useHotel();

  useEffect(() => {
    axiosInstance.get('/facilities/')
      .then(response => {
        setFacilities(response.data);
      })
      .catch(error => {
        console.error("Error fetching facilities:", error);
      });

    axiosInstance.get('/All_Animates/')
      .then(response => {
        setRoomAmenities(response.data);
      })
      .catch(error => {
        console.error("Error fetching room amenities:", error);
      });
  }, []);

  const handleFacilityChange = (event) => {
    const facilityName = event.target.value;
    setSelectedFacilities(prev =>
      prev.includes(facilityName)
        ? prev.filter(f => f !== facilityName)
        : [...prev, facilityName]
    );
  };

  const handleAmenityChange = (event) => {
  const amenityName = event.target.value;
  setSelectedRoomAmenities(prev =>
    prev.includes(amenityName)
      ? prev.filter(a => a !== amenityName)
      : [...prev, amenityName]
  );
};

  return (
    <>
    <div className={styles.fixedFilter}>
      <h3 className={styles.fiter_by}>Filter By</h3>

      {/* Property Facilities Filter */}
      <div className={styles.fliter_container}>
        <h4>Property Facilities</h4>
        {facilities.map((facility) => (
          <div key={facility.id}>
            <input
              type="checkbox"
              value={facility.facility_name}
              onChange={handleFacilityChange}
              checked={selectedFacilities.includes(facility.facility_name)}
            />
            <span className={styles.facility_name}>{facility.facility_name}</span><br />
          </div>
        ))}
      </div>

      {/* Room Amenities (not yet wired) */}
      <div className={styles.fliter_container}>
        <h4>Room Amenities</h4>
        {roomAmenities.map((amenity) => (
          <div key={amenity.id}>
            <input
              type="checkbox"
               value={amenity.animation_name}
               onChange={handleAmenityChange}
               checked={selectedRoomAmenities.includes(amenity.animation_name)}
            />
            <span className={styles.facility_name}>{amenity.animation_name}</span><br />
          </div>
        ))}
      </div>
      </div>
    </>
  );
}
