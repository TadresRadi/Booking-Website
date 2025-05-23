
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./searchInput.module.css";
import axiosInstance from "../../api/axiosInstance";
import { useHotel } from "../../context/HotelContext.jsx";
import { useNavigate } from 'react-router-dom';

import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupsIcon from '@mui/icons-material/Groups';



export default function SearchInput() {

  const [location, setLocation] = useState("");

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const [adults, setAdults] = useState(2);
  const [openGuests, setOpenGuests] = useState(false);
  const { setHotels } = useHotel();
  const navigate = useNavigate();
  const handleSearch = () => {

    console.log("Searching for hotels in:", location);
    axiosInstance.get(
      `/search/?location-or-hotel=${location}&check_in=${checkIn.toISOString().split('T')[0]}&check_out=${checkOut.toISOString().split('T')[0]}&adults=${adults}`
    )

      .then(response => {
        console.log("Search results:", response.data);
        setHotels(response.data);
        navigate('/search');
      })
      .catch(error => {
        console.error("Error fetching hotels:", error);
      });

  };




  return (<>
    <div className={styles["search_form_container"]}>


      <div className={styles["first_container"]}>
        <p className={styles["home_text"]}>Make Your Reservation</p>
      </div>
      {/* Filter Section */}




      <div className={styles["filter_container"]}>


        <div className={styles["bookinghome-form"]}>

          <div className={styles["booking-container"]}>

            <div className={`${styles["booking-input"]} ${styles["location-input"]}`}>
              <input
                className={styles["destination-input"]}
                type="text"
                placeholder="Enter Destination Or Hotel Name"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className={styles["booking-input"]}>
              <DatePicker
                selected={checkIn}
                onChange={(date) => {
                  setCheckIn(date)
                   // Optional: reset checkOut if it’s before new checkIn
                  if (checkOut && date && checkOut < date) {
                    setCheckOut(null);
                  }
                }}
                placeholderText="Check-in"
                className={styles["datepicker-input"]}
                minDate={new Date()}
              />
            </div>

            <div className={styles["booking-input"]}>
              <DatePicker
                selected={checkOut}
                onChange={(date) => setCheckOut(date)}
                placeholderText="Check-out"
                className={styles["datepicker-input"]}
                minDate={checkIn || new Date()}
                disabled={!checkIn} // Optional: disable until check-in is selected

              />

            </div>

            <div className={`${styles["booking-input"]} ${styles["guest-wrapper"]}`}>
              <div
                className={styles["selector-input"]}
                onClick={() => setOpenGuests(!openGuests)}
              >
                <GroupsIcon className={styles["group-icon "]} color="action" />
                
                <span className={styles["guest-text"]}> {adults} Guests</span>
                
              </div>

              {openGuests && (
                <div className={styles["guest-dropdown"]}>
                  <div className={styles["row"]}>
                    <span>Adults</span>
                    <div className={styles["counter"]}>
                      <button onClick={() => setAdults(Math.max(1, adults - 1))}>−</button>
                      <span>{adults}</span>
                      <button onClick={() => setAdults(adults + 1)}>+</button>
                    </div>
                  </div>




                  <button className={styles["done-btn"]} onClick={() => setOpenGuests(false)}>Done</button>
                </div>
              )}
            </div>

            <button className={styles["booking-search-button"]} onClick={handleSearch}>
              SEARCH
            </button>
          </div>
        </div>
      </div>
































    </div>


  </>)
}

