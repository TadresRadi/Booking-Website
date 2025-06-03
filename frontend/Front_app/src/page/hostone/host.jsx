


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './hostone.module.css';
import { useHotel } from '../../context/HotelContext';

export function Add_property() {
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const { hotelId, roomId, setRoomId, setHotelId } = useHotel();

  const token = localStorage.getItem('access');

  useEffect(() => {
    if (hotelId && token) {
      axios.get(`http://localhost:8000/api/hotel/${hotelId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => setHotel(res.data))
        .catch(err => console.error(err));
    }
  }, [hotelId, token]);

  const handleAddAnotherRoom = () => {
    setRoomId(null);
    navigate('/add-room');
  };

  const handleAddAnotherHotel = () => {
    setHotelId(null);
    setRoomId(null); 
    navigate('/add-hotel');
  };

  return (
    <div className={styles.bodylike}>
      <div className={styles.bgGlass}></div>
      <div className="position-relative" style={{ zIndex: 1, minHeight: "100vh" }}>
        {/* زرار view hotel في أعلى الصفحة */}
        <div className="container py-2">
          <div className="d-flex justify-content-end mb-3">
            <button
              className={styles.saveButton}
              onClick={() => navigate('/host-properties')}
            >
              View Hotel
            </button>
          </div>
        </div>

        <div className="container py-5">

          {/* Step 1: Hotel Details */}
          <div className="row mb-4">
            <div className="col-md-8 mx-auto">
              <Card className={styles.cardCustom}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className={styles.cardTitle}>Hotel Details</h2>
                    <span className="badge bg-info fs-5">Step 1</span>
                  </div>

                  <div className="row align-items-center">
                    <div className="col-md-7">
                      <p className="mb-3">
                        The basics — Add your hotel name, address, facilities, and more.
                      </p>
                      <div className="text-start d-flex gap-2 flex-wrap mb-2">
                        {!hotelId && (
                          <button
                            className={styles.saveButton}
                            onClick={() => navigate('/add-hotel')}
                          >
                            Add
                          </button>
                        )}
                        {hotelId && (
                          <>
                            <button
                              className={styles.saveButton}
                              onClick={() => navigate('/add-hotel')}
                            >
                              Edit
                            </button>
                            <button
                              className={`${styles.saveButton} btn-outline-primary`}
                              onClick={handleAddAnotherHotel}
                            >
                              Add Another Hotel
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="col-md-5 text-center">
                      {hotel?.hotel_images?.length > 0 ? (
                        <img
                          src={hotel.hotel_images.find(img => img.is_main)?.image}
                          alt={hotel.hotel_name}
                          style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: 180,
                            objectFit: 'cover',
                            borderRadius: 12,
                            boxShadow: '0 2px 12px #0001'
                          }}
                        />
                      ) : (
                        <p className="text-muted"></p>
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>

          {/* Step 2 & 3 */}
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div className="row g-4 align-items-stretch">

                {/* Step 2: Rooms */}
                <div className="col-md-6 d-flex">
                  <Card className={`${styles.cardCustom} flex-fill`}>
                    <Card.Body className="d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className={styles.cardTitle}>Rooms</h3>
                        <span className="badge bg-info fs-6">Step 2</span>
                      </div>

                      <p className="mb-3 flex-grow-1 text-md-start text-center">
                        Add rooms, layouts, bed options, and rates.
                      </p>

                      <div className="d-flex gap-3 flex-wrap justify-content-start mb-2">
                        {!hotelId && (
                          <button
                            className={`${styles.saveButton} ${styles.roomsPhotosButton}`}
                            onClick={() => navigate('/add-room')}
                          >
                            Add
                          </button>
                        )}
                        {hotelId && roomId && (
                          <>
                            <button
                              className={`${styles.saveButton} ${styles.roomsPhotosButton}`}
                              onClick={() => navigate('/add-room')}
                            >
                              Edit
                            </button>
                            <button
                              className={`${styles.saveButton} ${styles.roomsPhotosButton} btn-outline-primary`}
                              onClick={handleAddAnotherRoom}
                            >
                              Add Another Room
                            </button>
                          </>
                        )}
                        {hotelId && !roomId && (
                          <button
                            className={`${styles.saveButton} ${styles.roomsPhotosButton}`}
                            onClick={() => navigate('/add-room')}
                          >
                            Add
                          </button>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </div>

                {/* Step 3: Photos */}
                <div className="col-md-6 d-flex">
                  <Card className={`${styles.cardCustom} flex-fill`}>
                    <Card.Body className="d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className={styles.cardTitle}>Photos</h3>
                        <span className="badge bg-info fs-6">Step 3</span>
                      </div>

                      <p className="mb-3 flex-grow-1 text-md-start text-center">
                        Share photos of your hotel so guests know what to expect.
                      </p>

                      <div className="d-flex gap-3 flex-wrap justify-content-start mb-2">
                        {!hotelId && (
                          <button
                            className={`${styles.saveButton} ${styles.roomsPhotosButton}`}
                            onClick={() => navigate('/add-images')}
                          >
                            Add
                          </button>
                        )}
                        {hotelId && hotel?.hotel_images?.length > 0 && (
                          <>
                            <button
                              className={`${styles.saveButton} ${styles.roomsPhotosButton}`}
                              onClick={() => navigate('/add-images')}
                            >
                              Edit
                            </button>
                            {roomId && (
                              <button
                                className={`${styles.saveButton} ${styles.roomsPhotosButton} btn-outline-primary`}
                                onClick={() => navigate('/add-images')}
                              >
                                Add
                              </button>
                            )}
                          </>
                        )}
                        {hotelId && (!hotel?.hotel_images || hotel?.hotel_images.length === 0) && (
                          <button
                            className={`${styles.saveButton} ${styles.roomsPhotosButton}`}
                            onClick={() => navigate('/add-images')}
                          >
                            Add
                          </button>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Add_property;
