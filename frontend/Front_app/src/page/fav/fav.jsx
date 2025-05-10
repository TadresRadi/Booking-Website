import { useDispatch, useSelector } from "react-redux";
import { ImBin } from "react-icons/im";
import { removeFavorite } from "../../store/slice/fav";
import style from "./fav.module.css";

export function Fav() {
  const favoriteHotels = useSelector((state) => state.favorites.favoritehotel);
  const dispatch = useDispatch();

  function removeHotel(hotel) {
    dispatch(removeFavorite(hotel));
  }

  return (
    <div>
      <h1>Your Favorite Hotels</h1>

      {favoriteHotels.length > 0 ? (
        favoriteHotels.map((hotel) => (
          <div key={hotel.id} className={style.icon_div}>
            <ImBin 
              className={style.icona} 
              onClick={() => removeHotel(hotel)} 
            />
            <img 
              src={hotel.imageUrl || "https://via.placeholder.com/150"} 
              alt={hotel.title || "Hotel image"} 
            />
            <h2>{hotel.title}</h2>
            <h3>Popularity: {hotel.popularity || "N/A"}</h3>
          </div>
        ))
      ) : (
        <p>No favorite hotels yet.</p>
      )}
    </div>
  );
}
