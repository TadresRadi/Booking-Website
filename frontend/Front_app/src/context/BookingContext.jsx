import { useContext, createContext, useState } from "react";

const BookingContext = createContext();

export  const useBooking = () => {

    return useContext(BookingContext);
}

export  const BookingProvider = ({ children }) => {
    const [bookingDetails, setBookingDetails] = useState({});
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [nights, setNights] = useState(0);
    const [roomId, setRoomId] = useState(null);
    const [numberofRooms, setNumberOfRooms] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    return (
        <BookingContext.Provider value={{ bookingDetails, setBookingDetails, checkIn, setCheckIn, checkOut, setCheckOut, nights, setNights, roomId, setRoomId, numberofRooms, setNumberOfRooms , totalPrice, setTotalPrice }}>
            {children}
        </BookingContext.Provider>
    );

}

export default BookingContext;
