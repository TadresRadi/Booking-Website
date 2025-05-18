const LocationCard = ({ hotel }) => {
  if (!hotel) return <p>Loading location...</p>;

  const { hotel_name, city, country, latitude, longitude } = hotel;

  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);

  const locationText = `${city}, ${country}`;

  if (isNaN(lat) || isNaN(lng)) {
    return (
      <div className="border rounded-lg p-4 text-center shadow-md bg-white">
        <p className="text-red-600 font-semibold">📍 Location data not available.</p>
        <p className="text-gray-500 text-sm mt-1">Check if latitude and longitude are set for this hotel.</p>
      </div>
    );
  }

  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=300x200&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=YOUR_REAL_API_KEY`;

  return (
    <div className="border rounded-lg p-4 text-center shadow-md bg-white">
      <img
        src={staticMapUrl}
        alt={`${hotel_name} location`}
        className="rounded-full w-64 h-40 object-cover mx-auto"
      />
      <p className="mt-2 text-cyan-700 text-lg font-semibold">
        <span role="img" aria-label="location">📍</span> {locationText}
      </p>
    </div>
  );
};

export default LocationCard;
