import styles from './h_card.module.css';

import Card from 'react-bootstrap/Card';
import { FaMapMarkerAlt } from 'react-icons/fa'; 
import { FaStar } from 'react-icons/fa'; // Solid star
import {  Badge, Stack } from 'react-bootstrap';

import locationImg from '../../assets/location.jpg';



export default function Hotel_card() {
  return (
   <div className={`container ${styles.mainmain}`}>
  <div className="row gx-4 gy-5">
    <div className="col-12 col-md-8">
      <Card className={styles.dis_Card}>
        <Card.Body>
          <h1 className={styles.Card_Title}>Baron Palace</h1>
          <p>
            <FaMapMarkerAlt style={{ color: 'red', fontSize: '10px' }} /> 32 Sabry Abu Allam, from Talaat Harb, Downtown, Cairo, Egypt.
          </p>
          <hr />
          <Card.Text>
            Prime Beachfront Location: Baron Palace Sahl Hasheesh in Hurghada offers a 
            private beach area, beachfront, and an
            infinity swimming pool. Guests enjoy sea views and direct access to the beach.
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className={`mt-4 ${styles.Card_facilitis}`}>
        <Card.Header className="fs-5 fw-bold text-center">Facilities</Card.Header>
        <Card.Body>
          <Stack direction="horizontal" gap={2} className="flex-wrap justify-content-center">
            {["Wi-Fi", "Parking", "Gym", "Pool", "Breakfast", "Spa", "AC", "TV"].map((item, idx) => (
              <Badge bg="secondary" key={idx}>{item}</Badge>
            ))}
          </Stack>
        </Card.Body>
      </Card>
    </div>

    <div className="col-12 col-md-4">
      <Card className={`mb-4 mt-4 mt-md-0 ${styles.Card_rate}`}>
        <Card.Body>
          <p className={styles.blockquote}>8/10 Very Good</p>
          <div>
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} color="gold" size={20} />
            ))}
          </div>
        </Card.Body>
      </Card>

      <Card className={styles.location_card}>
        <Card.Body>
          <img
            src={locationImg}
            alt="Location"
            className="img-fluid"
            style={{ borderRadius: '70%' }}
          />
          <p className="mt-3">
            <FaMapMarkerAlt style={{ color: 'red', fontSize: '10px' }} /> 32 Sabry Abu Allam, Downtown, Cairo, Egypt.
          </p>
        </Card.Body>
      </Card>
    </div>
  </div>
</div>






   

  );
}
