import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col, Form } from 'react-bootstrap';
import styles from './room_card.module.css';
import PhotoGallery from '../popup/popup';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Room_card({ rooms = [], hotelImages = [], onSelectRoom }) {
  return (
    <div>
      {rooms.length === 0 ? (
        <p>No rooms available.</p>
      ) : (
        rooms.map((room) => {
          const total = room.price_per_night* room.available_rooms;

          return (
            <div key={room.id} className={`${styles["room_card"]} mb-4`}>
              <Card className="p-3 shadow">
                <h5 className="fw-bold" style={{ color: "#4697A8" }}>
                  {room.type || room.name}
                </h5>
                <Row>
                  <Col md={4}>
    <PhotoGallery photos={room.images || []} />
                  </Col>
                  <Col md={5}>
                    <h6 style={{ color: "#4697A8",marginTop: 50, marginLeft:20 ,fontSize:25}}>Room Amenities</h6>
                  <ul  style={{ color: "#4697A8" }}>
<ul className="ps-3 fs-5">
  {room.animations && room.animations.length > 0 ? (
    room.animations.map((amenity) => (
      <li key={amenity.id}>{amenity.animation_name}</li>
    ))
  ) : (
    <li>No amenities listed</li>
  )}
</ul>

</ul>  <a href="#" className="fs-5" style={{ color: "#4697A8" }}> </a>
 </Col>
 <Col md={3} className="text-center">
  <div>
    <span className={styles.avilablespan}>Available: </span>
    <span className={styles.avilablespan}>{room.available_rooms}</span>
  </div>

  <div className="mt-2">
    <Form.Label className="fw-semibold">How many rooms needed:</Form.Label>
    <Form.Select
      value={room.selectedCount || 1}
      onChange={(e) => {
        const count = parseInt(e.target.value);
        room.selectedCount = count;
     
        onSelectRoom({
          type: room.type || room.name,
          count,
          pricePerNight: room.price_per_night,
          total: count * room.price_per_night,
        });
      }}
    >
      {[...Array(room.available_rooms).keys()].map((i) => (
        <option key={i + 1} value={i + 1}>
          {i + 1}
        </option>
      ))}
    </Form.Select>
  </div>

  <div className="mt-2">
    <span className="fw-bold fs-5" style={{ color: "#4697A8" }}>
      Price: ${room.price_per_night}
    </span>
    <br />
    <span className="fw-semibold fs-6">
      Total: ${room.selectedCount ? room.selectedCount * room.price_per_night : room.price_per_night}
    </span>
  </div>

  <Button
    className={`mt-2 ${styles.serverbutton}`}
    onClick={() =>
      onSelectRoom({
        type: room.type || room.name,
        count: room.selectedCount || 1,
        pricePerNight: room.price_per_night,
        total: (room.selectedCount || 1) * room.price_per_night,
      })
    }
  >
    Reserve
  </Button>

</Col>
  </Row>
  </Card>
   </div> );  }) )}
    </div>
  );
}
