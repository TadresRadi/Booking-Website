// import React from 'react';
// import Card from 'react-bootstrap/Card';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import styles from './hostone.module.css';
// import { useNavigate } from 'react-router-dom';



// export function Add_property() {
//     const navigate = useNavigate();
//   return (
//     <div className={styles.bodylike}>
//     <div className={styles.propertyWrapper}>
//       <Card className={styles.propertyCard}>
//         <Card.Body>
//           <Card.Title>Step 1</Card.Title>
//           <Card.Text>
//             <h1>Hotel Details</h1>
//             <p>The basics — Add your hotel name, address, facilities, and more.</p>
//           </Card.Text>
          
//           <a href="#" onClick={() => navigate('/add-hotel')}>Add</a>

//         </Card.Body>
//       </Card>

//       <Card className={styles.propertyCard}>
//         <Card.Body>
//           <Card.Title>Step 2</Card.Title>
//           <Card.Text>
//             <h1>Rooms</h1>
//             <p>Add rooms, layouts, bed options, and rates.</p>
//           </Card.Text>
          
//           <a href="#" onClick={() => navigate('/add-room')}>Add</a>
//         </Card.Body>
//       </Card>

//       <Card className={styles.propertyCard}>
//         <Card.Body>
//           <Card.Title>Step 3</Card.Title>
//           <Card.Text>
//             <h3>Photos</h3>
//             <p>Share photos of your hotel so guests know what to expect.</p>
//           </Card.Text>
          
//           <a href="#" onClick={() => navigate('/add-images')}>Add</a>
//         </Card.Body>
//       </Card>

//     </div>
//     </div>
//   );
// }
//////////////////////
// import React from 'react';
// import Card from 'react-bootstrap/Card';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import styles from './hostone.module.css';
// import { useNavigate } from 'react-router-dom';

// export function Add_property() {
//     const navigate = useNavigate();
//     return (
//         <div className={styles.bodylike}>
//             <div className={styles.propertyWrapper}>
//                 <Card className={styles.propertyCard}>
//                     <Card.Body>
//                         <Card.Title>Step 1</Card.Title>
//                         <h1>Hotel Details</h1>
//                         <Card.Text>
//                             The basics — Add your hotel name, address, facilities, and more.
//                         </Card.Text>
//                         <a href="#" onClick={() => navigate('/add-hotel')}>Add</a>
//                     </Card.Body>
//                 </Card>

//                 <Card className={styles.propertyCard}>
//                     <Card.Body>
//                         <Card.Title>Step 2</Card.Title>
//                         <h1>Rooms</h1>
//                         <Card.Text>
//                             Add rooms, layouts, bed options, and rates.
//                         </Card.Text>
//                         <a href="#" onClick={() => navigate('/add-room')}>Add</a>
//                     </Card.Body>
//                 </Card>

//                 <Card className={styles.propertyCard}>
//                     <Card.Body>
//                         <Card.Title>Step 3</Card.Title>
//                         <h3>Photos</h3>
//                         <Card.Text>
//                             Share photos of your hotel so guests know what to expect.
//                         </Card.Text>
//                         <a href="#" onClick={() => navigate('/add-images')}>Add</a>
//                     </Card.Body>
//                 </Card>
//             </div>
//         </div>
//     );
// }
////////////////////////////
// import React from 'react';
// import Card from 'react-bootstrap/Card';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import styles from './hostone.module.css';
// import { useNavigate } from 'react-router-dom';

// export function Add_property() {
//     const navigate = useNavigate();
//     return (
//         <div className={styles.bodylike}>
//             <div className={styles.propertyWrapper}>
//                 {/* Hotel Card - Full Width */}
//                 <Card className={`${styles.propertyCard} ${styles.fullWidthCard} mb-4`}>
//                     <div className={styles["step-number"]}>1</div>
//                     <Card.Body>
//                         <h2>Hotel Details</h2>
//                         <p>The basics — Add your hotel name, address, facilities, and more.</p>
//                         <a href="#" onClick={() => navigate('/add-hotel')}>Add</a>
//                     </Card.Body>
//                 </Card>

//                 {/* Side by side Cards */}
//                 <div className={styles.sideBySideWrapper}>
//                     <Card className={`${styles.propertyCard} ${styles.sideCard}`}>
//                         <div className={styles["step-number"]}>2</div>
//                         <Card.Body>
//                             <h2>Rooms</h2>
//                             <p>Add rooms, layouts, bed options, and rates.</p>
//                             <a href="#" onClick={() => navigate('/add-room')}>Add</a>
//                         </Card.Body>
//                     </Card>

