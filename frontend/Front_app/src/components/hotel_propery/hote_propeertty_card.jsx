import styles from './h_card.module.css';
import Card from 'react-bootstrap/Card';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { Badge, Stack } from 'react-bootstrap';
import locationImg from '../../assets/location.jpg';
import LocationCard from '../location/location';

export default function Hotel_card({ hotel }) {
  if (!hotel) return <p>Loading hotel details...</p>;

  return (
    <div className={`${styles["mainmain"]} container`}>
      <div className={`${styles["abouthotel_container"]} row w-100 gx-3 gy-4`}>

        <div className={`${styles["hotel_discption"]} col-7 mt-5`}>
          <div className={`${styles["disrption"]} `}>
            
            <Card className={styles["dis_Card"]}>
              <Card.Body>
                <h1 className={styles["Card_Title"]}>{hotel.hotel_name}</h1>
                <p>
                  <FaMapMarkerAlt style={{ color: 'red', fontSize: '10px' }} /> {hotel.location}
                </p>
                <hr />
                <Card.Text>{hotel.description}</Card.Text>
              </Card.Body>
            </Card>
          </div>

          <div className="mt-5">
            <Card className={styles["Card_facilitis"]}>
              <Card.Header className="fs-5 fw-bold text-center">Facilities</Card.Header>
             <Card.Body>
           <blockquote className="blockquote mb-0">
              <Stack direction="horizontal" gap={2} className="flex-wrap justify-content-center">
              {hotel.facilities.map(facility => (
               <Badge key={facility.id} bg="secondary">{facility.facility_name}</Badge>
                  ))}
                </Stack>
             </blockquote>
          </Card.Body>

            </Card>
          </div>
        </div>

        <div className={`${styles["hotel_rate_location"]} col-4 ms-5 h-100`}>
          <div className={`${styles["rate"]} mt-4`}>
            <Card className={styles["Card_rate"]}>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p>{hotel.star_rating}/10 Very Good</p>
                  <div>
                    {[...Array(hotel.star_rating)].map((_, index) => (
                      <FaStar key={index} color="gold" size={20} />
                    ))}
                  </div>
                </blockquote>
              </Card.Body>
            </Card>
          </div>

          <div className={`${styles["location"]} mt-4`}>
            <LocationCard hotel={hotel} />
          </div>
        </div>

      </div>
    </div>
  );
}
