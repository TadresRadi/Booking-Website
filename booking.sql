-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Properties Table
CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    host_id INTEGER REFERENCES users(id),
    title VARCHAR(255),
    description TEXT,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rooms Table
CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    property_id INTEGER REFERENCES properties(id),
    room_type VARCHAR(100),
    description TEXT,
    beds INTEGER,
    quantity_available INTEGER,
    is_available BOOLEAN DEFAULT TRUE,
    available_from DATE,
    room_size BIGINT,
    price BIGINT
);

-- Facilities Table
CREATE TABLE facilities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT
);

-- Property Facilities (Many-to-Many)
CREATE TABLE property_facilities (
    property_id INTEGER REFERENCES properties(id),
    facility_id INTEGER REFERENCES facilities(id),
    PRIMARY KEY (property_id, facility_id)
);

-- Room Facilities (Many-to-Many)
CREATE TABLE room_facilities (
    room_id INTEGER REFERENCES rooms(id),
    facility_id INTEGER REFERENCES facilities(id),
    PRIMARY KEY (room_id, facility_id)
);

-- Bookings Table
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    property_id INTEGER REFERENCES properties(id),
    check_in DATE,
    check_out DATE,
    guests INTEGER,
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments Table
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES bookings(id),
    amount DECIMAL(10, 2),
    payment_method VARCHAR(50),
    payment_date TIMESTAMP,
    status VARCHAR(50),
    tax INTEGER
);

-- Reviews Table
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    property_id INTEGER REFERENCES properties(id),
    rating INTEGER,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Messages Table
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id),
    receiver_id INTEGER REFERENCES users(id),
    message TEXT,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wishlists Table
CREATE TABLE wishlists (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    property_id INTEGER REFERENCES properties(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Property Images Table
CREATE TABLE property_images (
    id SERIAL PRIMARY KEY,
    property_id INTEGER REFERENCES properties(id),
    image_url VARCHAR(255)
);

-- Activity Logs Table
CREATE TABLE activity_logs (
    log_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    status VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    action VARCHAR(255) NOT NULL,
    date TIMESTAMP NOT NULL
);