//                     <Card className={`${styles.propertyCard} ${styles.sideCard}`}>
//                         <div className={styles["step-number"]}>3</div>
//                         <Card.Body>
//                             <h2>Photos</h2>
//                             <p>Share photos of your hotel so guests know what to expect.</p>
//                             <a href="#" onClick={() => navigate('/add-images')}>Add</a>
//                         </Card.Body>
//                     </Card>
//                 </div>
//             </div>
//         </div>
//     );
// }
/////////////////////////
// import React from 'react';
// import Card from 'react-bootstrap/Card';
// import styles from './hostone.module.css';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// export function Add_property() {
//     const navigate = useNavigate();
//     return (
//         <div className={`container py-5 ${styles.bodylike}`}>
//             <div className={styles.propertyWrapper}>
//                 {/* الكارت الكبير في الأعلى */}
//                 <div className="row mb-4">
//                     <div className="col-md-8 mx-auto">
//                         <Card className={`shadow ${styles.propertyCard}`}>
//                             <Card.Body>
//                                 <div className="d-flex justify-content-between align-items-center">
//                                     <h2 className="mb-0">Hotel Details</h2>
//                                     <span className="badge bg-info fs-5">Step 1</span>
//                                 </div>
//                                 <p className="mt-3">The basics — Add your hotel name, address, facilities, and more.</p>
//                                 <button className="btn btn-primary" onClick={() => navigate('/add-hotel')}>Add</button>
//                             </Card.Body>
//                         </Card>
//                     </div>
//                 </div>
//                 {/* الكارتين جنب بعض */}
//                 <div className="row g-4">
//                     <div className="col-md-6">
//                         <Card className={`shadow ${styles.propertyCard}`}>
//                             <Card.Body>
//                                 <div className="d-flex justify-content-between align-items-center">
//                                     <h3 className="mb-0">Rooms</h3>
//                                     <span className="badge bg-info fs-6">Step 2</span>
//                                 </div>
//                                 <p className="mt-3">Add rooms, layouts, bed options, and rates.</p>
//                                 <button className="btn btn-primary" onClick={() => navigate('/add-room')}>Add</button>
//                             </Card.Body>
//                         </Card>
//                     </div>
//                     <div className="col-md-6">
//                         <Card className={`shadow ${styles.propertyCard}`}>
//                             <Card.Body>
//                                 <div className="d-flex justify-content-between align-items-center">
//                                     <h3 className="mb-0">Photos</h3>
//                                     <span className="badge bg-info fs-6">Step 3</span>
//                                 </div>
//                                 <p className="mt-3">Share photos of your hotel so guests know what to expect.</p>
//                                 <button className="btn btn-primary" onClick={() => navigate('/add-images')}>Add</button>
//                             </Card.Body>
//                         </Card>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
////////////////////////////////
// import React from 'react';
// import Card from 'react-bootstrap/Card';
// import styles from './hostone.module.css';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// export function Add_property() {
//     const navigate = useNavigate();
//     return (
//         <div className={styles.bodylike}>
//             <div className="container py-5">
//                 <div className={styles.propertyWrapper}>
//                     {/* الكارت الكبير في الأعلى */}
//                     <div className="row mb-4">
//                         <div className="col-md-8 mx-auto">
//                             <Card className={`shadow ${styles.propertyCard}`}>
//                                 <Card.Body>
//                                     <div className="d-flex justify-content-between align-items-center">
//                                         <h2 className="mb-0">Hotel Details</h2>
//                                         <span className="badge bg-info fs-5">Step 1</span>
//                                     </div>
//                                     <p className="mt-3">The basics — Add your hotel name, address, facilities, and more.</p>
//                                     <button className="btn btn-primary" onClick={() => navigate('/add-hotel')}>Add</button>
//                                 </Card.Body>
//                             </Card>
//                         </div>
//                     </div>
//                     {/* الكارتين جنب بعض */}
//                     <div className="row g-4">
//                         <div className="col-md-6">
//                             <Card className={`shadow ${styles.propertyCard}`}>
//                                 <Card.Body>
//                                     <div className="d-flex justify-content-between align-items-center">
//                                         <h3 className="mb-0">Rooms</h3>
//                                         <span className="badge bg-info fs-6">Step 2</span>
//                                     </div>
//                                     <p className="mt-3">Add rooms, layouts, bed options, and rates.</p>
//                                     <button className="btn btn-primary" onClick={() => navigate('/add-room')}>Add</button>
//                                 </Card.Body>
//                             </Card>
//                         </div>
//                         <div className="col-md-6">
//                             <Card className={`shadow ${styles.propertyCard}`}>
//                                 <Card.Body>
//                                     <div className="d-flex justify-content-between align-items-center">
//                                         <h3 className="mb-0">Photos</h3>
//                                         <span className="badge bg-info fs-6">Step 3</span>
//                                     </div>
//                                     <p className="mt-3">Share photos of your hotel so guests know what to expect.</p>
//                                     <button className="btn btn-primary" onClick={() => navigate('/add-images')}>Add</button>
//                                 </Card.Body>
//                             </Card>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
////////////////////////
// import React from 'react';
// import Card from 'react-bootstrap/Card';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../assets/natural.jpg'; 
// import styles from "./hostone.module.css";


