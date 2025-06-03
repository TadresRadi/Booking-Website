import React, { useEffect, useState } from "react";
import { useHotel } from "../../context/HotelContext";
import axios from "axios";
import styles from "./edithotelstepper.module.css";
import { Button, Card, Form } from "react-bootstrap";

export default function EditCombinedStepper() {
  const { hotelId, roomId } = useHotel();

  const [hotelData, setHotelData] = useState({
    hotel_name: "",
    description: "",
    star_rating: "",
    facilities: [],
  });

  const [roomData, setRoomData] = useState({
    room_name: "",
    price_per_night: "",
    capacity: "",
    room_animations: [],
  });

  const [facilityList, setFacilityList] = useState([]);
  const [animationList, setAnimationList] = useState([]);
  const [hotelFiles, setHotelFiles] = useState([]);
  const [roomFiles, setRoomFiles] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/facilities/").then((res) => {
      setFacilityList(res.data);
    });
    axios.get("http://localhost:8000/api/room-animations/").then((res) => {
      setAnimationList(res.data);
    });
  }, []);

  useEffect(() => {
    if (hotelId) {
      axios.get(`http://localhost:8000/api/hotels/${hotelId}/`).then((res) => {
        setHotelData({
          hotel_name: res.data.hotel_name,
          description: res.data.description,
          star_rating: res.data.star_rating,
          facilities: res.data.facilities || [],
        });
      });
    }
  }, [hotelId]);

  useEffect(() => {
    if (roomId) {
      axios.get(`http://localhost:8000/api/rooms/${roomId}/`).then((res) => {
        setRoomData({
          room_name: res.data.room_name,
          price_per_night: res.data.price_per_night,
          capacity: res.data.capacity,
          room_animations: res.data.room_animations || [],
        });
      });
    }
  }, [roomId]);

  const handleSaveAll = async () => {
    try {
      await axios.put(`http://localhost:8000/api/hotels/${hotelId}/`, hotelData);
      await axios.put(`http://localhost:8000/api/rooms/${roomId}/`, roomData);

      const hotelFormData = new FormData();
      hotelFormData.append("hotel", hotelId);
      hotelFiles.forEach((file) => hotelFormData.append("images", file));
      await axios.post(`http://localhost:8000/api/AddHotelImages/`, hotelFormData);

      const roomFormData = new FormData();
      roomFormData.append("room", roomId);
      roomFiles.forEach((file) => roomFormData.append("images", file));
      await axios.post(`http://localhost:8000/api/AddRoomImages/`, roomFormData);

      window.cuteAlert({
        type: "success",
        title: "Saved",
        message: "Everything updated successfully!",
        buttonText: "Done",
      });
    } catch (error) {
      console.error("Error updating:", error);
      window.cuteAlert({
        type: "error",
        title: "Failed",
        message: "Something went wrong.",
        buttonText: "OK",
      });
    }
  };

  if (!hotelId || !roomId) {
    return (
      <div className={styles.editPage}>
        <Card className={styles.editCard}>
          <Card.Body>
            <h4>Please select a hotel and room to edit.</h4>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.editPage}>
      <Card className={styles.editCard}>
        <Card.Body>
          <h4 className="mb-3">Edit Hotel Info</h4>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              placeholder="Hotel Name"
              value={hotelData.hotel_name}
              onChange={(e) => setHotelData({ ...hotelData, hotel_name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              as="textarea"
              placeholder="Description"
              value={hotelData.description}
              onChange={(e) => setHotelData({ ...hotelData, description: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              type="number"
              placeholder="Star Rating"
              value={hotelData.star_rating}
              onChange={(e) => setHotelData({ ...hotelData, star_rating: e.target.value })}
            />
          </Form.Group>

          <h4 className="mb-2">Hotel Facilities</h4>
          <Form.Group className="mb-4">
            {facilityList.map((facility) => (
              <Form.Check
                key={facility.id}
                type="checkbox"
                label={facility.name}
                checked={hotelData.facilities.includes(facility.id)}
                onChange={(e) => {
                  const updated = e.target.checked
                    ? [...hotelData.facilities, facility.id]
                    : hotelData.facilities.filter((id) => id !== facility.id);
                  setHotelData({ ...hotelData, facilities: updated });
                }}
              />
            ))}
          </Form.Group>

          <h4 className="mb-3">Edit Room Info</h4>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              placeholder="Room Name"
              value={roomData.room_name}
              onChange={(e) => setRoomData({ ...roomData, room_name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              type="number"
              placeholder="Price Per Night"
              value={roomData.price_per_night}
              onChange={(e) => setRoomData({ ...roomData, price_per_night: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              type="number"
              placeholder="Capacity"
              value={roomData.capacity}
              onChange={(e) => setRoomData({ ...roomData, capacity: e.target.value })}
            />
          </Form.Group>

          <h4 className="mb-2">Room Features</h4>
          <Form.Group className="mb-4">
            {animationList.map((anim) => (
              <Form.Check
                key={anim.id}
                type="checkbox"
                label={anim.name}
                checked={roomData.room_animations.includes(anim.id)}
                onChange={(e) => {
                  const updated = e.target.checked
                    ? [...roomData.room_animations, anim.id]
                    : roomData.room_animations.filter((id) => id !== anim.id);
                  setRoomData({ ...roomData, room_animations: updated });
                }}
              />
            ))}
          </Form.Group>

          <h4 className="mb-3">Upload Hotel Images</h4>
          <Form.Group className="mb-4">
            <Form.Control type="file" multiple onChange={(e) => setHotelFiles([...e.target.files])} />
          </Form.Group>

          <h4 className="mb-3">Upload Room Images</h4>
          <Form.Group className="mb-4">
            <Form.Control type="file" multiple onChange={(e) => setRoomFiles([...e.target.files])} />
          </Form.Group>

          <Button className={styles.btnSuccess} onClick={handleSaveAll}>
            Save All Changes
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}