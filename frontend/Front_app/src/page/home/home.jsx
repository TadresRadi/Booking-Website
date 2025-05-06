import axios from 'axios';
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import styles from "./home.module.css";

export function Homepage() {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [childrenAges, setChildrenAges] = useState([]);
  const [openGuests, setOpenGuests] = useState(false);

  const handleSearch = () => {
    // Add search logic here
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

  return (
    <div className={styles["main_container"]}>

        <div className={styles["first_container"]}>
        <p className={styles["home_text"]}>Make Your Reservation</p>


        </div>
      {/* Filter Section */}

      <div className={styles["filter_container"]}>
    

        <div className={styles["bookinghome-form"]}>
          <div className={styles["booking-container"]}>
            <div className={styles["booking-input1"]}>
              <input
                className={styles["destination-input"]}
                type="text"
                placeholder="Enter destination"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className={styles["booking-input2"]}>
              <DatePicker
                selected={checkIn}
                onChange={(date) => setCheckIn(date)}
                placeholderText="Check-in"
                className={styles["datepicker-input"]}
              />
            </div>

            <div className={styles["booking-input3"]}>
              <DatePicker
                selected={checkOut}
                onChange={(date) => setCheckOut(date)}
                placeholderText="Check-out"
                className={styles["datepicker-input"]}
              />
            </div>

            <div className={`${styles["booking-input11"]} ${styles["guest-wrapper11"]}`}>
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
   



      {/* Recent Searches Section */}
      <div className={styles["recent_searches_section"]}>
        <p className={styles["para"]}>Your recent searches</p>
        <div className={styles["card_home"]}>
          <Row xs={1} md={2} className="g-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Col key={idx}>
                <Card>
                  <Card.Img variant="top" src="holder.js/100px160" />
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This is a longer card with supporting text below as a natural
                      lead-in to additional content.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Trending Section */}
      <div className={styles["trending_section"]}>
        <p className={styles["para2"]}>Trending search</p>
        <div className={styles["trending_card"]}>
          <Row xs={1} md={2} className="g-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Col key={idx}>
                <Card>
                  <Card.Img variant="top" src="holder.js/100px160" />
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This is a longer card with supporting text below as a natural
                      lead-in to additional content.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Top Destination Section */}
      <div className={styles["top_destination_section"]}>
        <p className={styles["para3"]}>Top destination in Egypt</p>
        <div className={styles["topdistination_card"]}>
          <Row xs={1} md={2} className="g-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Col key={idx}>
                <Card>
                  <Card.Img variant="top" src="holder.js/100px160" />
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This is a longer card with supporting text below as a natural
                      lead-in to additional content.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}