// export function Add_property() {
//     const navigate = useNavigate();
//     return (
//         <>
//             {/* الخلفية */}
//             <div className="bg-fullscreen"></div>
//             {/* محتوى الصفحة فوق الخلفية */}
//             <div className="position-relative" style={{zIndex: 1, minHeight: "100vh"}}>
//                 <div className="container py-5">
//                     {/* الكارت الكبير في الأعلى */}
//                     <div className="row mb-4">
//                         <div className="col-md-8 mx-auto">
//                             <Card className="shadow" style={{
//                                 background: "rgba(255,255,255,0.75)",
//                                 backdropFilter: "blur(10px)",
//                                 borderRadius: "20px",
//                                 padding: "2rem",
//                                 borderTop: "8px solid #78c4dd",
//                                 backgroundColor: "#fff5f3"
//                             }}>
//                                 <Card.Body>
//                                     <div className="d-flex justify-content-between align-items-center">
//                                         <h2 className="mb-0">Hotel Details</h2>
//                                         <span className="badge bg-info fs-5">Step 1</span>
//                                     </div>
//                                     <p className="mt-3">The basics — Add your hotel name, address, facilities, and more.</p>
//                                     <button className="saveButton" onClick={() => navigate('/add-hotel')}>Add</button>
//                                 </Card.Body>
//                             </Card>
//                         </div>
//                     </div>
//                     {/* الكارتين جنب بعض */}
//                     <div className="row g-4">
//                         <div className="col-md-6">
//                             <Card className="shadow" style={{
//                                 background: "rgba(255,255,255,0.75)",
//                                 backdropFilter: "blur(10px)",
//                                 borderRadius: "20px",
//                                 padding: "2rem",
//                                 borderTop: "8px solid #78c4dd",
//                                 backgroundColor: "#fff5f3"
//                             }}>
//                                 <Card.Body>
//                                     <div className="d-flex justify-content-between align-items-center">
//                                         <h3 className="mb-0">Rooms</h3>
//                                         <span className="badge bg-info fs-6">Step 2</span>
//                                     </div>
//                                     <p className="mt-3">Add rooms, layouts, bed options, and rates.</p>
//                                     <button className="saveButton" onClick={() => navigate('/add-room')}>Add</button>
//                                 </Card.Body>
//                             </Card>
//                         </div>
//                         <div className="col-md-6">
//                             <Card className="shadow" style={{
//                                 background: "rgba(255,255,255,0.75)",
//                                 backdropFilter: "blur(10px)",
//                                 borderRadius: "20px",
//                                 padding: "2rem",
//                                 borderTop: "8px solid #78c4dd",
//                                 backgroundColor: "#fff5f3"
//                             }}>
//                                 <Card.Body>
//                                     <div className="d-flex justify-content-between align-items-center">
//                                         <h3 className="mb-0">Photos</h3>
//                                         <span className="badge bg-info fs-6">Step 3</span>
//                                     </div>
//                                     <p className="mt-3">Share photos of your hotel so guests know what to expect.</p>
//                                     <button className="saveButton" onClick={() => navigate('/add-images')}>Add</button>
//                                 </Card.Body>
//                             </Card>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Add_property;
//////////////////////////
// 
// import React from 'react';
// import Card from 'react-bootstrap/Card';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import styles from "./hostone.module.css";

// export function Add_property() {
//     const navigate = useNavigate();
//     return (
//         <div className={styles.bodylike}>
//             <div className="position-relative" style={{zIndex: 1, minHeight: "100vh"}}>
//                 <div className="container py-5">
//                     {/* الكارت الكبير في الأعلى */}
//                     <div className="row mb-4">
//                         <div className="col-md-8 mx-auto">
//                             <Card className={styles.cardCustom}>
//                                 <Card.Body>
//                                     <div className="d-flex justify-content-between align-items-center">
//                                         <h2 className={styles.cardTitle}>Hotel Details</h2>
//                                         <span className="badge bg-info fs-5">Step 1</span>
//                                     </div>
//                                     <p className="mt-3 text-center">The basics — Add your hotel name, address, facilities, and more.</p>
//                                     <div className="text-center mt-3">
//                                         <button className={styles.saveButton} onClick={() => navigate('/add-hotel')}>Add</button>
//                                     </div>
//                                 </Card.Body>
//                             </Card>
//                         </div>
//                     </div>
//                     {/* الكارتين تحت بنفس عرض اللي فوق وبنفس الارتفاع */}
//                     <div className="row">
//                         <div className="col-md-8 mx-auto">
//                             <div className="row g-4 align-items-stretch">
//                                 <div className="col-md-6 d-flex">
//                                     <Card className={`${styles.cardCustom} flex-fill`}>
//                                         <Card.Body className="d-flex flex-column">
//                                             <div className="d-flex justify-content-between align-items-center">
//                                                 <h3 className={styles.cardTitle}>Rooms</h3>
//                                                 <span className="badge bg-info fs-6">Step 2</span>
//                                             </div>
//                                             <p className="mt-3 flex-grow-1 text-center">Add rooms, layouts, bed options, and rates.</p>
//                                             <div className="text-center mt-auto">
//                                                 <button className={styles.saveButton} onClick={() => navigate('/add-room')}>Add</button>
//                                             </div>
//                                         </Card.Body>
//                                     </Card>
//                                 </div>
//                                 <div className="col-md-6 d-flex">
//                                     <Card className={`${styles.cardCustom} flex-fill`}>
//                                         <Card.Body className="d-flex flex-column">
//                                             <div className="d-flex justify-content-between align-items-center">
//                                                 <h3 className={styles.cardTitle}>Photos</h3>
//                                                 <span className="badge bg-info fs-6">Step 3</span>
//                                             </div>
//                                             <p className="mt-3 flex-grow-1 text-center">Share photos of your hotel so guests know what to expect.</p>
//                                             <div className="text-center mt-auto">
//                                                 <button className={styles.saveButton} onClick={() => navigate('/add-images')}>Add</button>
//                                             </div>
//                                         </Card.Body>
//                                     </Card>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Add_property;

