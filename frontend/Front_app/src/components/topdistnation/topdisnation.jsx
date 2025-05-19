import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from "./topdist.module.css";
import axios from 'axios';
import axiosInstance from '../../api/axiosInstance';

export function TopDestination() {
  const [egyptHotels, setEgyptHotels] = useState([]);

  useEffect(() => {
    const fetchEgyptHotels = async () => {
      try {
const response = await axios.get('http://localhost:8000/api/hotel-search/', {
  params: { country: 'Egypt' }
});
        setEgyptHotels(response.data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching Egypt hotels:', error);
      }
    };

    fetchEgyptHotels();
  }, []);

  return (
    <div className={styles["top_destination_section"]}>
      <p className={styles["para3"]}>Top destinations in Egypt</p>
      <div className={styles["topdistination_card"]}>
        <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4">
          {egyptHotels.map((hotel) => (
            <Col key={hotel.id}>
              <Card>
                <Card.Img variant="top" src={hotel.main_photo || "https://via.placeholder.com/150"} />
                <Card.Body>
                  <Card.Title>{hotel.hotel_name}</Card.Title>
                  <Card.Text>
                    {hotel.description ? hotel.description.slice(0, 100) + "..." : "No description available."}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
