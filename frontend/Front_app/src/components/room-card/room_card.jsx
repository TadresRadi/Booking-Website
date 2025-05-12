
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import {  Row, Col, Form } from "react-bootstrap";
import styles from './room_card.module.css';
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import PhotoGallery from '../popup/popup';



export default function Room_card() {


     const pricePerNight = 30;
      const [rooms, setRooms] = useState(2);
      const total = pricePerNight * rooms;
        const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (

  <div>

 <div className={`${styles["dublex_room"]} w-100 `} >
 <Card className="p-3 shadow">
 <h5 className="fw-bold  "  style={{color: '#4697A8' }}>Deluxe Queen Room</h5>
      <Row>
      
        <Col md={4} className="w-25 ">
          <div className="position-relative">
            
             <PhotoGallery/>
          </div>
         
        </Col>
        <Col md={5} className=' '  style={{marginLeft: '60px', marginTop:'10px'}} >
     
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

        <Col md={3} className="">
          <Form.Group controlId="roomCount">
            <Form.Label className=" fs-5" style={{color: '#4697A8' }}>How many room you need :</Form.Label>
           <Form.Control
             type="number"
             min={1}
             value={rooms}
            onChange={(e) => setRooms(Number(e.target.value))}/>
          </Form.Group>
          <div className="mt-2 ">
            <span className="fw-bold  fs-4" style={{color: '#4697A8' }}>{pricePerNight}$</span>{" "}
            <span className=" fs-6">For Night</span>
          </div>
          <div className="mt-3">
            <span className="text-muted fs-6">TOTAL:</span>{" "}
            <span className="fw-bold -5 fs-4" style={{color: '#4697A8' }}>{total}$</span>
          </div>

          <Button variant="info" className="mt-3 px-4 text-white"  style={{backgroundColor: '#4697A8' }}>Reserve</Button>
        </Col>
      </Row>
    </Card>





</div>



 <div className={`${styles["single_room"]} mt-5  w-100`} >
 <Card className="p-3 shadow">
 <h5 className="fw-bold"  style={{color: '#4697A8' }}>Single Queen Room</h5>
      <Row>
     
        <Col md={4} className="w-25 ">
          <div className="position-relative">
         
          
        <PhotoGallery/>
        </div>
        </Col>
        <Col md={5} style={{marginLeft: '60px', marginTop:'10px'}}>
     
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
            <Form.Label className=" fs-5" style={{color: '#4697A8' }}>How many room you need :</Form.Label>
           <Form.Control
             type="number"
             min={1}
             value={rooms}
            onChange={(e) => setRooms(Number(e.target.value))}/>
          </Form.Group>
          <div className="mt-2 ">
            <span className="fw-bold  fs-4" style={{color: '#4697A8' }}>{pricePerNight}$</span>{" "}
            <span className=" fs-6">For Night</span>
          </div>
          <div className="mt-3">
            <span className="text-muted fs-6">TOTAL:</span>{" "}
            <span className="fw-bold -5 fs-4" style={{color: '#4697A8' }}>{total}$</span>
          </div>
          <Button variant="info" className="mt-3 px-4 text-white"  style={{backgroundColor: '#4697A8' }}>Reserve</Button>
        </Col>
      </Row>
    </Card>

  </div>


</div>





   

  );
}
