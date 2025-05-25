import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./home_review.module.css";

export function Home_review() {
  const [reviews, setReviews] = useState([]);

 useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/reviews/');
        setReviews(response.data.results);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

 return (
    <div  className='main'>
      <h1 className='headi'>What People Say..</h1>
      <div className={styles.reviewContainer}>
        {reviews.slice(0, 3).map((review) => (
          <div key={review.id} className={styles.reviewCard}>
            <h3 className={styles.username}>{review.user}</h3>
            <p className={styles.comment}>“{review.comment}”</p>
            <p className={styles.rating}>Rating: {review.rating}/5</p>
            <p className={styles.date}>
              {new Date(review.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
