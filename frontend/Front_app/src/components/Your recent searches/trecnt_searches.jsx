import "react-datepicker/dist/react-datepicker.css";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from "./recentserch.module.css";
import { useSelector } from "react-redux";

export function Recentserch() {
  // Use optional chaining to safely access the Redux state, and fallback to an empty array if it's undefined
  const recentHotels = useSelector(state => state.recentSearch) || [];

  console.log(recentHotels)

  return (
    <div className={styles["recent_searches_section"]}>
      <p className={styles["para"]}>Your recent searches</p>
      
      {/* Check if there are hotels to map */}
      {recentHotels.length > 0 ? (
        <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4">
          {recentHotels.map((hotel, idx) => (
            <Col key={idx}>
              <Card>
                <Card.Img variant="top" src={hotel.image || "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} />
                <Card.Body>
                  <Card.Title>{hotel.hotel_name}</Card.Title>
                  <Card.Text>
                    {hotel.description || "No description available."}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>No recent searches available.</p> // Show message if there are no recent searches
      )}
    </div>
  );
}
