import React, { useState } from "react";
import styles from "./add_images.module.css";
import axios from "axios";
<<<<<<< HEAD
import { useHotel } from "../../context/HotelContext.jsx";
=======
import { useHotel } from "../../context/HotelContext";
>>>>>>> 47bac34b221406a702c4c10d9dc15f9b9d17cd50
import { useNavigate } from "react-router-dom";


export default function AddPhotosPage() {
  const { hotelId, roomId } = useHotel();
  const [hotelFiles, setHotelFiles] = useState([]);
  const [roomFiles, setRoomFiles] = useState([]);
  const [mainHotelIndex, setMainHotelIndex] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!hotelId || !roomId) {
      return window.cuteAlert({
        type: "error",
        title: "Error",
        message: "Hotel ID or Room ID is missing!",
        buttonText: "OK",
      });
    }

    if (hotelFiles.length < 5 || roomFiles.length < 5) {
      return window.cuteAlert({
        type: "warning",
        title: "Warning",
        message: "Please upload at least 5 photos for hotel and room.",
        buttonText: "OK",
      });
    }

    try {
      const hotelFormData = new FormData();
      hotelFormData.append("hotel", hotelId);
      hotelFiles.forEach((file, index) => {
        hotelFormData.append("images", file);
        hotelFormData.append("is_main", index === mainHotelIndex ? "true" : "false");
      });

      await axios.post("http://localhost:8000/api/AddHotelImages/", hotelFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const roomFormData = new FormData();
      roomFormData.append("room", roomId);
      roomFiles.forEach((file) => roomFormData.append("images", file));

      await axios.post("http://localhost:8000/api/AddRoomImages/", roomFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await window.cuteAlert({
        type: "success",
        title: "Success",
        message: "✅ Images uploaded successfully!",
        buttonText: "Great",
      });

      navigate("/add-property");

    } catch (error) {
      console.error("❌ Error while uploading images:", error);
      window.cuteAlert({
        type: "error",
        title: "Failed",
        message: "An error occurred while uploading images.",
        buttonText: "OK",
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <HotelPhotosUploader
          setHotelFiles={setHotelFiles}
          hotelFiles={hotelFiles}
          mainHotelIndex={mainHotelIndex}
          setMainHotelIndex={setMainHotelIndex}
        />
        <RoomPhotosUploader setRoomFiles={setRoomFiles} />
        <button className={styles.saveButton} onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
}

function HotelPhotosUploader({ setHotelFiles, hotelFiles, mainHotelIndex, setMainHotelIndex }) {
  const handleHotelFiles = (event) => {
    const files = Array.from(event.target.files);
    setHotelFiles(files);
    setMainHotelIndex(null); // Reset main image selection
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

      {hotelFiles.length > 0 && (
        <div className={styles.previewGrid}>
          {hotelFiles.map((file, index) => (
            <div key={index} className={styles.previewItem}>
              <img
                src={URL.createObjectURL(file)}
                alt={`preview-${index}`}
                className={styles.previewImage}
              />
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="main-hotel-image"
                  checked={mainHotelIndex === index}
                  onChange={() => setMainHotelIndex(index)}
                />
                Main Image
              </label>
            </div>
          ))}
        </div>
      )}
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
