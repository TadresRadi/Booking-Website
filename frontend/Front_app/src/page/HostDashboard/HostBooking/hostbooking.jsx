import React, { useEffect, useState } from "react";
import styles from "./hostbooking.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export default function HostRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("access");

  let userId = null;
  if (token) {
    const payload = parseJwt(token);
    const isExpired = payload?.exp && payload.exp * 1000 < Date.now();
    if (!isExpired) {
      userId = payload?.user_id || null;
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !userId) {
      setError("User information missing or token expired. Please login again.");
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .get(`http://localhost:8000/api/host/${userId}/rooms/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setRooms(res.data);
        setLoading(false);
        setError("");
      })
      .catch((err) => {
        setError("Error loading rooms!");
        setLoading(false);
      });
  }, [token, userId]);

  return (
    <div className={styles.propertiesRoot}>
      <header className={styles.header}>
        <div className={styles.logo}>Diva</div>
              <nav>
  <a onClick={() => navigate("/host-dashboard")} style={{ cursor: "pointer" }}>Dashboard</a>
  <a onClick={() => navigate("/host-properties")} style={{ cursor: "pointer" }}>Properties</a>
  <a
    className={styles.active}
    onClick={() => navigate("/bookings")}
    style={{ cursor: "pointer" }}
  >
    Bookings
  </a>
<a onClick={() => navigate("/reviews")} style={{ cursor: "pointer" }}>
 reviews
</a></nav>
        <div className={styles.avatar}></div>
      </header>

      <main className={styles.mainArea}>
        <section className={styles.propertiesHeaderRow}>
          <div>
            <h2 className={styles.propertiesTitle}>Your Rooms</h2>
            <p className={styles.propertiesSubtitle}>
              List of all your rooms. Manage, edit, or add new rooms.
            </p>
          </div>
          <button
            className={styles.addPropertyBtn}
            onClick={() => navigate('/add-room')}
          >
            + Add New Room
          </button>
        </section>

        <section className={styles.propertiesListSection}>
          {loading ? (
            <div className={styles.emptyProperties}>Loading...</div>
          ) : error ? (
            <div className={styles.emptyProperties}>{error}</div>
          ) : rooms.length === 0 ? (
            <div className={styles.emptyProperties}>
              You don't have any rooms yet.<br />
              <button onClick={() => navigate('/add-room')}>
                Add your first room
              </button>
            </div>
          ) : (
            <div className={styles.bookingsList}>
              {rooms.map(room => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function RoomCard({ room }) {
  const BASE_URL = "http://localhost:8000";
  const navigate = useNavigate();

  let imageUrl = "";
  if (room.images && room.images.length > 0) {
    const firstImg = room.images[0].image;
    imageUrl = firstImg.startsWith("http")
      ? firstImg
      : `${BASE_URL}${firstImg}`;
  } else {
    imageUrl = "https://via.placeholder.com/250x160?text=No+Image";
  }

  return (
    <div className={styles.bookingCard}>
      <img
        src={imageUrl}
        alt={room.name}
        onError={(e) => (e.target.src = "https://via.placeholder.com/250x160?text=No+Image")}
        style={{
          width: "120px",
          height: "90px",
          objectFit: "cover",
          borderRadius: "14px",
          marginRight: "22px",
          background: "#eee",
          boxShadow: "0 2px 8px #0001",
        }}
      />
      <div className={styles.bookingDetails}>
        <div className={styles.bookingHeadRow}>
          <span className={styles.propertyName}>{room.name}</span>
        </div>
        <div className={styles.bookingInfoRow}>
          <span>
            <b>Room Size:</b> {room.room_size} m<sup>2</sup>
          </span>
          <span>
            <b>Capacity:</b> {room.adult_capacity} adults
          </span>
        </div>
        <div className={styles.bookingInfoRow}>
          <span>
            <b>Price:</b> {room.price_per_night} EGP
          </span>
          <span>
            <b>Available:</b> {room.available_rooms}
          </span>
        </div>
      </div>
      <div className={styles.bookingStats}>
       
       
      </div>
    </div>
  );
}
