<<<<<<< HEAD
import "react-datepicker/dist/react-datepicker.css";
import styles from "./home.module.css";
import { TopDestination } from '../../components/topdistnation/topdisnation';
import { Recentserch } from '../../components/Your recent searches/trecnt_searches';
import { Trendinrserch } from '../../components/Trending search/Trending _search';
=======

import "react-datepicker/dist/react-datepicker.css";

import styles from "./home.module.css";
import { Home_hotel } from "../../components/home_hotel/home_hotel";
import { Home_facility } from "../../components/facility_home/home_faclity";
import RoomPhotoGallery from "../../components/home_gallary/home_gallary";
import { Home_review } from "../../components/home_review/room_review";



export function Homepage() {
  
>>>>>>> 76becd6f5489c9197121606fa662a43b81d04682

export function Homepage() {
  return (
    <div className={styles["main_container"]}>
<<<<<<< HEAD
      {/* يمكنك وضع أي عناصر إضافية هنا لو عندك هيدر أو غيره */}
      <Recentserch />
      <Trendinrserch />
      <TopDestination />
=======
      <Home_hotel/>
      <Home_facility/>


      <div>
      <h1 className="text-center text-2xl font-bold mt-6">Room Gallery</h1>
      <RoomPhotoGallery />
    </div>
    <Home_review/>
    
    


>>>>>>> 76becd6f5489c9197121606fa662a43b81d04682
    </div>
  );
}