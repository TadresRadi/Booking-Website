


import React, { useState, useEffect } from "react";
import styles from "./add_images.module.css";
import axios from "axios";
import { useHotel } from "../../context/HotelContext.jsx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddPhotosPage() {
  const { hotelId, roomId } = useHotel();
  const [hotelFiles, setHotelFiles] = useState([]);
  const [roomFiles, setRoomFiles] = useState([]);
  const [mainHotelIndex, setMainHotelIndex] = useState(null);
  const [existingHotelPhotos, setExistingHotelPhotos] = useState([]);
  const [existingRoomPhotos, setExistingRoomPhotos] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem("access");

  useEffect(() => {
    if (hotelId) {
      axios
        .get(`http://localhost:8000/api/hotel-images/${hotelId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setExistingHotelPhotos(res.data))
        .catch((err) => console.error("Error loading hotel images:", err));
    }
    if (roomId) {
      axios
        .get(`http://localhost:8000/api/room-images/${roomId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setExistingRoomPhotos(res.data))
        .catch((err) => console.error("Error loading room images:", err));
    }
  }, [hotelId, roomId, token]);

  const handleDeletePhoto = async (photoId, type) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this photo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    });
    if (!confirmed.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:8000/api/delete-image/${photoId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (type === "hotel") {
        setExistingHotelPhotos((prev) => prev.filter((photo) => photo.id !== photoId));
      } else if (type === "room") {
        setExistingRoomPhotos((prev) => prev.filter((photo) => photo.id !== photoId));
      }

      await Swal.fire({
        title: "Deleted!",
        text: "🗑️ Photo deleted successfully.",
        icon: "success",
        confirmButtonText: "OK"
      });
    } catch (error) {
      console.error("Error deleting photo:", error);
      await Swal.fire({
        title: "Error",
        text: "❌ Failed to delete photo.",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  const handleSubmit = async () => {
    if (!hotelId || !roomId) {
      await Swal.fire({
        title: "Missing Data",
        text: "Hotel ID or Room ID is missing!",
        icon: "warning",
        confirmButtonText: "OK"
      });
      return;
    }

    const totalHotelImages = hotelFiles.length + existingHotelPhotos.length;
    const totalRoomImages = roomFiles.length + existingRoomPhotos.length;

    if (totalHotelImages < 5 || totalRoomImages < 5) {
      await Swal.fire({
        title: "Not enough photos",
        text: "Please upload at least 5 photos for hotel and room.",
        icon: "warning",
        confirmButtonText: "OK"
      });
      return;
    }

    try {
      const hotelFormData = new FormData();
      hotelFormData.append("hotel", hotelId);
      hotelFiles.forEach((file, index) => {
        hotelFormData.append("images", file);
        hotelFormData.append("is_main", index === mainHotelIndex ? "true" : "false");
      });

      if (hotelFiles.length > 0) {
        await axios.post("http://localhost:8000/api/AddHotelImages/", hotelFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      const roomFormData = new FormData();
      roomFormData.append("room", roomId);
      roomFiles.forEach((file) => roomFormData.append("images", file));

      if (roomFiles.length > 0) {
        await axios.post("http://localhost:8000/api/AddRoomImages/", roomFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      await Swal.fire({
        title: "Success",
        text: "✅ Images uploaded successfully!",
        icon: "success",
        confirmButtonText: "OK"
      });
      navigate("/add-property");
    } catch (error) {
      console.error("❌ Error while uploading images:", error);
      await Swal.fire({
        title: "Error",
        text: "An error occurred while uploading images.",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <HotelPhotosUploader
          hotelFiles={hotelFiles}
          setHotelFiles={setHotelFiles}
          mainHotelIndex={mainHotelIndex}
          setMainHotelIndex={setMainHotelIndex}
          existingPhotos={existingHotelPhotos}
          handleDeletePhoto={handleDeletePhoto}
        />
        <RoomPhotosUploader
          roomFiles={roomFiles}
          setRoomFiles={setRoomFiles}
          existingPhotos={existingRoomPhotos}
          handleDeletePhoto={handleDeletePhoto}
        />
        <button className={styles.saveButton} onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
}

function HotelPhotosUploader({
  setHotelFiles,
  hotelFiles,
  mainHotelIndex,
  setMainHotelIndex,
  existingPhotos = [],
  handleDeletePhoto,
}) {
  const handleHotelFiles = (event) => {
    const files = Array.from(event.target.files);
    setHotelFiles(files);
    setMainHotelIndex(null);
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

      {(existingPhotos.length > 0 || hotelFiles.length > 0) && (
        <div className={styles.previewGrid}>
          {existingPhotos.map((photo, index) => (
            <div key={`existing-${index}`} className={styles.previewItem}>
              <img
                src={photo.image}
                alt={`existing-${index}`}
                className={styles.previewImage}
              />
              <span className={styles.radioLabel}>
                {photo.is_main ? "🌟 Main Image" : "Existing"}
              </span>
              <button
                className={styles.deleteButton}
                onClick={() => handleDeletePhoto(photo.id, "hotel")}
              >
                🗑 Delete
              </button>
            </div>
          ))}
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

function RoomPhotosUploader({
  setRoomFiles,
  roomFiles,
  existingPhotos = [],
  handleDeletePhoto,
}) {
  const handleRoomFiles = (event) => {
    const files = Array.from(event.target.files);
    setRoomFiles(files);
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

      {(existingPhotos.length > 0 || roomFiles.length > 0) && (
        <div className={styles.previewGrid}>
          {existingPhotos.map((photo, index) => (
            <div key={`existing-room-${index}`} className={styles.previewItem}>
              <img
                src={photo.image}
                alt={`existing-room-${index}`}
                className={styles.previewImage}
              />
              <span className={styles.radioLabel}>Existing</span>
              <button
                className={styles.deleteButton}
                onClick={() => handleDeletePhoto(photo.id, "room")}
              >
                🗑 Delete
              </button>
            </div>
          ))}
          {roomFiles.map((file, index) => (
            <div key={index} className={styles.previewItem}>
              <img
                src={URL.createObjectURL(file)}
                alt={`room-preview-${index}`}
                className={styles.previewImage}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

