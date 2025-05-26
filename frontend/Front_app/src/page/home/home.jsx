import "react-datepicker/dist/react-datepicker.css";
import styles from "./home.module.css";
import { Home_hotel } from "../../components/home_hotel/home_hotel";
import { Home_facility } from "../../components/facility_home/home_faclity";
import RoomPhotoGallery from "../../components/home_gallary/home_gallary";
import { Home_review } from "../../components/home_review/room_review";

export function Homepage() {
  return (
    <div className={styles["main_container"]}>
      <Home_hotel />
      <Home_facility />
      <div>
        <h1 className="text-center text-2xl font-bold mt-6">Room Gallery</h1>
        <RoomPhotoGallery />
      </div>
      <Home_review />
    </div>
  );
}