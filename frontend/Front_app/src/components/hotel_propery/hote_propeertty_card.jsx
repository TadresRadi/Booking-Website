import styles from './h_card.module.css';

import Card from 'react-bootstrap/Card';
import { FaMapMarkerAlt } from 'react-icons/fa'; 
import { FaStar } from 'react-icons/fa'; // Solid star
import {  Badge, Stack } from 'react-bootstrap';

import locationImg from '../../assets/location.jpg';



export default function Hotel_card() {
  return (
    <div className={`${styles["mainmain"]} container`}>
  <div className={`${styles["abouthotel_container"]} row w-100 gx-3 gy-4`}>
<div className={`${styles["hotel_discption"]} col-7  mt-5`}>
   <div className={`${styles["disrption"]} h-50 `}>
    <Card  className={styles["dis_Card"]}  >
      <Card.Body>
        <h1 className={styles["Card_Title "]} >Baron Palace</h1>
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
    <div className={`mt-5`}>
  <Card className={styles["Card_facilitis"]} >
    <Card.Header className="fs-5 fw-bold text-center">Facilities</Card.Header>
    <Card.Body>
      <blockquote className="blockquote mb-0">
        <Stack
          direction="horizontal"
          gap={2}
          className="flex-wrap justify-content-center"
        >
          <Badge bg="secondary">Wi-Fi</Badge>
          <Badge bg="secondary">Parking</Badge>
          <Badge bg="secondary">Gym</Badge>
          <Badge bg="secondary">Pool</Badge>
          <Badge bg="secondary">Breakfast</Badge>
          <Badge bg="secondary">Spa</Badge>
          <Badge bg="secondary">AC</Badge>
          <Badge bg="secondary">TV</Badge>
        </Stack>
      </blockquote>
    </Card.Body>
  </Card>
</div>



    </div>
    <div className={`${styles["hotel_rate_location"]} col-4 ms-5 h-100`}>
      <div className={`${styles["rate"]} mt-4 `}>
      <Card className={styles["Card_rate"]}>

      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
          8/10 very good
  
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

    <div className={`${styles["location"]}  mt-4 `}>
      <Card className={styles["location_card"]}>
  
      <Card.Body>
        <blockquote className="blockquote mb-0">
          
      <img
  src={locationImg}
  alt="Location"
  style={{ width: '100%', borderRadius: '70%' }}
/>
<p>    
  <span><FaMapMarkerAlt style={{ color: 'red', fontSize: '10px' }} /></span> 32 Sabry Abu Allam, from Talaat Harb, Downtown, Cairo, Egypt.</p>     </blockquote>  </Card.Body>  </Card>  </div></div></div></div>





   

  );
}
