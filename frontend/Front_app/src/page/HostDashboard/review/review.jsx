import React, { useEffect, useState } from "react";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/reviews/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reviews");
        return res.json();
      })
      .then((data) => {
        setReviews(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const sectionsCount = 4;
  const chunkSize = Math.ceil(reviews.length / sectionsCount);
  const sections = [];
  for (let i = 0; i < sectionsCount; i++) {
    sections.push(reviews.slice(i * chunkSize, (i + 1) * chunkSize));
  }

  if (loading) return <p style={styles.statusText}>loading...</p>;
  if (error) return <p style={styles.statusText}>error: {error}</p>;
  if (reviews.length === 0) return <p style={styles.statusText}>no review yet</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>hotels review</h2>
      <div style={styles.grid}>
        {sections.map((sectionReviews, index) => (
          <div key={index} style={styles.card}>
            {sectionReviews.length === 0 && (
              <p style={styles.emptyMessage}>all review</p>
            )}
            {sectionReviews.map((review) => (
              <div key={review.id} style={styles.reviewItem}>
                <p style={styles.userLine}>
                  <strong>{review.user}</strong> -{" "}
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
                <p style={styles.rating}>⭐ {review.rating} / 5</p>
                <p style={styles.comment}>{review.comment}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "linear-gradient(110deg, #f7f7fa 60%, #cab0aa 100%)",

    padding: "40px 20px",
    fontFamily: "Segoe UI, Tahoma, sans-serif",
    backgroundColor: "D0E7ED",
  },
  title: {
    textAlign: "center",
    fontSize: "28px",
    marginBottom: "30px",
    color: "#333",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  },
  card: {
    flex: "1 1 300px",
    maxWidth: "32%",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    transition: "transform 0.2s",
  },
  sectionTitle: {
    fontSize: "18px",
    marginBottom: "15px",
    color: "#444",
  },
  reviewItem: {
    borderBottom: "1px solid #eee",
    paddingBottom: "12px",
    marginBottom: "12px",
  },
  userLine: {
    fontWeight: "500",
    marginBottom: "5px",
    color: "#555",
  },
  rating: {
    color: "#f59e0b", // amber
    marginBottom: "6px",
  },
  comment: {
    color: "#333",
    lineHeight: "1.5",
  },
  statusText: {
    textAlign: "center",
    padding: "50px 0",
    fontSize: "18px",
    color: "#555",
  },
  emptyMessage: {
    color: "#999",
    fontStyle: "italic",
  },
};
