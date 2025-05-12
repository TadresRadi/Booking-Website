
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import {  Row, Col, Form } from "react-bootstrap";
import styles from './room_card.module.css';
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import PhotoGallery from '../popup/popup';



export default function Room_card({ onSelectRoom }){

const [deluxeRooms, setDeluxeRooms] = useState(1);
const [singleRooms, setSingleRooms] = useState(1);

const [pricePerNight] = useState(30);
const total = pricePerNight * (deluxeRooms + singleRooms);


  return (

  <div>

 <div className={`${styles["dublex_room"]}  `} >
 <Card className="p-3 shadow">
 <h5 className="fw-bold"  style={{color: '#4697A8' }}>Deluxe Queen Room</h5>
      <Row>
        {/* Left: Images */}
        <Col md={4}>
          <div className="position-relative">
            
             <PhotoGallery/>
          </div>
         
        </Col>
        <Col md={5} className=''>
     
          <h6 className=" " style={{color: '#4697A8' }} >Room Animates</h6>
          <ul className="ps-3 fs-6">
            <li>538 sq ft</li>
            <li>Sleeps 2</li>
            <li>1 Queen Bed</li>
            <li>Free welcome drink</li>
            <li>Free airport shuttle</li>
            <li>Free WiFi</li>
          </ul>
          <a href="#" className="fs-5" style={{color: '#4697A8' }}>More details...</a>
        </Col>

        <Col md={3} className="text-center">
          <Form.Group controlId="roomCount">
            <Form.Label className=" fs-5" style={{color: '#4697A8' }}>How many rooms do you need :</Form.Label>
          <Form.Control
  type="number"
  min={1}
  value={deluxeRooms}
  onChange={(e) => setDeluxeRooms(Number(e.target.value))}
/>
          </Form.Group>
          <div className="mt-2 ">
            <span className="fw-bold  fs-4" style={{color: '#4697A8' }}>{pricePerNight}$</span>{" "}
            <span className=" fs-6">For Night</span>
          </div>
          <div className="mt-3">
            <span className="text-muted fs-6">TOTAL:</span>{" "}
            <span className="fw-bold -5 fs-4" style={{color: '#4697A8' }}>{total}$</span>
          </div>
<Button

  onClick={() =>
    onSelectRoom({
      type: "Deluxe Queen Room",
      count: deluxeRooms,
      pricePerNight: pricePerNight,
      total: pricePerNight * deluxeRooms,
    })
  }
>
  Reserve
</Button>
        </Col>
      </Row>
    </Card>





</div>



 <div className={`${styles["single_room"]} mt-5 `} >
 <Card className="p-3 shadow">
 <h5 className="fw-bold"  style={{color: '#4697A8' }}>Single Queen Room</h5>
      <Row>
     
        <Col md={4}>
          <div className="position-relative">
         
          
        <PhotoGallery/>
        </div>
        </Col>
        <Col md={5}>
     
          <h6 className=" " style={{color: '#4697A8' }} >Room Animates</h6>
          <ul className="ps-3 fs-6">
            <li>538 sq ft</li>
            <li>Sleeps 2</li>
            <li>1 Queen Bed</li>
            <li>Free welcome drink</li>
            <li>Free airport shuttle</li>
            <li>Free WiFi</li>
          </ul>
          <a href="#" className="fs-5" style={{color: '#4697A8' }}>More details...</a>
        </Col>

        <Col md={3} className="text-center">
          <Form.Group controlId="roomCount">
            <Form.Label className=" fs-5" style={{color: '#4697A8' }}>How many rooms do you need :</Form.Label>
           <Form.Control
  type="number"
  min={1}
  value={singleRooms}
  onChange={(e) => setSingleRooms(Number(e.target.value))}
/>
          </Form.Group>
          <div className="mt-2 ">
            <span className="fw-bold  fs-4" style={{color: '#4697A8' }}>{pricePerNight}$</span>{" "}
            <span className=" fs-6">For Night</span>
          </div>
          <div className="mt-3">
            <span className="text-muted fs-6">TOTAL:</span>{" "}
            <span className="fw-bold -5 fs-4" style={{color: '#4697A8' }}>{total}$</span>
          </div>
          <Button
  variant="info"
  className="mt-3 px-4 text-white"
  style={{ backgroundColor: '#4697A8' }}
  onClick={() =>
    onSelectRoom({
      type: "Single Queen Room",
      count: singleRooms,
      pricePerNight: pricePerNight,
      total: pricePerNight * singleRooms,
    })
  }
>
  Reserve
</Button>

        </Col>
      </Row>
    </Card>

  </div>


</div>





   

  );
}
