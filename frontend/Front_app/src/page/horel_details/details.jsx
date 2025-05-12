import styles from './details.module.css';
import Button from 'react-bootstrap/Button';

import {  Row, Col, Form } from "react-bootstrap";
import Hotel_card from '../../components/hotel_propery/hote_propeertty_card';
import ReviewSection from '../../components/review/reviw';
import Room_card from '../../components/room-card/room_card';
import PhotoGallery from '../../components/popup/popup';
import axiosInstance from '../../api/axiosInstance';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";



export function Details() {

const navigate = useNavigate();
const [selectedRoom, setSelectedRoom] = useState(null);

const handleConfirmBooking = () => {
  if (!selectedRoom || !details) {
    alert("Please select a room before confirming.");
    return;
  }

  navigate("/reservation", {
    state: {
      hotelId: details.id,
      hotelName: details.name,
      roomType: selectedRoom.type,
      roomCount: selectedRoom.count,
      pricePerNight: selectedRoom.pricePerNight,
      total: selectedRoom.total,
    },
  });
};

  const param= useParams();
  const [details, setdetails] = useState(null);
  const  gethotelDetails = async () => {
    try {
     const response = await axiosInstance.get(`/hotel/${param.id}`);
     setdetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching hotel details:', error);
    }


  };
  useEffect(() => {
    gethotelDetails();
  }, []);
  
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
   
    
  <div className={`${styles["mainmain"]} container`}> <Hotel_card/></div>


  <div className={`${styles["selestroom"]}  container `}>
  <p  className={styles["paragrh1"]}> select your room</p>
  <p className={styles["paragrh2"]}> 2 type of room</p>
   </div>
<div className={`${styles["room"]} mb-5 container h-100`} > 
<Room_card onSelectRoom={setSelectedRoom} />
</div>

<div className={`${styles["Review"]} mt-5 container`} > 
  <ReviewSection />
</div>

<div className={`${styles["confirmbooking"]} mt-5 `}>
  <button className={styles.confirmButton}   onClick={handleConfirmBooking}>Confirm Booking</button>
</div>

</>


  );
}
