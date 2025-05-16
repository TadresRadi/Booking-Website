import React from "react";
import styles from "./hotel_card.module.css";
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from "../../store/slice/fav";
import { BsHeart } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";

export default function HotelsCard({ hotel }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favoritehotel = useSelector((state) => state.favorites.favoriteHotels);

  const handleClick = () => {
    console.log('Hotel clicked:', hotel);

    navigate(`/details/${hotel.id}`); 
  };

  const toggleHeart = (hotel) => {
    const isFavorite = favoritehotel.some((favhotel) => favhotel.id === hotel.id);
    if (isFavorite) {
      dispatch(removeFavorite(hotel)); 
      
      dispatch(decreaseCounter());
    } else {
      dispatch(addFavorite(hotel)); 
   
    }
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <img
        src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Hotel"
        className={styles.card_img}
      />
      <span>
        {favoritehotel.some((favhotel) => favhotel.id === hotel.id) ? (
          <FaHeart   className={styles.heart}
            onClick={(e) => {
              e.stopPropagation(); 
              toggleHeart(hotel);
            }}
            style={{ color: "red" }}
          />
        ) : (
          <BsHeart className={styles.heart}
            onClick={(e) => {
              e.stopPropagation();
              toggleHeart(hotel);
            }}
          />
        )}
      </span>

      <div className={styles.card_body}>
        <div className={styles.card_title_container}>
          <h5 className={styles.card_title}>{hotel.hotel_name}</h5>
          <Rating
            sx={{
              fontSize: "clamp(20px, 2vw, 1.5rem)",
              '& .MuiRating-iconFilled': {
                color: 'rgba(230, 116, 44, 1)',
              },
              '& .MuiRating-iconEmpty': {
                color: 'rgba(230, 116, 44, 1)', 
              },
            }}
            name="read-only"
            value={hotel.star_rate}
            readOnly
          />
        </div>
        <div className={styles.card_location}>
          <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="24px" fill="rgba(230, 116, 44, 1)">
            <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
          </svg>
          <p className="card-text">{hotel.location}</p>
        </div>
        <p className={styles.property_title}>The property offer:</p>
        <span className={styles.property_item}>WiFi Free</span>
        <span className={styles.property_item}>breakfast</span>
        <span className={styles.property_item}>others..</span>
        <div className={styles.card_footer}>
          <div className={styles.card_reviews}>
            <p className={styles.reviews}>12.3k reviews</p>
            <p className={styles.rate}>80% Very Good</p>
          </div>
          <div className={styles.card_price}>
            <span>44$</span>
            <span className={styles.per_night}><span className={styles.per}> /</span>4 adults,3 nights.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