// import React from 'react';
// import Card from 'react-bootstrap/Card';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import styles from "./hostone.module.css";

// export function Add_property() {
//     const navigate = useNavigate();
//     return (
//         <div className={styles.bodylike}>
//             {/* صورة الخلفية مع تأثير زجاجي */}
//             <div className={styles.bgGlass}></div>
//             <div className="position-relative" style={{zIndex: 1, minHeight: "100vh"}}>
//                 <div className="container py-5">
//                     {/* الكارت الكبير في الأعلى */}
//                     <div className="row mb-4">
//                         <div className="col-md-8 mx-auto">
//                             <Card className={styles.cardCustom}>
//                                 <Card.Body>
//                                     <div className="d-flex justify-content-between align-items-center">
//                                         <h2 className={styles.cardTitle}>Hotel Details</h2>
//                                         <span className="badge bg-info fs-5">Step 1</span>
//                                     </div>
//                                     <p className="mt-3 text-center">The basics — Add your hotel name, address, facilities, and more.</p>
//                                     <div className="text-center mt-3">
//                                         <button className={styles.saveButton} onClick={() => navigate('/add-hotel')}>Add</button>
//                                     </div>
//                                 </Card.Body>
//                             </Card>
//                         </div>
//                     </div>
//                     {/* الكارتين تحت بنفس عرض اللي فوق وبنفس الارتفاع */}
//                     <div className="row">
//                         <div className="col-md-8 mx-auto">
//                             <div className="row g-4 align-items-stretch">
//                                 <div className="col-md-6 d-flex">
//                                     <Card className={`${styles.cardCustom} flex-fill`}>
//                                         <Card.Body className="d-flex flex-column">
//                                             <div className="d-flex justify-content-between align-items-center">
//                                                 <h3 className={styles.cardTitle}>Rooms</h3>
//                                                 <span className="badge bg-info fs-6">Step 2</span>
//                                             </div>
//                                             <p className="mt-3 flex-grow-1 text-center">Add rooms, layouts, bed options, and rates.</p>
//                                             <div className="text-center mt-auto">
//                                                 <button className={styles.saveButton} onClick={() => navigate('/add-room')}>Add</button>
//                                             </div>
//                                         </Card.Body>
//                                     </Card>
//                                 </div>
//                                 <div className="col-md-6 d-flex">
//                                     <Card className={`${styles.cardCustom} flex-fill`}>
//                                         <Card.Body className="d-flex flex-column">
//                                             <div className="d-flex justify-content-between align-items-center">
//                                                 <h3 className={styles.cardTitle}>Photos</h3>
//                                                 <span className="badge bg-info fs-6">Step 3</span>
//                                             </div>
//                                             <p className="mt-3 flex-grow-1 text-center">Share photos of your hotel so guests know what to expect.</p>
//                                             <div className="text-center mt-auto">
//                                                 <button className={styles.saveButton} onClick={() => navigate('/add-images')}>Add</button>
//                                             </div>
//                                         </Card.Body>
//                                     </Card>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Add_property;






// import React, { useState, useEffect } from 'react';
// import Card from 'react-bootstrap/Card';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import styles from "./hostone.module.css";

// export function Add_property() {
//     const navigate = useNavigate();
//     const [hotel, setHotel] = useState(null);

//     // مثال: id الفندق 1 أو عدلي حسب التطبيق
//     const hotelId = 1;

//     useEffect(() => {
//         // استبدلي الرابط باللينك الفعلي للـ API عندك
//         axios.get(`http://localhost:8000/api/hotel/${hotelId}/`)
//             .then(res => setHotel(res.data))
//             .catch(err => console.error(err));
//     }, []);

//     return (
//         <div className={styles.bodylike}>
//             {/* صورة الخلفية مع تأثير زجاجي */}
//             <div className={styles.bgGlass}></div>
//             <div className="position-relative" style={{zIndex: 1, minHeight: "100vh"}}>
//                 <div className="container py-5">
//                     {/* الكارت الكبير في الأعلى */}
//                     <div className="row mb-4">
//                         <div className="col-md-8 mx-auto">
//                             <Card className={styles.cardCustom}>
//                                 <Card.Body>
//                                     <div className="d-flex justify-content-between align-items-center">
//                                         <h2 className={styles.cardTitle}>Hotel Details</h2>
//                                         <span className="badge bg-info fs-5">Step 1</span>
//                                     </div>

