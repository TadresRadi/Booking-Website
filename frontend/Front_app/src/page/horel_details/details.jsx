import styles from './details.module.css';
import { useParams,  } from "react-router-dom";
import { useEffect, useState } from 'react';

import Hotel_card from '../../components/hotel_propery/hote_propeertty_card';
import ReviewSection from '../../components/review/reviw';
import Room_card from '../../components/room-card/room_card';
import axiosInstance from '../../api/axiosInstance';

export function Details() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axiosInstance.get(`/hotel/${id}/`);
        console.log("Hotel images data:", response.data.hotel_images)
        setDetails(response.data);
        console.log("Hotel details fetched:", response.data);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };

    fetchHotelDetails();
  }, [id]);

 

  if (!details) {
    return <p>Loading...</p>;
  }
  const getImageSrc = (image) => {
    if (!image) return '';
    if (image.startsWith('http')) {
      return image;
    }
    return `http://localhost:8000${image}`;
  };

  return (
    <>
      <div className={styles["main_container"]}>
        <div className={styles["first_div"]}></div>
        <div className={`${styles["viewdhotel_div"]} container`}>
          {details.hotel_images?.map((photo, index) => (
            <img
              key={index}
              src={getImageSrc(photo.image)}
              alt={`Hotel Photo ${index + 1}`}
              style={{ width: '300px', height: 'auto', margin: '10px' }}
            />
          ))}

        </div>

      </div>

      <div className={`${styles["mainmain"]} container`}>

        <Hotel_card hotel={details} />
      </div>

      <div className={`${styles["selestroom"]} container`}>
        <p className={styles["paragrh1"]}>Select your room</p>
        <p className={styles["paragrh2"]}>
          {details.rooms?.length || 0} type{(details.rooms?.length || 0) !== 1 ? 's' : ''} of room
        </p>
      </div>

      <div className={`${styles["room"]} mb-5 container h-100`}>
        {details.rooms?.length > 0 ? (
          <Room_card
            hotelId={details.id}
            rooms={details.rooms}
            selectedRoom={selectedRoom}

            onSelectRoom={setSelectedRoom}
          />
        ) : (
          <p>No rooms available.</p>
        )}
      </div>

      <div className={`${styles["Review"]} mt-5 container`}>
        {details.reviews?.length > 0 ? (
          <ReviewSection reviews={details.reviews} />
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      
    </>
  );
}
