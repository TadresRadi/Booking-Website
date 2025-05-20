import React from "react";
import styles from "./hotel_card.module.css";
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from "../../store/slice/fav";
import { BsHeart } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { dicreasecounter, increasecounter } from "../../store/slice/counter";

export default function HotelsCard({ hotel }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favoritehotel = useSelector((state) => state.favorites.favoriteHotels);
   const counter = useSelector((state) => state.counter.counter);
  
  const roomPrices = hotel.rooms.map(room => room.price_per_night);
  const minPrice = roomPrices.length > 0 ? Math.min(...roomPrices) : 'N/A';

  const imageUrl = hotel.hotel_images?.[0]?.image || 'fallback-image-url';

  

   const handleClick = () => {
     navigate(`/hotel/${hotel.id}`);

  };

 const toggleHeart = (hotel) => {
   const isFavorite = favoritehotel.some((favhotel) => favhotel.id === hotel.id);
 
   if (isFavorite) {
     dispatch(removeFavorite(hotel));
     dispatch(dicreasecounter()); 
   } else {
     dispatch(addFavorite(hotel));
     dispatch(increasecounter()); 
   }
 };

  return (
    <div className={styles.card} onClick={handleClick}>
      <img
        src={imageUrl}
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
                color: 'rgba(230, 116, 44, 1)', // filled star color
              },
              '& .MuiRating-iconEmpty': {
                color: 'rgba(230, 116, 44, 1)', // empty star color
              },
            }}
            name="read-only"
            value={Number(hotel.star_rating)}
            readOnly
          />
        </div>

        <div className={`${styles.card_location}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30px"
            viewBox="0 -960 960 960"
            width="24px"
            fill=" rgba(230, 116, 44, 1)"
          >
            <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
          </svg>
          <p className="card-text">{hotel.location}</p>
        </div>

        <p className={styles.property_title}>The property offer:</p>
        <span className={styles.property_item}>{hotel.facilities[0]}</span>
        <span className={styles.property_item}>{hotel.facilities[1]}</span>
        <span className={styles.property_item}>others..</span>

        <div className={styles.card_footer}>
          <div className={styles.card_reviews}>
            <p className={styles.reviews}>{`${hotel.reviews_count} reviews`} </p>
            <p className={styles.rate}>{`${hotel.largest_rating_percentage}% ${hotel.largest_rating_category}`}</p>
          </div>
          <div className={styles.card_price}>
            <span>{`${minPrice}$`}</span>
            <span className={styles.per_night}>
              <span className={styles.per}> /</span>Per Night.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
