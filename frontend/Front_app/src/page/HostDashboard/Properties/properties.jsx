
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./properties.module.css";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("access");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/api/my-hotels/", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setProperties(res.data.results ?? []);
        setLoading(false);
        setError("");
      })
      .catch((err) => {
        setError("Error loading properties!");
        setLoading(false);
      });
  }, [token]);

  const removePropertyFromList = (hotelId) => {
    setProperties((prev) => prev.filter((p) => p.id !== hotelId));
  };

  return (
    <div className={styles.propertiesRoot}>
      <header className={styles.header}>
        <nav>
          <Link to="/host-dashboard">Dashboard</Link>
          <Link to="/host-properties" className={styles.active}>Properties</Link>
          <Link to="/host-booking">Bookings</Link>
          <Link to="/reviews">Reviews</Link>
   
        </nav>
        <div className={styles.avatar}></div>
      </header>

      <main className={styles.mainArea}>
        {/* Header & Add Property */}
        <section className={styles.propertiesHeaderRow}>
          <div>
            <h2 className={styles.propertiesTitle}>Your Properties</h2>
            <p className={styles.propertiesSubtitle}>
              List of all your hotels and apartments. Manage, edit, or add new properties.
            </p>
          </div>
          <button
            className={styles.addPropertyBtn}
            onClick={() => navigate('/add-property')}
          >
            + Add New Property
          </button>
        </section>

        {/* Properties List */}
        <section className={styles.propertiesListSection}>
          {loading ? (
            <div className={styles.emptyProperties}>Loading...</div>
          ) : error ? (
            <div className={styles.emptyProperties}>{error}</div>
          ) : properties.length === 0 ? (
            <div className={styles.emptyProperties}>
              You don't have any properties yet.<br />
              <button onClick={() => navigate('/add-property')}>
                Add your first property
              </button>
            </div>
          ) : (
            <div className={styles.propertiesList}>
              {properties.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onDeleteSuccess={removePropertyFromList}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function PropertyCard({ property, onDeleteSuccess }) {
  const navigate = useNavigate();
  const [deleting, setDeleting] = React.useState(false);

  const BASE_URL = "http://localhost:8000";

  let imageUrl = "";
  if (property.main_image) {
    imageUrl = property.main_image.startsWith("http")
      ? property.main_image
      : `${BASE_URL}${property.main_image}`;
  } else if (property.hotel_images && property.hotel_images.length > 0) {
    const firstImg = property.hotel_images[0].image;
    imageUrl = firstImg.startsWith("http")
      ? firstImg
      : `${BASE_URL}${firstImg}`;
  } else {
    imageUrl = "https://via.placeholder.com/250x160?text=No+Image";
  }

  let statusClass = styles.propertyStatus;
  if (property.status === "Active") statusClass += ` ${styles.statusActive}`;
  else if (property.status === "Pending") statusClass += ` ${styles.statusPending}`;
  else statusClass += ` ${styles.statusHidden}`;

  const handleEdit = () => {
    navigate(`/edit-hotel/${property.id}`);
  };

  const handleView = () => {
    navigate(`/hotel/${property.id}`);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this hotel?")) return;
    setDeleting(true);
    try {
      await axios.delete(`http://localhost:8000/api/hotel-detail/${property.id}/`);
      if (onDeleteSuccess) {
        onDeleteSuccess(property.id);     
      }
    } catch (error) {
      alert("Delete failed!");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className={styles.propertyCard}>
      <img
        src={imageUrl}
        alt={property.hotel_name}
        className={styles.propertyImage}
        style={{
          width: "250px",
          height: "160px",
          objectFit: "cover",
          borderRadius: "10px",
          boxShadow: "0 2px 8px #0001",
          background: "#eee",
          display: "block"
        }}
      />
      <div className={styles.propertyDetails}>
        <div className={styles.propertyHeadRow}>
          <span className={styles.propertyName}>{property.hotel_name}</span>
        </div>
        <div className={styles.propertyAddress}>
          {property.street_address} · {property.city}
        </div>
        <div className={styles.propertyQuickStats}>
          <span>
            Rating: <b>{property.star_rating || "-"}</b> <span style={{ fontSize: "1em" }}>⭐</span>
          </span>
        </div>
      </div>
      <div className={styles.propertyBtns}>
        <button className={styles.propertyBtn} onClick={handleEdit}>Edit</button>
        <button
          className={`${styles.propertyBtn} ${styles.deleteBtn}`}
          onClick={handleDelete}
          disabled={deleting}
          style={{ background: "#d9534f", color: "#fff" }}
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}