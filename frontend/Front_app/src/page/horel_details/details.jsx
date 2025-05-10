import styles from './details.module.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaMapMarkerAlt } from 'react-icons/fa'; 
import { FaStar } from 'react-icons/fa'; // Solid star
import {  Badge, Stack } from 'react-bootstrap';
import { MdLocationOn } from 'react-icons/md';
import locationImg from '../../assets/location.jpg';
import React, { useState } from "react";
import {  Row, Col, Form } from "react-bootstrap";
import ReviewSection from '../../components/review/reviw';


export function Details() {

   const pricePerNight = 30;
  const [rooms, setRooms] = useState(2);
  const total = pricePerNight * rooms;
  return (
    <>
    <div className={styles["main_container"]}>
      <div className={styles["first_div"]}></div>

      <div className={`${styles["viewdhotel_div"]} container`}>
        <div className={`${styles["viewdhotel_divv"]} row w-100 gx-3 gy-4`}>
          
          <div className={`${styles["leftside_div"]} col-3 col-md-4 col-lg-5`}></div>

          <div className={`${styles["midleside_div"]} col-4 col-md-2 col-lg-2`}>
            <div className={styles["midleside_div1"]}></div>
            <div className={styles["midleside_div2"]}></div>
          </div>

          <div className={`${styles["leftsode_div"]} col-3 col-md-4 col-lg-4`}></div>
        </div>
     
     
      </div>
 </div>
   
    
  <div className={`${styles["mainmain"]} container`}>
  <div className={`${styles["abouthotel_container"]} row w-100 gx-3 gy-4`}>
<div className={`${styles["hotel_discption"]} col-7  mt-5`}>
   <div className={`${styles["disrption"]} `}>
    <Card   >
      <Card.Body>
        <Card.Title>Baron Palace</Card.Title>
    <p>    
       <span><FaMapMarkerAlt style={{ color: 'red', fontSize: '10px' }} /></span> 32 Sabry Abu Allam, from Talaat Harb, Downtown, Cairo, Egypt.</p>
         <hr />
        <Card.Text>
       Prime Beachfront Location: Baron Palace Sahl Hasheesh in 
       Hurghada offers a private beach area, beachfront, and an
        infinity swimming pool. Guests enjoy sea views and direct 
        access to the beach.
        </Card.Text>
        
      </Card.Body>
    </Card>

</div>
     <div className={`${styles["facilities"]}  mt-5`}>
     <Card>
      <Card.Header>Facilities</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <Stack direction="horizontal" gap={2}>
            <Badge bg="secondary">Wi-Fi</Badge>
            <Badge bg="secondary">Parking</Badge>
            <Badge bg="secondary">Gym</Badge>
            <Badge bg="secondary">Pool</Badge>
            <Badge bg="secondary" >Breakfast</Badge>
            <Badge bg="secondary">Spa</Badge>
            <Badge bg="secondary">AC</Badge>
            <Badge bg="secondary">TV</Badge>
          </Stack>
        </blockquote>
      </Card.Body>
    </Card>
    </div>


    </div>
    <div className={`${styles["hotel_rate_location"]} col-4 ml-3`}>
      <div className={`${styles["rate"]} mt-5`}>
      <Card>

      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
          8/10 veery good
  
          </p>
            <div>
      {[...Array(5)].map((_, index) => (
        <FaStar key={index} color="gold" size={20} />
      ))}
    </div>
         
        </blockquote>
      </Card.Body>
    </Card>
    </div>

    <div className={`${styles["location"]}  mt-5 `}>
      <Card>
  
      <Card.Body>
        <blockquote className="blockquote mb-0">
          
      <img
  src={locationImg}
  alt="Location"
  style={{ width: '100%', borderRadius: '70%' }}
/>
<p>    
  <span><FaMapMarkerAlt style={{ color: 'red', fontSize: '10px' }} /></span> 32 Sabry Abu Allam, from Talaat Harb, Downtown, Cairo, Egypt.</p>     </blockquote>  </Card.Body>  </Card>  </div></div></div></div>








  <div className={`${styles["selestroom"]}  container`}> select your room
    <p>tow type of room</p> </div>
    <div className={`${styles["room"]}  container`} >
    <div className={`${styles["dublex_room"]}  `} >
 <Card className="p-3 shadow">
 <h5 className="fw-bold">Deluxe Queen Room</h5>
      <Row>
        {/* Left: Images */}
        <Col md={4}>
          <div className="position-relative">
            
            <img
              src="/assets/room1.jpg"
              alt="room"
              className="img-fluid rounded mb-2"
            />
            <div className="position-absolute top-50 start-50 translate-middle text-dark fs-5 fw-bold">
              see all photos
            </div>
          </div>
          <Row>
            <Col><img src="/assets/room2.jpg" alt="room" className="img-fluid rounded" /></Col>
            <Col><img src="/assets/room3.jpg" alt="room" className="img-fluid rounded" /></Col>
          </Row>
        </Col>
        <Col md={5}>
    
          <h6 className="text-info">Room Animates</h6>
          <ul className="ps-3">
            <li>538 sq ft</li>
            <li>Sleeps 2</li>
            <li>1 Queen Bed</li>
            <li>Free welcome drink</li>
            <li>Free airport shuttle</li>
            <li>Free WiFi</li>
          </ul>
          <a href="#" className="text-info">More details...</a>
        </Col>

        {/* Right: Booking */}
        <Col md={3} className="text-center">
          <Form.Group controlId="roomCount">
            <Form.Label className="text-muted">How many room you need :</Form.Label>
           <Form.Control
             type="number"
             min={1}
             value={rooms}
            onChange={(e) => setRooms(Number(e.target.value))}/>
          </Form.Group>
          <div className="mt-2">
            <span className="fw-bold text-warning fs-4">{pricePerNight}$</span>{" "}
            <span className="text-muted">For Night</span>
          </div>
          <div className="mt-3">
            <span className="text-muted">TOTAL:</span>{" "}
            <span className="fw-bold text-danger fs-4">{total}$</span>
          </div>
          <Button variant="info" className="mt-3 px-4 text-white">Reserve</Button>
        </Col>
      </Row>
    </Card>





</div>



 <div className={`${styles["single_room"]} mt-5 `} >
 <Card className="p-3 shadow">
 <h5 className="fw-bold">single Queen Room</h5>
      <Row>
        {/* Left: Images */}
        <Col md={4}>
          <div className="position-relative">
            
            <img
              src="/assets/room1.jpg"
              alt="room"
              className="img-fluid rounded mb-2"
            />
            <div className="position-absolute top-50 start-50 translate-middle text-dark fs-5 fw-bold">
              see all photos
            </div>
          </div>
          <Row>
            <Col><img src="/assets/room2.jpg" alt="room" className="img-fluid rounded" /></Col>
            <Col><img src="/assets/room3.jpg" alt="room" className="img-fluid rounded" /></Col>
          </Row>
        </Col>
        <Col md={5}>
    
          <h6 className="text-info">Room Animates</h6>
          <ul className="ps-3">
            <li>538 sq ft</li>
            <li>Sleeps 2</li>
            <li>1 Queen Bed</li>
            <li>Free welcome drink</li>
            <li>Free airport shuttle</li>
            <li>Free WiFi</li>
          </ul>
          <a href="#" className="text-info">More details...</a>
        </Col>

        {/* Right: Booking */}
        <Col md={3} className="text-center">
          <Form.Group controlId="roomCount">
            <Form.Label className="text-muted">How many room you need :</Form.Label>
            <Form.Control
             type="number"
             min={1}
             value={rooms}
            onChange={(e) => setRooms(Number(e.target.value))}/>
          </Form.Group>
          <div className="mt-2">
            <span className="fw-bold text-warning fs-4">{pricePerNight}$</span>{" "}
            <span className="text-muted">For Night</span>
          </div>
          <div className="mt-3">
            <span className="text-muted">TOTAL:</span>{" "}
            <span className="fw-bold text-danger fs-4">{total}$</span>
          </div>
          <Button variant="info" className="mt-3 px-4 text-white">Reserve</Button>
        </Col>
      </Row>
    </Card>


<div className={`${styles["Review"]} mt-5 `} >



  <ReviewSection/>



  
</div>




</div>









    </div>

</>


  );
}
