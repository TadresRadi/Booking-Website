import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const RoomPhotoGallery = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/room-photos/');
        setPhotos(response.data);
      } catch (error) {
        console.error('Failed to fetch room photos:', error);
      }
    };

    fetchPhotos();
  }, []);

  return (
    
    <div className="room-photo-gallery">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={4}            // Show 4 images at once
        slidesPerGroup={4}           // Slide 4 images per swipe
        spaceBetween={15}
        loop={photos.length > 4}     // Loop only if more than 4 photos
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          320: { slidesPerView: 1, slidesPerGroup: 1 },    
          640: { slidesPerView: 2, slidesPerGroup: 2 },    
          1024: { slidesPerView: 4, slidesPerGroup: 4 },   
        }}
      >
        {photos.map(photo => (
          <SwiperSlide key={photo.id}>
            <img
              src={`http://localhost:8000${photo.image}`}
              alt={`Room ${photo.room}`}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  
  );
};

export default RoomPhotoGallery;
