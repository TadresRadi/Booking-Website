
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./searchInput.module.css";
import axiosInstance from "../../api/axiosInstance";
import { useHotel } from "../../context/HotelContext.jsx";
import { useNavigate } from 'react-router-dom';



 export default function SearchInput()
{

 const [location, setLocation] = useState("");

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [childrenAges, setChildrenAges] = useState([]);
  const [openGuests, setOpenGuests] = useState(false);
  const { setHotels } = useHotel();
  const navigate = useNavigate(); 
  const handleSearch = () => {

    console.log("Searching for hotels in:", location);
    axiosInstance.get(`/hotel-search/?location=${location}`)
      .then(response => {
        console.log("Search results:", response.data);
        setHotels(response.data);
        navigate('/search'); 
      })
      .catch(error => {
        console.error("Error fetching hotels:", error);
      });

  };

  const handleChildAgeChange = (index, value) => {
    const updated = [...childrenAges];
    updated[index] = value;
    setChildrenAges(updated);
  };

  const handleChildrenCountChange = (count) => {
    setChildren(count);
    const updated = Array(count).fill("").map((_, i) => childrenAges[i] || "");
    setChildrenAges(updated);
  };

    return (<>
    
    <div className={styles["first_container"]}>
        <p className={styles["home_text"]}>Make Your Reservation</p>
        </div>
      {/* Filter Section */}




      <div className={styles["filter_container"]}>
    

        <div className={styles["bookinghome-form"]}>
          <div className={styles["booking-container"]}>
            <div className={styles["booking-input"]}>
              <input
                className={styles["destination-input"]}
                type="text"
                placeholder="Enter destination"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className={styles["booking-input"]}>
              <DatePicker
                selected={checkIn}
                onChange={(date) => setCheckIn(date)}
                placeholderText="Check-in"
                className={styles["datepicker-input"]}
              />
            </div>

            <div className={styles["booking-input"]}>
              <DatePicker
                selected={checkOut}
                onChange={(date) => setCheckOut(date)}
                placeholderText="Check-out"
                className={styles["datepicker-input"]}
              />
            </div>

            <div className={`${styles["booking-input"]} ${styles["guest-wrapper"]}`}>
              <div
                className={styles["selector-input"]}
                onClick={() => setOpenGuests(!openGuests)}
              >
                👤 {adults} adults · {children} children · {rooms} room{rooms > 1 ? "s" : ""}
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

                  <div className={styles["row"]}>
                    <span>Children</span>
                    <div className={styles["counter"]}>
                      <button onClick={() => handleChildrenCountChange(Math.max(0, children - 1))}>−</button>
                      <span>{children}</span>
                      <button onClick={() => handleChildrenCountChange(children + 1)}>+</button>
                    </div>
                  </div>

                  {children > 0 && (
                    <div className={styles["ages"]}>
                      {childrenAges.map((age, index) => (
                        <select
                          key={index}
                          value={age}
                          onChange={(e) => handleChildAgeChange(index, e.target.value)}
                        >
                          <option value="">Age needed</option>
                          {[...Array(17)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1} years old</option>
                          ))}
                        </select>
                      ))}
                    </div>
                  )}

                  <div className={styles["row"]}>
                    <span>Rooms</span>
                    <div className={styles["counter"]}>
                      <button onClick={() => setRooms(Math.max(1, rooms - 1))}>−</button>
                      <span>{rooms}</span>
                      <button onClick={() => setRooms(rooms + 1)}>+</button>
                    </div>
                  </div>

                  <button className={styles["done-btn"]} onClick={() => setOpenGuests(false)}>Done</button>
                </div>
              )}
            </div>

            <button className={styles["booking-search-button"]} onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
   

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    </>)
}

