import { useContext, createContext, useState } from "react";

const HotelContext = createContext();
export const useHotel = () => {
    return useContext(HotelContext);
}

export  const HotelProvider = ({ children }) => {
    const [hotels, setHotels] = useState([]);
    const [hotelId, setHotelId] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const [selectedHotel, setSelectedHotel] = useState(null);

    return (

        <HotelContext.Provider value={{ hotels, setHotels, hotelId, setHotelId ,roomId, setRoomId , selectedHotel,  setSelectedHotel 
        }}>
            {children}
        </HotelContext.Provider>
    );

}
