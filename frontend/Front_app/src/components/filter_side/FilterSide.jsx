import React from 'react';

import styles from "./filter.module.css"
import axiosInstance from '../../api/axiosInstance';
import { useState } from 'react';
export function FilterSide() {
    const [facilities, setFacilities] = useState([]);
    const [roomAmenities, setRoomAmenities] = useState([]);

    React.useEffect(() => {
        axiosInstance.get('/facilities/')
        .then(response => {
            console.log("Facilities:", response.data);
            setFacilities(response.data);
        })
        .catch(error => {
            console.error("Error fetching facilities:", error);
        });

        axiosInstance.get('/animates/')
        .then(response => {
            console.log("Room Amenities:", response.data);
            setRoomAmenities(response.data);
        })
        .catch(error => {
            console.error("Error fetching room amenities:", error);
        });
    }, []);
    
        
   


    return (
        <>
          <h3 className={styles.fiter_by}>Filter By </h3>
           
            <div className={styles.fliter_container}>   
                    <h4>Property facilities</h4>
                    {facilities.map((facility) => (
                        <div key={facility.id}>
                            <input type="checkbox" />  <span className={styles.facility_name}>    {facility.facility_name}</span><br />
                        </div>
                    ))}
                    
            </div>

            <div className={styles.fliter_container}>   
                    <h4>Room amenities</h4>
                    {roomAmenities.map((roomAmenity) => (
                        <div key={roomAmenity.id}>
                            <input type="checkbox" />  <span className={styles.facility_name}>    {roomAmenity.animation_name}</span><br />
                        </div>
                    ))}
                    
            </div>

        </>
    )
}
