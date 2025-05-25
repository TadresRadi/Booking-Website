

import styles from "./home_facility.module.css";
import { 
  FaSwimmingPool, // This does NOT exist in FontAwesome
  FaCoffee, 
  FaSpa, 
  FaUtensils, 
  FaDumbbell, 
  FaWifi, 
  FaSnowflake, 
  FaConciergeBell 
} from "react-icons/fa";

import { MdPool } from "react-icons/md"; 


export function Home_facility() {
  
 const features = [
    { key: "swimming_pool", label: "Swimming Pool", icon: <FaSwimmingPool /> },
    { key: "tea_coffee_maker", label: "Tea/Coffee Maker", icon: <FaCoffee /> },
    { key: "spa", label: "Spa and Wellness Centre", icon: <FaSpa /> },
    { key: "restaurant", label: "Restaurant", icon: <FaUtensils /> },
    { key: "fitness_centre", label: "Fitness Centre", icon: <FaDumbbell /> },
    { key: "free_wifi", label: "Free WiFi", icon: <FaWifi /> },
    { key: "air_conditioning", label: "Air Conditioning", icon: <FaSnowflake /> },
    { key: "room_service", label: "Room Service", icon: <FaConciergeBell /> },
  ];

  return (
    <>
      <div className="hotel_fac">
        <h1>Hotel Features</h1>
        <div className={styles.featuresGrid}>
          {features.map(({ key, label, icon }) => (
            <div key={key} className={styles.featureItem}>
              <div className={styles.icon}>{icon}</div>
              <div className={styles.label}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    
    </>
 
  );
}
