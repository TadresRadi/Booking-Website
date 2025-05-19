import React from 'react';
import { useSelector } from 'react-redux';
import HotelsCard from '../../components/hotel_card/hotels_card';

export default function FavoritesPage() {
  const favoriteHotels = useSelector(state => state.favorites.favoriteHotels);
  const counter = useSelector((state) => state.counter.counter);

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.headerSection}>
        <h2 style={styles.title}>
          ❤️ Favorite Hotels 
          <span style={styles.counterBadge}>{counter}</span>
        </h2>
      </div>

      {favoriteHotels.length === 0 ? (
        <p style={styles.emptyMessage}>
          😔 You have no favorite hotels yet. Explore and start adding some!
        </p>
      ) : (
        <div style={styles.verticalList}>
          {favoriteHotels.map(hotel => (
            <HotelsCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  pageWrapper: {
    padding: '3rem 2rem',
    background: '#fff9f8',
    minHeight: '100vh',
    fontFamily: "'Inter', sans-serif",
  },
  headerSection: {
    marginBottom: '2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  title: {
    fontSize: '2.2rem',
    fontWeight: 'bold',
    color: 'crimson',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  counterBadge: {
    backgroundColor: 'crimson',
    color: 'white',
    fontSize: '1rem',
    padding: '0.2rem 0.75rem',
    borderRadius: '50px',
    marginLeft: '0.8rem',
    fontWeight: 'bold',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
  },
  emptyMessage: {
    fontSize: '1.3rem',
    color: '#999',
    textAlign: 'center',
    marginTop: '3rem',
  },
  verticalList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
};
