
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './add_room.module.css';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useHotel } from "../../context/HotelContext";

// const allFeatures = [
//   { id: 1, name: 'clothes_rack', label: 'Clothes Rack' },
//   { id: 2, name: 'flat_screen_tv', label: 'Flat Screen TV' },
//   { id: 3, name: 'air_conditioning', label: 'Air Conditioning' },
//   { id: 4, name: 'desk', label: 'Desk' },
//   { id: 5, name: 'wake_up_service', label: 'Wake Up Service' },
//   { id: 6, name: 'towels', label: 'Towels' },
//   { id: 7, name: 'wardrobe_or_closet', label: 'Wardrobe or Closet' },
//   { id: 8, name: 'heating', label: 'Heating' },
//   { id: 9, name: 'fan', label: 'Fan' },
//   { id: 10, name: 'safety_deposit_box', label: 'Safety Deposit Box' },
//   { id: 11, name: 'extra_towels_fee', label: 'Extra Towels Fee' },
//   { id: 12, name: 'ground_floor_unit', label: 'Ground Floor Unit' },
// ];

// const AddRoomForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);

  
//   const { hotelId: contextHotelId, roomId: contextRoomId, setRoomId, setHotelId } = useHotel();
//   const hotelIdFromUrl = queryParams.get('hotelId');
//   const roomIdFromUrl = queryParams.get('roomId');
//   const hotelId = contextHotelId || hotelIdFromUrl;
//   const roomId = contextRoomId || roomIdFromUrl;

  
//   useEffect(() => {
//     if (!contextHotelId && hotelIdFromUrl) {
//       setHotelId(hotelIdFromUrl);
//     }
//     if (!contextRoomId && roomIdFromUrl) {
//       setRoomId(roomIdFromUrl);
//     }
//   }, [contextHotelId, hotelIdFromUrl, setHotelId, contextRoomId, roomIdFromUrl, setRoomId]);

 

//   const [formData, setFormData] = useState({
//     hotel: hotelId ? Number(hotelId) : '',
//     name: '',
//     price_per_night: '',
//     available_rooms: '',
//     adult_capacity: '',
//     room_size: '',
//     outdoor_view: '',
//     room_facilities: [],
//   });

//   useEffect(() => {
//     const token = localStorage.getItem('access');
//     if (roomId) {
//       axios.get(`http://localhost:8000/api/rooms/${roomId}/`, {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//         .then(res => {
//           const data = res.data;
//           setFormData({
//             hotel: hotelId ? Number(hotelId) : '',
//             name: data.name || '',
//             price_per_night: data.price_per_night || '',
//             available_rooms: data.available_rooms || '',
//             adult_capacity: data.adult_capacity || '',
//             room_size: data.room_size || '',
//             outdoor_view: data.outdoor_view || '',
//             room_facilities: data.room_facilities ? data.room_facilities.map(f => f.id) : [],
//           });
//         })
//         .catch(err => {
//           console.error("Error fetching room data:", err);
//         });
//     } else if (hotelId) {
//       setFormData(prev => ({ ...prev, hotel: Number(hotelId) }));
//     }
//   }, [roomId, hotelId]);

//   const handleChange = (e) => {
//     const { name, value, type } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'number' ? Number(value) : value,
//     }));
//   };

//   const handleFacilityChange = (featureId) => {
//     setFormData(prev => {
//       const exists = prev.room_facilities.includes(featureId);
//       return {
//         ...prev,
//         room_facilities: exists
//           ? prev.room_facilities.filter(id => id !== featureId)
//           : [...prev.room_facilities, featureId],
//       };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.room_facilities.length) {
//       alert("Please select at least one feature.");
//       return;
//     }

//     if (!formData.hotel || isNaN(Number(formData.hotel))) {
//       alert("Hotel ID is missing! Please select a hotel first.");
//       return;
//     }

//     const token = localStorage.getItem('access');

//     try {
//       if (roomId) {
//         await axios.put(
//           `http://localhost:8000/api/edit-room/${roomId}/`,
//           { ...formData, hotel: Number(formData.hotel) },
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         alert("Room updated successfully!");
//         navigate(`/add-property?hotelId=${formData.hotel}&roomId=${roomId}`);
//       } else {
//         const res = await axios.post(
//           'http://localhost:8000/api/add-room/',
//           { ...formData, hotel: Number(formData.hotel) },
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setRoomId(res.data.id);
//         alert("Room added successfully!");
//         navigate(`/add-property?hotelId=${formData.hotel}&roomId=${res.data.id}`);
//       }
//     } catch (error) {
//       console.error(error);
//       if (error.response && error.response.data) {
//         alert("Error: " + JSON.stringify(error.response.data));
//       } else {
//         alert("An error occurred while saving the room.");
//       }
//     }
//   };

//   const handleAddAnotherRoom = () => {
//     setRoomId(null);
//     setFormData({
//       hotel: hotelId ? Number(hotelId) : '',
//       name: '',
//       price_per_night: '',
//       available_rooms: '',
//       adult_capacity: '',
//       room_size: '',
//       outdoor_view: '',
//       room_facilities: [],
//     });
//     navigate(`/add-room?hotelId=${hotelId}`);
//   };

