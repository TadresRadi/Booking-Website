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
import Hotel_card from '../../components/hotel_propery/hote_propeertty_card';
import ReviewSection from '../../components/review/reviw';
import Room_card from '../../components/room-card/room_card';
import PhotoGallery from '../../components/popup/popup';


export function Details() {

  
  return (
    <>
    <div className={styles["main_container"]} >
      <div className={styles["first_div"]}></div>

      <div className={`${styles["viewdhotel_div"]} container`}>
        <div className={`${styles["viewdhotel_divv"]} row w-100 gx-3 gy-4 `}>
          
          <div className={`${styles["leftside_div"]} col-3 col-md-4 col-lg-5`}></div>

          <div className={`${styles["midleside_div"]} col-4 col-md-2 col-lg-2`}>
            <div className={styles["midleside_div1"]}></div>
            <div className={styles["midleside_div2"]}></div>
          </div>

          <div className={`${styles["leftsode_div"]} col-3 col-md-4 col-lg-4`}></div>
        </div>
     
     
      </div>
 </div>
   
    
  <div className={`${styles["mainmain"]} container`}> <Hotel_card/></div>


  <div className={`${styles["selestroom"]}  container `}>
  <p  className={styles["paragrh1"]}> select your room</p>
  <p className={styles["paragrh2"]}> 2 type of room</p>
   </div>
<div className={`${styles["room"]} mb-5 container h-100`} > 
  <Room_card /> 
</div>

<div className={`${styles["Review"]} mt-5 container`} > 
  <ReviewSection />
</div>


</>


  );
}
