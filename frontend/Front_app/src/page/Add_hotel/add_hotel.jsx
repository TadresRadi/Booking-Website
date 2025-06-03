
// import axios from 'axios';
// import styles from './AddHotelForm.module.css';
// import { facilityMap } from '../../assets/hoteldata/facilityMap';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useHotel } from '../../context/HotelContext';
// import { useState, useEffect } from 'react';
// import Swal from 'sweetalert2';

// const amenities = [
//   { name: 'restaurant', label: 'Restaurant' },
//   { name: 'room_service', label: 'Room service' },
//   { name: 'spa', label: 'Spa and wellness centre' },
//   { name: 'fitness_centre', label: 'Fitness Centre' },
//   { name: 'garden', label: 'Garden' },
//   { name: 'terrace', label: 'Terrace' },
//   { name: 'non_smoking_rooms', label: 'Non-smoking rooms' },
//   { name: 'airport_shuttle', label: 'Airport shuttle' },
//   { name: 'family_rooms', label: 'Family rooms' },
//   { name: 'free_wifi', label: 'Free WiFi' },
//   { name: 'air_conditioning', label: 'Air conditioning' },
//   { name: 'water_park', label: 'Water Park' },
//   { name: 'ev_charging', label: 'Electric vehicle charging station' },
//   { name: 'swimming_pool', label: 'Swimming pool' },
//   { name: 'beach', label: 'Beach' },
//   { name: 'electric_kettle', label: 'Electric Kettle' },
//   { name: 'tea_coffee_maker', label: 'Tea/Coffee maker' },
//   { name: 'dining_area', label: 'Dining area' },
//   { name: 'microwave', label: 'Microwave' },
// ];

// const AddHotelForm = () => {
//   const { hotelId: paramsHotelId } = useParams(); 
//   const { hotelId: contextHotelId, setHotelId } = useHotel(); 
//   const hotelId = paramsHotelId || contextHotelId; 

//   const [formData, setFormData] = useState({
//     hotel_name: '',
//     description: '',
//     star_rating: '',
//     country: '',
//     city: '',
//     street_address: '',
//     postal_code: '',
//     check_in_from: '',
//     check_in_until: '',
//     check_out_from: '',
//     check_out_until: '',
//     parking: '',
//     facilities: [],
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (paramsHotelId) setHotelId(paramsHotelId);
//     return () => {
//       if (paramsHotelId) setHotelId(null);
//     };
//   }, [paramsHotelId, setHotelId]);

//   useEffect(() => {
//     if (!hotelId) {
//       setFormData({
//         hotel_name: '',
//         description: '',
//         star_rating: '',
//         country: '',
//         city: '',
//         street_address: '',
//         postal_code: '',
//         check_in_from: '',
//         check_in_until: '',
//         check_out_from: '',
//         check_out_until: '',
//         parking: '',
//         facilities: [],
//       });
//     } else {
//       const token = localStorage.getItem('access');
//       axios.get(`http://localhost:8000/api/hotel/${hotelId}/`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//         .then((res) => {
//           const data = res.data;
//           setFormData({
//             hotel_name: data.hotel_name || '',
//             description: data.description || '',
//             star_rating: data.star_rating || '',
//             country: data.country || '',
//             city: data.city || '',
//             street_address: data.street_address || '',
//             postal_code: data.postal_code || '',
//             check_in_from: data.check_in_from || '',
//             check_in_until: data.check_in_until || '',
//             check_out_from: data.check_out_from || '',
//             check_out_until: data.check_out_until || '',
//             parking: data.parking || '',
//             facilities: data.facilities ? data.facilities.map(fac => fac.id) : [],
//           });
//         })
//         .catch((err) => {
//           console.error("Error fetching hotel data:", err);
//         });
//     }
//   }, [hotelId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFacilityChange = (facilityName) => {
//     const facilityId = facilityMap[facilityName];
//     if (!facilityId) return;

