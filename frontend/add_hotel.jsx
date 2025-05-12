import React from 'react';
import backgroundImage from '../../assets/images/natural.jpg'; 

const AddHotelForm = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {/* Glash Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1,
        }}
      ></div>

      <div className="container py-5" style={{ position: 'relative', zIndex: 2 }}>
        <div className="row justify-content-center">
          <div 
            className="col-md-10 col-lg-8 p-4 shadow"
            style={{
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(10px)',
              borderTop: '8px solid #78c4dd',
              backgroundColor: '#fff5f3',
              boxShadow: '0 20px 30px rgba(0, 0, 0, 0.1)',
              borderRadius: '20px'
            }}
          >
            <h3 className="text-center mb-4">Add Your Hotel</h3>

            {/* Hotel Name */}
            <div className="mb-3">
              <label className="form-label">Name your hotel</label>
              <input type="text" className="form-control" />
            </div>

            {/* Location */}
            <h5 className="mt-4">Where is your hotel location?</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Country/region</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Post code / ZIP code</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">City</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Street address</label>
                <input type="text" className="form-control" />
              </div>
            </div>

            {/* Check-in/out times */}
            <h5 className="mt-4">What are your check-in and check-out times?</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Check-in from</label>
                <input type="time" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Check-in until</label>
                <input type="time" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Check-out from</label>
                <input type="time" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Check-out until</label>
                <input type="time" className="form-control" />
              </div>
            </div>

            {/* Amenities */}
            <h5 className="mt-4">What can guests use at your hotel?</h5>
            <div className="row">
              {[
                'Restaurant', 'Room service', 'Sauna', 'Fitness Centre', 'Garden', 'Terrace', 'Non-smoking rooms',
                'Airport shuttle', 'Family rooms', 'Spa and wellness centre', 'Hot tub/Jacuzzi', 'Free WiFi',
                'Air conditioning', 'Water Park', 'Electric vehicle charging station', 'Swimming pool', 'Beach',
                'Electric Kettle', 'Tea/Coffee maker', 'Dining area', 'Microwave'
              ].map((item, index) => (
                <div className="col-6 col-md-4" key={index}>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id={`amenity-${index}`} />
                    <label className="form-check-label" htmlFor={`amenity-${index}`}>{item}</label>
                  </div>
                </div>
              ))}
            </div>

            {/* Breakfast */}
            <h5 className="mt-4">Do you serve guests breakfast?</h5>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="breakfast" id="yesBreakfast" />
              <label className="form-check-label" htmlFor="yesBreakfast">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="breakfast" id="noBreakfast" />
              <label className="form-check-label" htmlFor="noBreakfast">No</label>
            </div>

            {/* Parking */}
            <h5 className="mt-4">Is parking available to guests?</h5>
            {['Yes, free', 'Yes, paid', 'No'].map((option, i) => (
              <div className="form-check" key={i}>
                <input className="form-check-input" type="radio" name="parking" id={`parking${i}`} />
                <label className="form-check-label" htmlFor={`parking${i}`}>{option}</label>
              </div>
            ))}

            {/* Save Button */}
            <div className="text-end mt-4">
              <button
                className="btn"
                style={{
                  background: 'linear-gradient(135deg, #78c4dd, #78c4dd)',
                  color: 'white',
                  padding: '0.6rem 1.4rem',
                  borderRadius: '8px',
                  fontWeight: '500',
                  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.08)',
                  border: 'none',
                  transition: 'background-color 0.3s ease, transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#5d8b9b';
                  e.target.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '';
                  e.target.style.transform = '';
                }}
              >
                Save
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHotelForm;





