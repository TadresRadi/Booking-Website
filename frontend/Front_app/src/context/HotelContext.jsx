import { useContext, createContext, useState } from "react";

const HotelContext = createContext();
export const useHotel = () => {
    return useContext(HotelContext);
}

export  const HotelProvider = ({ children }) => {
    const [hotels, setHotels] = useState([]);

    return (

        <HotelContext.Provider value={{ hotels, setHotels }}>
            {children}
        </HotelContext.Provider>
    );

}