//                                     {/* صورة الفندق الرئيسية */}
//                                     {hotel && hotel.main_image && (
//                                         <div className="text-center my-3">
//                                             <img
//                                                 src={hotel.main_image}
//                                                 alt={hotel.hotel_name}
//                                                 style={{ width: 250, height: 180, objectFit: "cover", borderRadius: 12, boxShadow: "0 2px 12px #0001" }}
//                                             />
//                                         </div>
//                                     )}

//                                     <p className="mt-3 text-center">The basics — Add your hotel name, address, facilities, and more.</p>
//                                     <div className="text-center mt-3">
//                                         <button className={styles.saveButton} onClick={() => navigate('/add-hotel')}>Add</button>
//                                     </div>
//                                 </Card.Body>
//                             </Card>
//                         </div>
//                     </div>
//                     {/* الكارتين تحت بنفس عرض اللي فوق وبنفس الارتفاع */}
//                     <div className="row">
//                         <div className="col-md-8 mx-auto">
//                             <div className="row g-4 align-items-stretch">
//                                 <div className="col-md-6 d-flex">
//                                     <Card className={`${styles.cardCustom} flex-fill`}>
//                                         <Card.Body className="d-flex flex-column">
//                                             <div className="d-flex justify-content-between align-items-center">
//                                                 <h3 className={styles.cardTitle}>Rooms</h3>
//                                                 <span className="badge bg-info fs-6">Step 2</span>
//                                             </div>
//                                             <p className="mt-3 flex-grow-1 text-center">Add rooms, layouts, bed options, and rates.</p>
//                                             <div className="text-center mt-auto">
//                                                 <button className={styles.saveButton} onClick={() => navigate('/add-room')}>Add</button>
//                                             </div>
//                                         </Card.Body>
//                                     </Card>
//                                 </div>
//                                 <div className="col-md-6 d-flex">
//                                     <Card className={`${styles.cardCustom} flex-fill`}>
//                                         <Card.Body className="d-flex flex-column">
//                                             <div className="d-flex justify-content-between align-items-center">
//                                                 <h3 className={styles.cardTitle}>Photos</h3>
//                                                 <span className="badge bg-info fs-6">Step 3</span>
//                                             </div>
//                                             <p className="mt-3 flex-grow-1 text-center">Share photos of your hotel so guests know what to expect.</p>
//                                             <div className="text-center mt-auto">
//                                                 <button className={styles.saveButton} onClick={() => navigate('/add-images')}>Add</button>
//                                             </div>
//                                         </Card.Body>
//                                     </Card>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Add_property;




// import React, { useState, useEffect, useContext } from 'react';
// import Card from 'react-bootstrap/Card';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import styles from "./hostone.module.css";
// // import { HotelContext } from '../HotelContext'; 
// import { useHotel } from '../../context/HotelContext';
// export function Add_property() {
//     const navigate = useNavigate();
//     const [hotel, setHotel] = useState(null);

//     // const { hotelId } = useContext(useHotel); 
//     const { hotelId } = useHotel();

//     useEffect(() => {
//         if (hotelId) {
//             axios.get(`http://localhost:8000/api/hotel/${hotelId}/`)
//                 .then(res => setHotel(res.data))
//                 .catch(err => console.error(err));
//         }
//     }, [hotelId]);

//     return (
//         <div className={styles.bodylike}>
//             <div className={styles.bgGlass}></div>
//             <div className="position-relative" style={{ zIndex: 1, minHeight: "100vh" }}>
//                 <div className="container py-5">
//                     <div className="row mb-4">
//                         <div className="col-md-8 mx-auto">
//                             <Card className={styles.cardCustom}>
//                                 <Card.Body>
//                                     <div className="d-flex justify-content-between align-items-center">
//                                         <h2 className={styles.cardTitle}>Hotel Details</h2>
//                                         <span className="badge bg-info fs-5">Step 1</span>
//                                     </div>

//                                     {hotel && hotel.hotel_images && (
//                                         <div className="text-center my-3">
//                                             <img
//                                                 src={hotel.hotel_images.find(img => img.is_main)?.image}
//                                                 alt={hotel.hotel_name}
//                                                 style={{
//                                                     width: 250,
//                                                     height: 180,
//                                                     objectFit: "cover",
//                                                     borderRadius: 12,
//                                                     boxShadow: "0 2px 12px #0001"
//                                                 }}
//                                             />
//                                         </div>
//                                     )}

//                                     <p className="mt-3 text-center">
//                                         The basics — Add your hotel name, address, facilities, and more.
//                                     </p>
//                                     <div className="text-center mt-3">
//                                         <button className={styles.saveButton} onClick={() => navigate('/add-hotel')}>
//                                             Add
//                                         </button>
//                                     </div>
//                                 </Card.Body>
//                             </Card>
//                         </div>
//                     </div>

//                     {/* باقي خطوات Rooms / Photos زي ما هم */}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Add_property;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Card from 'react-bootstrap/Card';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import styles from './hostone.module.css';
// import { useHotel } from '../../context/HotelContext';

