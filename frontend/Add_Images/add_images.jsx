import React, { useState } from "react";
import styles from "./add_images.module.css";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function AddPhotosPage() {
  const [searchParams] = useSearchParams();
  const hotelId = searchParams.get("hotelId");
  const roomId = searchParams.get("roomId");

  const [hotelFiles, setHotelFiles] = useState([]);
  const [roomFiles, setRoomFiles] = useState([]);

  const handleSubmit = async () => {
    if (!hotelId || !roomId) {
      alert("Missing hotel or room ID in URL.");
      return;
    }

    if (hotelFiles.length === 0 || roomFiles.length === 0) {
      alert("Please upload both hotel and room photos.");
      return;
    }

    try {
      // Upload Hotel Photos
      const hotelFormData = new FormData();
      hotelFormData.append("hotel", hotelId);
      hotelFiles.forEach((file) => hotelFormData.append("images", file)); 

      await axios.post("http://localhost:8000/api/AddHotelImages/", hotelFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Upload Room Photos
      const roomFormData = new FormData();
      roomFormData.append("room", roomId);
      roomFiles.forEach((file) => roomFormData.append("images", file));

      await axios.post("http://localhost:8000/api/AddRoomImages/", roomFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Photos uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload photos. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <HotelPhotosUploader setHotelFiles={setHotelFiles} />
        <RoomPhotosUploader setRoomFiles={setRoomFiles} />
        <button className={styles.saveButton} onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
}

function HotelPhotosUploader({ setHotelFiles }) {
  const handleHotelFiles = (event) => {
    const files = Array.from(event.target.files);
    setHotelFiles(files);
    console.log("Hotel photos selected:", files);
  };

  return (
    <div className={styles.photoSection}>
      <div className={styles.header}>What does your hotel look like?</div>
      <div className={styles.instructions}>
        Upload at least 5 photos of your hotel...
      </div>
      <div className={styles.uploadBox}>
        <p>Drag and drop or</p>
        <input
          type="file"
          multiple
          accept="image/jpeg,image/png"
          id="hotel-photo-upload"
          style={{ display: "none" }}
          onChange={handleHotelFiles}
        />
        <label htmlFor="hotel-photo-upload" className={styles.uploadButton}>
          Upload photos
        </label>
        <p className={styles.fileInfo}>jpg/ jpeg or png, maximum 47 MP each</p>
      </div>
    </div>
  );
}

function RoomPhotosUploader({ setRoomFiles }) {
  const handleRoomFiles = (event) => {
    const files = Array.from(event.target.files);
    setRoomFiles(files);
    console.log("Room photos selected:", files);
  };

  return (
    <div className={styles.photoSection}>
      <div className={styles.header}>What do your room look like?</div>
      <div className={styles.instructions}>
        Upload at least 5 photos of your room...
      </div>
      <div className={styles.uploadBox}>
        <p>Drag and drop or</p>
        <input
          type="file"
          multiple
          accept="image/jpeg,image/png"
          id="room-photo-upload"
          style={{ display: "none" }}
          onChange={handleRoomFiles}
        />
        <label htmlFor="room-photo-upload" className={styles.uploadButton}>
          Upload photos
        </label>
        <p className={styles.fileInfo}>jpg/ jpeg or png, maximum 47 MP each</p>
      </div>
    </div>
  );
}
