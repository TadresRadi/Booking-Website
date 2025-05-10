import React from "react";
import styles from "./hotel_card.module.css";
import Rating from '@mui/material/Rating';
import { useState } from "react";
import { BsHeart } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";


export default function HotelsCard() {
    const [star_value] = useState(3);

    return (
        <>
            <div className={`  ${styles.card}`}>
                 <img src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Hotel" className={styles.card_img} />
                    
                    

                {/* card body */}
                <div className={`    ${styles.card_body}`}> 
                    <div className={styles.card_title_container}>
                        <h5 className={styles.card_title}>Meramees Hostel</h5>
                        <Rating sx={{
                            fontSize: "clamp(20px, 2vw, 1.5rem)",
                            '& .MuiRating-iconFilled': {
                                color: 'rgba(230, 116, 44, 1)', // filled star color
                            },
                            '& .MuiRating-iconEmpty': {
                                color: 'rgba(230, 116, 44, 1)', // empty star color
                            },
                        }} name="read-only" value={star_value} readOnly />
                    </div>

                    <div className={`  ${styles.card_location}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="24px" fill=" rgba(230, 116, 44, 1)"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" /></svg>
                        <p className="card-text">32 Sabry Abu Allam, from Talaat Harb, Downtown, Cairo, Egypt.</p>
                    </div>

                     <p className={styles.property_title}>The property offer:</p>
                    <span className={styles.property_item}>WiFi Free</span>
                    <span className={styles.property_item}>breakfast</span>
                    <span className={styles.property_item}>others..</span>
                      
                      <div className={styles.card_footer}>
                        
                     <div className={styles.card_reviews}>
                        <p className={styles.reviews}>12.3k reviews</p>
                        <p  className={styles.rate}>80% Very Good</p>
                     </div>
                     <div className={styles.card_price}>
                        <span>44$</span>
                        <span className={styles.per_night}><span className={styles.per}> /</span>4 adults,3nights.</span>
                     </div>
                     </div> 
                    
                    

                     
                </div>
            </div>



        </>

    )

}