// export function Add_property() {
//     const navigate = useNavigate();
//     const [hotel, setHotel] = useState(null);
//     const { hotelId } = useHotel();

//     useEffect(() => {
//         if (hotelId) {
//             axios.get(`http://localhost:8000/api/hotel/${hotelId}/`)
//                 .then(res => setHotel(res.data))
//                 .catch(err => console.error(err));
//         }
//     }, [hotelId]);

//     if (!hotelId) {
//         return (
//             <div className={styles.bodylike}>
//                 <div className="text-center py-5">
//                     <h4 className="text-danger">No hotel selected. Please start from the Add Hotel page.</h4>
//                     <button className={styles.saveButton} onClick={() => navigate('/add-hotel')}>Go to Add Hotel</button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className={styles.bodylike}>
//             <div className={styles.bgGlass}></div>
//             <div className="position-relative" style={{ zIndex: 1, minHeight: "100vh" }}>
//                 <div className="container py-5">
//                     {/* Step 1 */}
//                     <div className="row mb-4">
//                         <div className="col-md-8 mx-auto">
//                             <Card className={styles.cardCustom}>
//                                 <Card.Body>
//                                     <div className="d-flex justify-content-between align-items-center">
//                                         <h2 className={styles.cardTitle}>Hotel Details</h2>
//                                         <span className="badge bg-info fs-5">Step 1</span>
//                                     </div>
//                                     {hotel?.hotel_images?.length > 0 && (
//                                         <div className="text-center my-3">
//                                             <img
//                                                 src={hotel.hotel_images.find(img => img.is_main)?.image}
//                                                 alt={hotel.hotel_name}
//                                                 style={{
//                                                     width: 250,
//                                                     height: 180,
//                                                     objectFit: "cover",
//                                                     borderRadius: 12,
//                                                     boxShadow: "0 2px 12px #0001"
//                                                 }}
//                                             />
//                                         </div>
//                                     )}
//                                     <p className="mt-3 text-center">
//                                         The basics — Add your hotel name, address, facilities, and more.
//                                     </p>
//                                     <div className="text-center mt-3">
//                                         <button className={styles.saveButton} onClick={() => navigate('/add-hotel')}>
//                                             Add
//                                         </button>
//                                     </div>
//                                 </Card.Body>
//                             </Card>
//                         </div>
//                     </div>

//                     {/* Step 2 + Step 3 */}
//                     <div className="row">
//                         <div className="col-md-8 mx-auto">
//                             <div className="row g-4 align-items-stretch">
//                                 {/* Step 2 */}
//                                 <div className="col-md-6 d-flex">
//                                     <Card className={`${styles.cardCustom} flex-fill`}>
//                                         <Card.Body className="d-flex flex-column">
//                                             <div className="d-flex justify-content-between align-items-center">
//                                                 <h3 className={styles.cardTitle}>Rooms</h3>
//                                                 <span className="badge bg-info fs-6">Step 2</span>
//                                             </div>
//                                             <p className="mt-3 flex-grow-1 text-center">Add rooms, layouts, bed options, and rates.</p>
//                                             <div className="text-center mt-auto">
//                                                 <button className={styles.saveButton} onClick={() => navigate('/add-room')}>Add</button>
//                                             </div>
//                                         </Card.Body>
//                                     </Card>
//                                 </div>

//                                 {/* Step 3 */}
//                                 <div className="col-md-6 d-flex">
//                                     <Card className={`${styles.cardCustom} flex-fill`}>
//                                         <Card.Body className="d-flex flex-column">
//                                             <div className="d-flex justify-content-between align-items-center">
//                                                 <h3 className={styles.cardTitle}>Photos</h3>
//                                                 <span className="badge bg-info fs-6">Step 3</span>
//                                             </div>
//                                             <p className="mt-3 flex-grow-1 text-center">Share photos of your hotel so guests know what to expect.</p>
//                                             <div className="text-center mt-auto">
//                                                 <button className={styles.saveButton} onClick={() => navigate('/add-images')}>Add</button>
//                                             </div>
//                                         </Card.Body>
//                                     </Card>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Add_property;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Card from 'react-bootstrap/Card';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import styles from './hostone.module.css';
// import { useHotel } from '../../context/HotelContext';

// export function Add_property() {
//     const navigate = useNavigate();
//     const [hotel, setHotel] = useState(null);
//     const { hotelId } = useHotel();

//     useEffect(() => {
//         if (hotelId) {
//             axios.get(`http://localhost:8000/api/hotel/${hotelId}/`)
//                 .then(res => setHotel(res.data))
//                 .catch(err => console.error(err));
//         }
//     }, [hotelId]);

//     return (
//         <div className={styles.bodylike}>
//             <div className={styles.bgGlass}></div>
//             <div className="position-relative" style={{ zIndex: 1, minHeight: "100vh" }}>
//                 <div className="container py-5">
//                     {/* Step 1 */}
//                     <div className="row mb-4">
//                         <div className="col-md-8 mx-auto">
//                             <Card className={styles.cardCustom}>
//                                 <Card.Body>
//                                     <div className="d-flex justify-content-between align-items-center">
//                                         <h2 className={styles.cardTitle}>Hotel Details</h2>
//                                         <span className="badge bg-info fs-5">Step 1</span>
//                                     </div>

