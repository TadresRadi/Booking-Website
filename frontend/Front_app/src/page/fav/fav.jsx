import React from 'react';
import { useSelector } from 'react-redux';

import styles from './fav.module.css';
import HotelsCard from '../../components/hotel_card/hotels_card';

export default function Fav() {
  const favoriteHotels = useSelector((state) => state.favorites.favoriteHotels);

  const countteHotels = useSelector((state) => state.favorites.favoriteHotels);
  return (
    <div className={styles.fav_container}>
      <h2 className={styles.title}>My Favorite Hotels</h2>

      {favoriteHotels.length === 0 ? (
        <p className={styles.empty_message}>You have no favorite hotels yet.</p>
      ) : (
        <div className={styles.fav_grid}>
          {favoriteHotels.map((hotel) => (
            <HotelsCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  );
}
