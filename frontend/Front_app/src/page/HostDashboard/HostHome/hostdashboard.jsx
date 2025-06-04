import React from "react";
import styles from "./hostdashboard.module.css";
import { Link } from "react-router-dom";

export default function HostDashboard() {
  return (
    <div className={styles.dashboardRoot}>
     
      <header className={styles.header}>
        <nav>
          <Link to="/host-dashboard">Dashboard</Link>
          <Link to="/host-properties" >Properties</Link>
          <Link to="/host-booking">Bookings</Link>
          <Link to="/reviews">Reviews</Link>
        
        </nav>



         
        <div className={styles.avatar}></div>
      </header>

     
      <main className={styles.mainArea}>
        
        <section className={styles.welcomeAndStats}>
          <div>
            <h2>Welcome, Mai!</h2>
            <p>Here’s a quick overview of your hosting activity 👋</p>
          </div>
          <div className={styles.statsBar}>
            <StatCard label="Properties" value={4} icon="🏠" />
            <StatCard label="Bookings" value={12} icon="📅" />
            <StatCard label="Revenue" value="700 EGP" icon="💰" />
            <StatCard label="Reviews" value={21} icon="⭐" />
          </div>
        </section>

        {/* Progress & Time Tracker */}
        <section className={styles.progressSection}>
          <ProgressCard
            label="Occupancy Rate"
            percent={68}
            details="This week"
          />
          <TimeTrackerCard
            time="04:15"
            label="Average Booking Duration"
          />
          <OnboardingCard completed={2} total={5} tasks={[
            { label: "Confirm Booking", done: true },
            { label: "Reply to Guest", done: false },
            { label: "Update Listing", done: false },
            { label: "Review Feedback", done: true },
            { label: "Sync Calendar", done: false }
          ]}/>
        </section>

        {/* Calendar & Quick Info */}
        <section className={styles.bottomSection}>
          <CalendarCard bookings={[
            { date: "2024-09-15", label: "Guest: Sarah" },
            { date: "2024-09-18", label: "Maintenance" },
          ]}/>
          <QuickInfoCard
            device="MacBook Air"
            earnings="1,200"
            summary="You have 3 new reviews!"
          />
        </section>
      </main>
    </div>
  );
}


function StatCard({ label, value, icon }) {
  return (
    <div className={styles.statCard}>
      <span className={styles.statIcon}>{icon}</span>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}


function ProgressCard({ label, percent, details }) {
  return (
    <div className={styles.progressCard}>
      <div>{label}</div>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${percent}%` }} />
      </div>
      <div className={styles.progressDetails}>{percent}% - {details}</div>
    </div>
  );
}


function TimeTrackerCard({ time, label }) {
  return (
    <div className={styles.timeTrackerCard}>
      <div className={styles.timeCircle}>{time}</div>
      <div>{label}</div>
    </div>
  );
}


function OnboardingCard({ completed, total, tasks }) {
  return (
    <div className={styles.onboardingCard}>
      <div>
        <strong>{completed}/{total}</strong> Tasks Completed
      </div>
      <ul>
        {tasks.map((t, i) =>
          <li key={i} className={t.done ? styles.taskDone : ""}>
            <span>{t.label}</span>
            {t.done && <span>✔️</span>}
          </li>
        )}
      </ul>
    </div>
  );
}


function CalendarCard({ bookings }) {
  return (
    <div className={styles.calendarCard}>
      <strong>Upcoming</strong>
      <ul>
        {bookings.map((b, i) =>
          <li key={i}>{b.date} - {b.label}</li>
        )}
      </ul>
    </div>
  );
}


function QuickInfoCard({ device, earnings, summary }) {
  return (
    <div className={styles.quickInfoCard}>
      <div>Device: {device}</div>
      <div>Earnings: {earnings} EGP</div>
      <div>{summary}</div>
    </div>
  );
}