//                                     <div className="text-center my-3">
//                                         {hotel?.hotel_images?.length > 0 ? (
//                                             <img
//                                                 src={hotel.hotel_images.find(img => img.is_main)?.image}
//                                                 alt={hotel.hotel_name}
//                                                 style={{
//                                                     width: 250,
//                                                     height: 180,
//                                                     objectFit: "cover",
//                                                     borderRadius: 12,
//                                                     boxShadow: "0 2px 12px #0001"
//                                                 }}
//                                             />
//                                         ) : (
//                                             <p className="text-muted"></p>
//                                         )}
//                                     </div>

//                                     <p className="mt-3 text-center">
//                                         The basics — Add your hotel name, address, facilities, and more.
//                                     </p>
//                                     <div className="text-center mt-3">
//                                         <button className={styles.saveButton} onClick={() => navigate('/add-hotel')}>
//                                             {hotelId ? 'Edit' : 'Add'}
//                                         </button>
//                                     </div>
//                                 </Card.Body>
//                             </Card>
//                         </div>
//                     </div>

//                     {/* Step 2 + Step 3 */}
//                     <div className="row">
//                         <div className="col-md-8 mx-auto">
//                             <div className="row g-4 align-items-stretch">
//                                 {/* Step 2 */}
//                                 <div className="col-md-6 d-flex">
//                                     <Card className={`${styles.cardCustom} flex-fill`}>
//                                         <Card.Body className="d-flex flex-column">
//                                             <div className="d-flex justify-content-between align-items-center">
//                                                 <h3 className={styles.cardTitle}>Rooms</h3>
//                                                 <span className="badge bg-info fs-6">Step 2</span>
//                                             </div>
//                                             <p className="mt-3 flex-grow-1 text-center">
//                                                 Add rooms, layouts, bed options, and rates.
//                                             </p>
//                                             <div className="text-center mt-auto">
//                                                 <button className={styles.saveButton} onClick={() => navigate('/add-room')}>
//                                                     Add
//                                                 </button>
//                                             </div>
//                                         </Card.Body>
//                                     </Card>
//                                 </div>

