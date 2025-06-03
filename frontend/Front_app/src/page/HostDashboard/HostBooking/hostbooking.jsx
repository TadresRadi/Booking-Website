

import React, { useState, useEffect } from "react";
import styles from "./hostbooking.module.css";
import { useNavigate } from "react-router-dom";


const bookingsSample = [
  {
    id: 1,
    property: "mai",
    guest: "Ahmed Youssef",
    checkIn: "2025-06-10",
    checkOut: "2025-06-13",
    nights: 3,
    status: "Confirmed",
    total: 1500,
    currency: "EGP",
    createdAt: "2025-05-25",
  },
  {
    id: 2,
    property: "ibrahim",
    guest: "Mona Ibrahim",
    checkIn: "2025-06-15",
    checkOut: "2025-06-17",
    nights: 2,
    status: "Pending",
    total: 900,
    currency: "EGP",
    createdAt: "2025-05-27",
  },
];

function getStatusClass(status) {
  if (status === "Confirmed") return styles.statusConfirmed;
  if (status === "Pending") return styles.statusPending;
  if (status === "Cancelled") return styles.statusCancelled;
  return "";
}

export default function HostBookings() {
  const [bookings, setBookings] = useState(bookingsSample);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  

  return (
    <div className={styles.propertiesRoot}>
      <header className={styles.header}>
        <div className={styles.logo}>Bookingio</div>
        <nav>
          <a>Dashboard</a>
          <a>Properties</a>
          <a className={styles.active}>Bookings</a>
          <a>Messages</a>
          <a>Reviews</a>
          <a>Settings</a>
        </nav>
        <div className={styles.avatar}></div>
      </header>

      <main className={styles.mainArea}>
        <section className={styles.propertiesHeaderRow}>
          <div>
            <h2 className={styles.propertiesTitle}>Your Bookings</h2>
            <p className={styles.propertiesSubtitle}>
              All reservations made for your hotels and apartments.
            </p>
          </div>
        </section>

        <section className={styles.propertiesListSection}>
          {loading ? (
            <div className={styles.emptyProperties}>Loading...</div>
          ) : error ? (
            <div className={styles.emptyProperties}>{error}</div>
          ) : bookings.length === 0 ? (
            <div className={styles.emptyProperties}>No bookings yet.</div>
          ) : (
            <div className={styles.bookingsList}>
              {bookings.map(booking => (
                <div key={booking.id} className={styles.bookingCard}>
                  <div className={styles.bookingDetails}>
                    <div className={styles.bookingHeadRow}>
                      <span className={styles.propertyName}>{booking.property}</span>
                      <span className={`${styles.bookingStatus} ${getStatusClass(booking.status)}`}>{booking.status}</span>
                    </div>
                    <div className={styles.bookingInfoRow}>
                      <span>
                        <b>Guest:</b> {booking.guest}
                      </span>
                      <span>
                        <b>Booked At:</b> {booking.createdAt}
                      </span>
                    </div>
                    <div className={styles.bookingInfoRow}>
                      <span>
                        <b>Check-in:</b> {booking.checkIn}
                      </span>
                      <span>
                        <b>Check-out:</b> {booking.checkOut}
                      </span>
                      <span>
                        <b>Nights:</b> {booking.nights}
                      </span>
                    </div>
                  </div>
                  <div className={styles.bookingStats}>
                    <span>
                      <b>Total:</b> {booking.total} {booking.currency}
                    </span>
                    <button
                      className={styles.bookingBtn}
                      onClick={() => navigate(`/booking/${booking.id}`)}
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}