//     setFormData(prev => {
//       const currentFacilities = prev.facilities || [];
//       const isSelected = currentFacilities.includes(facilityId);
//       return {
//         ...prev,
//         facilities: isSelected
//           ? currentFacilities.filter(id => id !== facilityId)
//           : [...currentFacilities, facilityId],
//       };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('access');
//     try {
//       if (hotelId) {
//         await axios.put(
//           `http://localhost:8000/api/edit-hotel/${hotelId}/`,
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         await Swal.fire({
//           title: "Hotel updated successfully!",
//           icon: "success",
//           confirmButtonText: "OK"
//         });
//       } else {
//         const res = await axios.post(
//           'http://localhost:8000/api/add-hotel/',
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const newHotelId = res.data?.id;
//         if (!newHotelId) throw new Error("Hotel ID missing");
//         setHotelId(newHotelId);
//         await Swal.fire({
//           title: "Hotel added successfully!",
//           icon: "success",
//           confirmButtonText: "OK"
//         });
//       }
//       navigate('/add-property');
//     } catch (error) {
//       console.error(error.response?.data || error.message);
//       await Swal.fire({
//         title: "Error",
//         text: "An error occurred while saving the hotel",
//         icon: "error",
//         confirmButtonText: "OK"
//       });
//     }
//   };

//   return (
//     <div className={styles.hotelFormBackground}>
//       <div className={styles.bgGlass}></div>
//       <div className="container py-5" style={{ position: "relative", zIndex: 1 }}>
//         <div className="row justify-content-center">
//           <div className={`col-11 col-md-10 col-lg-7 p-4 shadow ${styles.hotelFormCard}`}>
//             <form onSubmit={handleSubmit}>
//               <h3 className="text-center mb-4">{hotelId ? 'Edit Hotel' : 'Add Your Hotel'}</h3>

//               <div className="mb-3">
//                 <label className="form-label">Hotel Name</label>
//                 <input type="text" className="form-control" name="hotel_name" value={formData.hotel_name} onChange={handleChange} required />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Description</label>
//                 <textarea className="form-control" name="description" value={formData.description || ''} onChange={handleChange} rows="3" required />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Star Rating (1 to 5)</label>
//                 <input type="number" min="1" max="5" className="form-control" name="star_rating" value={formData.star_rating} onChange={handleChange} required />
//               </div>

//               <h5 className="mt-4">Hotel Location</h5>
//               <div className="row g-3">
//                 <div className="col-md-6">
//                   <label className="form-label">Country</label>
//                   <input type="text" className="form-control" name="country" value={formData.country} onChange={handleChange} required />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Post code / ZIP</label>
//                   <input type="text" className="form-control" name="postal_code" value={formData.postal_code} onChange={handleChange} required />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">City</label>
//                   <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} required />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Street Address</label>
//                   <input type="text" className="form-control" name="street_address" value={formData.street_address} onChange={handleChange} required />
//                 </div>
//               </div>

//               <h5 className="mt-4">Check-in & Check-out</h5>
//               <div className="row g-3">
//                 <div className="col-md-6">
//                   <label className="form-label">Check-in from</label>
//                   <input type="time" className="form-control" name="check_in_from" value={formData.check_in_from} onChange={handleChange} required />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Check-in until</label>
//                   <input type="time" className="form-control" name="check_in_until" value={formData.check_in_until} onChange={handleChange} required />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Check-out from</label>
//                   <input type="time" className="form-control" name="check_out_from" value={formData.check_out_from} onChange={handleChange} required />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Check-out until</label>
//                   <input type="time" className="form-control" name="check_out_until" value={formData.check_out_until} onChange={handleChange} required />
//                 </div>
//               </div>

//               <h5 className="mt-4">Facilities</h5>
//               <div className="row">
//                 {amenities.map((item, index) => (
//                   <div className="col-6 col-md-4" key={index}>
//                     <div className="form-check">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         id={item.name}
//                         name={item.name}
//                         checked={formData.facilities.includes(facilityMap[item.name])}
//                         onChange={() => handleFacilityChange(item.name)}
//                       />
//                       <label className="form-check-label" htmlFor={item.name}>{item.label}</label>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <h5 className="mt-4">Parking</h5>
//               {['free', 'paid', 'no'].map((val, idx) => (
//                 <div className="form-check" key={idx}>
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name="parking"
//                     id={`parking-${val}`}
//                     value={val}
//                     checked={formData.parking === val}
//                     onChange={handleChange}
//                   />
//                   <label className="form-check-label" htmlFor={`parking-${val}`}>
//                     {val === 'free' ? 'Yes, free' : val === 'paid' ? 'Yes, paid' : 'No'}
//                   </label>
//                 </div>
//               ))}

//               <div className="text-end mt-4">
//                 <button className={styles.saveButton} type="submit">Save</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddHotelForm;



import axios from 'axios';
import styles from './AddHotelForm.module.css';
import { facilityMap } from '../../assets/hoteldata/facilityMap';
import { useNavigate, useParams } from 'react-router-dom';
import { useHotel } from '../../context/HotelContext';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const amenities = [
  { name: 'restaurant', label: 'Restaurant' },
  { name: 'room_service', label: 'Room service' },
  { name: 'spa', label: 'Spa and wellness centre' },
  { name: 'fitness_centre', label: 'Fitness Centre' },
  { name: 'garden', label: 'Garden' },
  { name: 'terrace', label: 'Terrace' },
  { name: 'non_smoking_rooms', label: 'Non-smoking rooms' },
  { name: 'airport_shuttle', label: 'Airport shuttle' },
  { name: 'family_rooms', label: 'Family rooms' },
  { name: 'free_wifi', label: 'Free WiFi' },
  { name: 'air_conditioning', label: 'Air conditioning' },
  { name: 'water_park', label: 'Water Park' },
  { name: 'ev_charging', label: 'Electric vehicle charging station' },
  { name: 'swimming_pool', label: 'Swimming pool' },
  { name: 'beach', label: 'Beach' },
  { name: 'electric_kettle', label: 'Electric Kettle' },
  { name: 'tea_coffee_maker', label: 'Tea/Coffee maker' },
  { name: 'dining_area', label: 'Dining area' },
  { name: 'microwave', label: 'Microwave' },
];

const AddHotelForm = () => {
  const { hotelId: paramsHotelId } = useParams(); 
  const { hotelId: contextHotelId, setHotelId } = useHotel(); 
  const hotelId = paramsHotelId || contextHotelId; 

  const [formData, setFormData] = useState({
    hotel_name: '',
    description: '',
    star_rating: '',
    country: '',
    city: '',
    street_address: '',
    postal_code: '',
    check_in_from: '',
    check_in_until: '',
    check_out_from: '',
    check_out_until: '',
    parking: '',
    facilities: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (paramsHotelId) setHotelId(paramsHotelId);
    return () => {
      if (paramsHotelId) setHotelId(null);
    };
  }, [paramsHotelId, setHotelId]);

  useEffect(() => {
    if (!hotelId) {
      setFormData({
        hotel_name: '',
        description: '',
        star_rating: '',
        country: '',
        city: '',
        street_address: '',
        postal_code: '',
        check_in_from: '',
        check_in_until: '',
        check_out_from: '',
        check_out_until: '',
        parking: '',
        facilities: [],
      });
    } else {
      const token = localStorage.getItem('access');
      axios.get(`http://localhost:8000/api/hotel/${hotelId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          const data = res.data;
          setFormData({
            hotel_name: data.hotel_name || '',
            description: data.description || '',
            star_rating: data.star_rating || '',
            country: data.country || '',
            city: data.city || '',
            street_address: data.street_address || '',
            postal_code: data.postal_code || '',
            check_in_from: data.check_in_from || '',
            check_in_until: data.check_in_until || '',
            check_out_from: data.check_out_from || '',
            check_out_until: data.check_out_until || '',
            parking: data.parking || '',
            facilities: data.facilities ? data.facilities.map(fac => fac.id) : [],
          });
        })
        .catch((err) => {
          console.error("Error fetching hotel data:", err);
        });
    }
  }, [hotelId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFacilityChange = (facilityName) => {
    const facilityId = facilityMap[facilityName];
    if (!facilityId) return;

    setFormData(prev => {
      const currentFacilities = prev.facilities || [];
      const isSelected = currentFacilities.includes(facilityId);
      return {
        ...prev,
        facilities: isSelected
          ? currentFacilities.filter(id => id !== facilityId)
          : [...currentFacilities, facilityId],
      };
    });
  };


  const timeToMinutes = (t) => {
    if (!t) return null;
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check-in and Check-out validation
    const ciFrom = timeToMinutes(formData.check_in_from);
    const ciUntil = timeToMinutes(formData.check_in_until);
    const coFrom = timeToMinutes(formData.check_out_from);
    const coUntil = timeToMinutes(formData.check_out_until);

    if (ciFrom == null || ciUntil == null || coFrom == null || coUntil == null) {
      await Swal.fire({
        title: "Missing Data",
        text: "Please fill all check-in and check-out times.",
        icon: "warning",
        confirmButtonText: "OK"
      });
      return;
    }
    if (ciFrom >= ciUntil) {
      await Swal.fire({
        title: "Invalid Check-in Time",
        text: "Check-in 'from' time must be before 'until' time.",
        icon: "error",
        confirmButtonText: "OK"
      });
      return;
    }
    if (coFrom >= coUntil) {
      await Swal.fire({
        title: "Invalid Check-out Time",
        text: "Check-out 'from' time must be before 'until' time.",
        icon: "error",
        confirmButtonText: "OK"
      });
      return;
    }
    if (ciUntil > coFrom) {
      await Swal.fire({
        title: "Invalid Time Range",
        text: "Check-in 'until' time must be before or equal to check-out 'from' time.",
        icon: "error",
        confirmButtonText: "OK"
      });
      return;
    }

    const token = localStorage.getItem('access');
    try {
      if (hotelId) {
        await axios.put(
          `http://localhost:8000/api/edit-hotel/${hotelId}/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        await Swal.fire({
          title: "Hotel updated successfully!",
          icon: "success",
          confirmButtonText: "OK"
        });
      } else {
        const res = await axios.post(
          'http://localhost:8000/api/add-hotel/',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const newHotelId = res.data?.id;
        if (!newHotelId) throw new Error("Hotel ID missing");
        setHotelId(newHotelId);
        await Swal.fire({
          title: "Hotel added successfully!",
          icon: "success",
          confirmButtonText: "OK"
        });
      }
      navigate('/add-property');
    } catch (error) {
      console.error(error.response?.data || error.message);
      await Swal.fire({
        title: "Error",
        text: "An error occurred while saving the hotel",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };
 

  return (
    <div className={styles.hotelFormBackground}>
      <div className={styles.bgGlass}></div>
      <div className="container py-5" style={{ position: "relative", zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className={`col-11 col-md-10 col-lg-7 p-4 shadow ${styles.hotelFormCard}`}>
            <form onSubmit={handleSubmit}>
              <h3 className="text-center mb-4">{hotelId ? 'Edit Hotel' : 'Add Your Hotel'}</h3>

              <div className="mb-3">
                <label className="form-label">Hotel Name</label>
                <input type="text" className="form-control" name="hotel_name" value={formData.hotel_name} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" name="description" value={formData.description || ''} onChange={handleChange} rows="3" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Star Rating (1 to 5)</label>
                <input type="number" min="1" max="5" className="form-control" name="star_rating" value={formData.star_rating} onChange={handleChange} required />
              </div>

              <h5 className="mt-4">Hotel Location</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Country</label>
                  <input type="text" className="form-control" name="country" value={formData.country} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Post code / ZIP</label>
                  <input type="text" className="form-control" name="postal_code" value={formData.postal_code} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">City</label>
                  <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Street Address</label>
                  <input type="text" className="form-control" name="street_address" value={formData.street_address} onChange={handleChange} required />
                </div>
              </div>

              <h5 className="mt-4">Check-in & Check-out</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Check-in from</label>
                  <input type="time" className="form-control" name="check_in_from" value={formData.check_in_from} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Check-in until</label>
                  <input type="time" className="form-control" name="check_in_until" value={formData.check_in_until} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Check-out from</label>
                  <input type="time" className="form-control" name="check_out_from" value={formData.check_out_from} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Check-out until</label>
                  <input type="time" className="form-control" name="check_out_until" value={formData.check_out_until} onChange={handleChange} required />
                </div>
              </div>

              <h5 className="mt-4">Facilities</h5>
              <div className="row">
                {amenities.map((item, index) => (
                  <div className="col-6 col-md-4" key={index}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={item.name}
                        name={item.name}
                        checked={formData.facilities.includes(facilityMap[item.name])}
                        onChange={() => handleFacilityChange(item.name)}
                      />
                      <label className="form-check-label" htmlFor={item.name}>{item.label}</label>
                    </div>
                  </div>
                ))}
              </div>

              <h5 className="mt-4">Parking</h5>
              {['free', 'paid', 'no'].map((val, idx) => (
                <div className="form-check" key={idx}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="parking"
                    id={`parking-${val}`}
                    value={val}
                    checked={formData.parking === val}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor={`parking-${val}`}>
                    {val === 'free' ? 'Yes, free' : val === 'paid' ? 'Yes, paid' : 'No'}
                  </label>
                </div>
              ))}

              <div className="text-end mt-4">
                <button className={styles.saveButton} type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHotelForm;