//                                 {/* Step 3 */}
//                                 <div className="col-md-6 d-flex">
//                                     <Card className={`${styles.cardCustom} flex-fill`}>
//                                         <Card.Body className="d-flex flex-column">
//                                             <div className="d-flex justify-content-between align-items-center">
//                                                 <h3 className={styles.cardTitle}>Photos</h3>
//                                                 <span className="badge bg-info fs-6">Step 3</span>
//                                             </div>
//                                             <p className="mt-3 flex-grow-1 text-center">
//                                                 Share photos of your hotel so guests know what to expect.
//                                             </p>
//                                             <div className="text-center mt-auto">
//                                                 <button className={styles.saveButton} onClick={() => navigate('/add-images')}>
//                                                     Add
//                                                 </button>
//                                             </div>
//                                         </Card.Body>
//                                     </Card>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Add_property;
   


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
  const { hotelId } = useHotel();

  useEffect(() => {
    if (hotelId) {
      axios.get(`http://localhost:8000/api/hotel/${hotelId}/`)
        .then(res => setHotel(res.data))
        .catch(err => console.error(err));
    }
  }, [hotelId]);

  return (
    <div className={styles.bodylike}>
      <div className={styles.bgGlass}></div>
      <div className="position-relative" style={{ zIndex: 1, minHeight: "100vh" }}>
        <div className="container py-5">

          {/* Step 1 */}
          <div className="row mb-4">
            <div className="col-md-8 mx-auto">
              <Card className={styles.cardCustom}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className={styles.cardTitle}>Hotel Details</h2>
                    <span className="badge bg-info fs-5">Step 1</span>
                  </div>

                  <div className="row align-items-center">
                    {/* Text + Button */}
                    <div className="col-md-7">
                      <p className="mb-3">
                        The basics — Add your hotel name, address, facilities, and more.
                      </p>
                      <div className="text-start">
                        <button
                          className={styles.saveButton}
                          onClick={() => navigate('/add-hotel')}
                        >
                          {hotelId ? 'Edit' : 'Add'}
                        </button>
                      </div>
                    </div>

                    {/* Image on the right */}
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

          {/* Step 2 + Step 3 */}
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div className="row g-4 align-items-stretch">

                {/* Step 2 */}
                <div className="col-md-6 d-flex">
                  <Card className={`${styles.cardCustom} flex-fill`}>
                    <Card.Body className="d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className={styles.cardTitle}>Rooms</h3>
                        <span className="badge bg-info fs-6">Step 2</span>
                      </div>

                      <div className="d-flex flex-md-row-reverse flex-column align-items-center gap-3">
                        <button
                          className={`${styles.saveButton} ${styles.roomsPhotosButton}`}
                          onClick={() => navigate('/add-room')}
                        >
                          Add
                        </button>
                        <p className="mb-0 flex-grow-1 text-md-start text-center">
                          Add rooms, layouts, bed options, and rates.
                        </p>
                      </div>
                    </Card.Body>
                  </Card>
                </div>

                {/* Step 3 */}
                <div className="col-md-6 d-flex">
                  <Card className={`${styles.cardCustom} flex-fill`}>
                    <Card.Body className="d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className={styles.cardTitle}>Photos</h3>
                        <span className="badge bg-info fs-6">Step 3</span>
                      </div>

                      <div className="d-flex flex-md-row-reverse flex-column align-items-center gap-3">
                        <button
                          className={`${styles.saveButton} ${styles.roomsPhotosButton}`}
                          onClick={() => navigate('/add-images')}
                        >
                          Add
                        </button>
                        <p className="mb-0 flex-grow-1 text-md-start text-center">
                          Share photos of your hotel so guests know what to expect.
                        </p>
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





// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Card from 'react-bootstrap/Card';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import styles from './hostone.module.css';
// import { useHotel } from '../../context/HotelContext';

// export function Add_property() {
//   const navigate = useNavigate();
//   const [hotel, setHotel] = useState(null);
//   const { hotelId } = useHotel();

//   useEffect(() => {
//     if (hotelId) {
//       axios.get(`http://localhost:8000/api/hotel/${hotelId}/`)
//         .then(res => setHotel(res.data))
//         .catch(err => console.error(err));
//     }
//   }, [hotelId]);

//   return (
//     <div className={styles.bodylike}>
//       <div className={styles.bgGlass}></div>
//       <div className="position-relative" style={{ zIndex: 1, minHeight: "100vh" }}>
//         <div className="container py-5">

//           {/* Step 1 */}
//           <div className="row mb-4">
//             <div className="col-md-8 mx-auto">
//               <Card className={styles.cardCustom}>
//                 <Card.Body>
//                   <div className="d-flex justify-content-between align-items-center mb-3">
//                     <h2 className={styles.cardTitle}>Hotel Details</h2>
//                     <span className="badge bg-info fs-5">Step 1</span>
//                   </div>

//                   <div className="row align-items-center">
//                     {/* Text + Button */}
//                     <div className="col-md-7">
//                       <p className="mb-3">
//                         The basics — Add your hotel name, address, facilities, and more.
//                       </p>
//                       <div className="text-start">
//                         <button
//                           className={`${styles.saveButton} ${styles.hotelButton}`}
//                           onClick={() => navigate('/add-hotel')}
//                         >
//                           {hotelId ? 'Edit' : 'Add'}
//                         </button>
//                       </div>
//                     </div>

//                     {/* Image on the right */}
//                     <div className="col-md-5 text-center">
//                       {hotel?.hotel_images?.length > 0 ? (
//                         <img
//                           src={hotel.hotel_images.find(img => img.is_main)?.image}
//                           alt={hotel.hotel_name}
//                           style={{
//                             width: '100%',
//                             height: 'auto',
//                             maxHeight: 180,
//                             objectFit: 'cover',
//                             borderRadius: 12,
//                             boxShadow: '0 2px 12px #0001'
//                           }}
//                         />
//                       ) : (
//                         <p className="text-muted">No image available</p>
//                       )}
//                     </div>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </div>
//           </div>

//           {/* Step 2 + Step 3 */}
//           <div className="row">
//             <div className="col-md-8 mx-auto">
//               <div className="row g-4 align-items-stretch">

//                 {/* Step 2 */}
//                 <div className="col-md-6 d-flex">
//                   <Card className={`${styles.cardCustom} flex-fill`}>
//                     <Card.Body className="d-flex flex-column">
//                       <div className="d-flex justify-content-between align-items-center mb-3">
//                         <h3 className={styles.cardTitle}>Rooms</h3>
//                         <span className="badge bg-info fs-6">Step 2</span>
//                       </div>

//                       <div className="d-flex flex-md-row-reverse flex-column align-items-center gap-3">
//                         <button
//                           className={styles.saveButton}
//                           onClick={() => navigate('/add-room')}
//                         >
//                           Add
//                         </button>
//                         <p className="mb-0 flex-grow-1 text-md-start text-center">
//                           Add rooms, layouts, bed options, and rates.
//                         </p>
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </div>

//                 {/* Step 3 */}
//                 <div className="col-md-6 d-flex">
//                   <Card className={`${styles.cardCustom} flex-fill`}>
//                     <Card.Body className="d-flex flex-column">
//                       <div className="d-flex justify-content-between align-items-center mb-3">
//                         <h3 className={styles.cardTitle}>Photos</h3>
//                         <span className="badge bg-info fs-6">Step 3</span>
//                       </div>

//                       <div className="d-flex flex-md-row-reverse flex-column align-items-center gap-3">
//                         <button
//                           className={styles.saveButton}
//                           onClick={() => navigate('/add-images')}
//                         >
//                           Add
//                         </button>
//                         <p className="mb-0 flex-grow-1 text-md-start text-center">
//                           Share photos of your hotel so guests know what to expect.
//                         </p>
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </div>

//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default Add_property;




