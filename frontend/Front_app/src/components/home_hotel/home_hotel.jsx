import { useState, useEffect } from "react";
import styles from "./home_hotel.module.css";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import { useNavigate } from "react-router-dom";;

export function Home_hotel() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 6;
  const navigate = useNavigate();  
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/api/hotels/?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setHotels(data.results); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching hotels:", err);
        setLoading(false);
      });
  }, [page]);

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if(page > 1) setPage((prev) => prev - 1);
  };


  
  const goToHotelDetails = (hotelId) => {
    navigate(`/hotel/${hotelId}`);
  };

  return (
    <>
      <h1 className={styles.heading}>Our Hotels</h1>
      <div className={styles.main}>
        {loading ? <p>Loading...</p> : 
          <Row xs={1} md={3} className="g-4 justify-content-center">
            {hotels.map((hotel) => (
              <Col key={hotel.id}
              
                onClick={() => goToHotelDetails(hotel.id)}
              >

                <Card className={styles.card}>
              
                 <Card.Img
                variant="top"
     src={hotel.main_image ? `http://localhost:8000${hotel.main_image}` : "/placeholder.jpg"}
        alt={hotel.hotel_name}
        className={styles.cardImg}
                        />
                  <Card.Body>
                    <Card.Title className={styles.cardTitle}>{hotel.hotel_name}</Card.Title>
                    <Card.Text className={styles.cardText}>
                      Rating: {hotel.star_rating} ⭐
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        }
        <div style={{ marginTop: '40px' ,marginRight:'40px', textAlign: 'center' }}>
            <button
        onClick={prevPage}
        disabled={page === 1}
        className={`${styles.paginationButton} ${styles.prevButton}`}
      >
        Prev
      </button>
       
         <button
        onClick={nextPage}
        className={`${styles.paginationButton} ${styles.nextButton}`}
      >
        More
      </button>
        </div>
      </div>
    </>
  );
}
