
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { FaMapMarkerAlt } from 'react-icons/fa';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const LocationCard = ({ hotel }) => {
  if (!hotel) return <p>Loading location...</p>;

  const { hotel_name, city, country, latitude, longitude } = hotel;

  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);

  const locationText = `${city}, ${country}`;

  if (isNaN(lat) || isNaN(lng)) {
    return (
      <div className="border rounded-lg p-4 text-center shadow-md bg-white">
        <p className="text-red-600 font-semibold">Location data not available.</p>
        <p className="text-gray-500 text-sm mt-1">Check if latitude and longitude are set for this hotel.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 text-center shadow-md bg-white ">
      <div className="rounded-full overflow-hidden mx-auto" style={{ width: '256px', height: '160px' }}>
        <MapContainer
          center={[lat, lng]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: '160px', width: '256px' }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lng]}>
            <Popup>{hotel_name}</Popup>
          </Marker>
        </MapContainer>
      </div>
      <p className="mt-2 text-cyan-700 text-lg font-semibold">
        <span role="img" aria-label="location">
            <FaMapMarkerAlt style={{ color: 'red', fontSize: '10px' }} /> 
            </span> {locationText}
      </p>
    </div>
  );
};

export default LocationCard;