//   return (
//     <div className={styles.roomFormBackground}>
//       <div className="container py-5">
//         <div className="row justify-content-center">
//           <div className={`col-11 col-md-10 col-lg-7 p-4 shadow ${styles.roomFormCard}`}>
//             <div className="d-flex justify-content-between align-items-center mb-4">
//               <h3 className="text-center mb-0 flex-grow-1">{roomId ? 'Edit Your Room' : 'Add Your Room'}</h3>
//               {roomId && (
//                 <button
//                   type="button"
//                   className={`${styles.saveButton} btn-outline-primary ms-2`}
//                   onClick={handleAddAnotherRoom}
//                   style={{ minWidth: 170 }}
//                 >
//                   Add Another Room
//                 </button>
//               )}
//             </div>

//             <form onSubmit={handleSubmit}>
//               <input type="hidden" name="hotel" value={formData.hotel} />

//               <div className="mb-3">
//                 <label className="form-label">Room Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="form-control"
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Price per Night</label>
//                 <input
//                   type="number"
//                   name="price_per_night"
//                   value={formData.price_per_night}
//                   onChange={handleChange}
//                   className="form-control"
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Available Rooms</label>
//                 <input
//                   type="number"
//                   name="available_rooms"
//                   value={formData.available_rooms}
//                   onChange={handleChange}
//                   className="form-control"
//                   required
//                   min={0}
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Adult Capacity</label>
//                 <input
//                   type="number"
//                   name="adult_capacity"
//                   value={formData.adult_capacity}
//                   onChange={handleChange}
//                   className="form-control"
//                   required
//                   min={1}
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Room Size</label>
//                 <input
//                   type="text"
//                   name="room_size"
//                   value={formData.room_size}
//                   onChange={handleChange}
//                   className="form-control"
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Outdoor View</label>
//                 <select
//                   name="outdoor_view"
//                   value={formData.outdoor_view}
//                   onChange={handleChange}
//                   className="form-control"
//                   required
//                 >
//                   <option value="">Select View</option>
//                   <option value="balcony">Balcony</option>
//                   <option value="terrace">Terrace</option>
//                   <option value="view">View</option>
//                 </select>
//               </div>

//               <h5 className="mt-4">Room Features</h5>
//               <div className="row">
//                 {allFeatures.map((feature) => (
//                   <div className="col-6 col-md-4" key={feature.id}>
//                     <div className="form-check">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         id={`feature-${feature.id}`}
//                         checked={formData.room_facilities.includes(feature.id)}
//                         onChange={() => handleFacilityChange(feature.id)}
//                       />
//                       <label className="form-check-label" htmlFor={`feature-${feature.id}`}>
//                         {feature.label}
//                       </label>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="text-end mt-4">
//                 <button type="submit" className={styles.saveButton}>
//                   Save
//                 </button>
//               </div>
//             </form>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddRoomForm;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './add_room.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useHotel } from "../../context/HotelContext";
import Swal from 'sweetalert2';

const allFeatures = [
  { id: 1, name: 'clothes_rack', label: 'Clothes Rack' },
  { id: 2, name: 'flat_screen_tv', label: 'Flat Screen TV' },
  { id: 3, name: 'air_conditioning', label: 'Air Conditioning' },
  { id: 4, name: 'desk', label: 'Desk' },
  { id: 5, name: 'wake_up_service', label: 'Wake Up Service' },
  { id: 6, name: 'towels', label: 'Towels' },
  { id: 7, name: 'wardrobe_or_closet', label: 'Wardrobe or Closet' },
  { id: 8, name: 'heating', label: 'Heating' },
  { id: 9, name: 'fan', label: 'Fan' },
  { id: 10, name: 'safety_deposit_box', label: 'Safety Deposit Box' },
  { id: 11, name: 'extra_towels_fee', label: 'Extra Towels Fee' },
  { id: 12, name: 'ground_floor_unit', label: 'Ground Floor Unit' },
];

const AddRoomForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const { hotelId: contextHotelId, roomId: contextRoomId, setRoomId, setHotelId } = useHotel();
  const hotelIdFromUrl = queryParams.get('hotelId');
  const roomIdFromUrl = queryParams.get('roomId');
  const hotelId = contextHotelId || hotelIdFromUrl;
  const roomId = contextRoomId || roomIdFromUrl;

  useEffect(() => {
    if (!contextHotelId && hotelIdFromUrl) {
      setHotelId(hotelIdFromUrl);
    }
    if (!contextRoomId && roomIdFromUrl) {
      setRoomId(roomIdFromUrl);
    }
  }, [contextHotelId, hotelIdFromUrl, setHotelId, contextRoomId, roomIdFromUrl, setRoomId]);

  const [formData, setFormData] = useState({
    hotel: hotelId ? Number(hotelId) : '',
    name: '',
    price_per_night: '',
    available_rooms: '',
    adult_capacity: '',
    room_size: '',
    outdoor_view: '',
    room_facilities: [],
  });

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (roomId) {
      axios.get(`http://localhost:8000/api/rooms/${roomId}/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          const data = res.data;
          setFormData({
            hotel: hotelId ? Number(hotelId) : '',
            name: data.name || '',
            price_per_night: data.price_per_night || '',
            available_rooms: data.available_rooms || '',
            adult_capacity: data.adult_capacity || '',
            room_size: data.room_size || '',
            outdoor_view: data.outdoor_view || '',
            room_facilities: data.room_facilities ? data.room_facilities.map(f => f.id) : [],
          });
        })
        .catch(err => {
          console.error("Error fetching room data:", err);
        });
    } else if (hotelId) {
      setFormData(prev => ({ ...prev, hotel: Number(hotelId) }));
    }
  }, [roomId, hotelId]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleFacilityChange = (featureId) => {
    setFormData(prev => {
      const exists = prev.room_facilities.includes(featureId);
      return {
        ...prev,
        room_facilities: exists
          ? prev.room_facilities.filter(id => id !== featureId)
          : [...prev.room_facilities, featureId],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.room_facilities.length) {
      await Swal.fire({
        title: "Missing Feature",
        text: "Please select at least one feature.",
        icon: "warning",
        confirmButtonText: "OK"
      });
      return;
    }

    if (!formData.hotel || isNaN(Number(formData.hotel))) {
      await Swal.fire({
        title: "Missing Data",
        text: "Hotel ID is missing! Please select a hotel first.",
        icon: "warning",
        confirmButtonText: "OK"
      });
      return;
    }

    const token = localStorage.getItem('access');

    try {
      if (roomId) {
        await axios.put(
          `http://localhost:8000/api/edit-room/${roomId}/`,
          { ...formData, hotel: Number(formData.hotel) },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        await Swal.fire({
          title: "Success",
          text: "Room updated successfully!",
          icon: "success",
          confirmButtonText: "OK"
        });
        navigate(`/add-property?hotelId=${formData.hotel}&roomId=${roomId}`);
      } else {
        const res = await axios.post(
          'http://localhost:8000/api/add-room/',
          { ...formData, hotel: Number(formData.hotel) },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRoomId(res.data.id);
        await Swal.fire({
          title: "Success",
          text: "Room added successfully!",
          icon: "success",
          confirmButtonText: "OK"
        });
        navigate(`/add-property?hotelId=${formData.hotel}&roomId=${res.data.id}`);
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        await Swal.fire({
          title: "Error",
          text: "Error: " + JSON.stringify(error.response.data),
          icon: "error",
          confirmButtonText: "OK"
        });
      } else {
        await Swal.fire({
          title: "Error",
          text: "An error occurred while saving the room.",
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    }
  };

  const handleAddAnotherRoom = () => {
    setRoomId(null);
    setFormData({
      hotel: hotelId ? Number(hotelId) : '',
      name: '',
      price_per_night: '',
      available_rooms: '',
      adult_capacity: '',
      room_size: '',
      outdoor_view: '',
      room_facilities: [],
    });
    navigate(`/add-room?hotelId=${hotelId}`);
  };

  return (
    <div className={styles.roomFormBackground}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className={`col-11 col-md-10 col-lg-7 p-4 shadow ${styles.roomFormCard}`}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="text-center mb-0 flex-grow-1">{roomId ? 'Edit Your Room' : 'Add Your Room'}</h3>
              {/* {roomId && (
                <button
                  type="button"
                  className={`${styles.saveButton} btn-outline-primary ms-2`}
                  onClick={handleAddAnotherRoom}
                  style={{ minWidth: 170 }}
                >
                  Add Another Room
                </button>
              )} */}
            </div>

            <form onSubmit={handleSubmit}>
              <input type="hidden" name="hotel" value={formData.hotel} />

              <div className="mb-3">
                <label className="form-label">Room Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Price per Night</label>
                <input
                  type="number"
                  name="price_per_night"
                  value={formData.price_per_night}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Available Rooms</label>
                <input
                  type="number"
                  name="available_rooms"
                  value={formData.available_rooms}
                  onChange={handleChange}
                  className="form-control"
                  required
                  min={0}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Adult Capacity</label>
                <input
                  type="number"
                  name="adult_capacity"
                  value={formData.adult_capacity}
                  onChange={handleChange}
                  className="form-control"
                  required
                  min={1}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Room Size</label>
                <input
                  type="text"
                  name="room_size"
                  value={formData.room_size}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Outdoor View</label>
                <select
                  name="outdoor_view"
                  value={formData.outdoor_view}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select View</option>
                  <option value="balcony">Balcony</option>
                  <option value="terrace">Terrace</option>
                  <option value="view">View</option>
                </select>
              </div>

              <h5 className="mt-4">Room Features</h5>
              <div className="row">
                {allFeatures.map((feature) => (
                  <div className="col-6 col-md-4" key={feature.id}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`feature-${feature.id}`}
                        checked={formData.room_facilities.includes(feature.id)}
                        onChange={() => handleFacilityChange(feature.id)}
                      />
                      <label className="form-check-label" htmlFor={`feature-${feature.id}`}>
                        {feature.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-end mt-4">
                <button type="submit" className={styles.saveButton}>
                  Save
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoomForm;