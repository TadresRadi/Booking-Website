import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import styles from "./result.module.css";
import HotelsCard from '../../components/hotel_card/hotels_card';
import { FilterSide } from '../../components/filter_side/FilterSide';
import { useHotel } from '../../context/HotelContext.jsx';
import { useState } from 'react';

export function SearchResult() {
  const { hotels } = useHotel();

  // Extract all prices from hotel rooms
  const prices = hotels
    .flatMap(hotel => hotel.rooms?.map(room => room.price_per_night) || [])
    .filter(price => typeof price === 'number');

  const globalMin = prices.length > 0 ? Math.min(...prices) : 0;
  const globalMax = prices.length > 0 ? Math.max(...prices) : 1000;

  const [minLimit, setMinLimit] = useState(globalMin);
  const [maxLimit, setMaxLimit] = useState(globalMax);
  const [selectedRange, setSelectedRange] = useState([globalMin, globalMax]);

  // Handle min price input change
  const handleMinInputChange = (event) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && value <= selectedRange[1]) {
      setMinLimit(value);
      setSelectedRange([value, selectedRange[1]]);
    }
  };

  // Handle max price input change
  const handleMaxInputChange = (event) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && value >= selectedRange[0]) {
      setMaxLimit(value);
      setSelectedRange([selectedRange[0], value]);
    }
  };

  // Handle slider movement
  const handleSliderChange = (event, newValue) => {
    setSelectedRange(newValue);
    setMinLimit(newValue[0]);
    setMaxLimit(newValue[1]);
  };

  // Filter hotels based on any room’s price falling in range
  const filteredHotels = hotels.filter(hotel =>
    hotel.rooms?.some(room =>
      room.price_per_night >= selectedRange[0] &&
      room.price_per_night <= selectedRange[1]
    )
  );

  return (
    <>
      {/* Price Filter Controls */}
      <div className={styles.price_slider}>
        <TextField
          id="min"
          label="Min Price $"
          variant="outlined"
          type="number"
          value={minLimit}
          onChange={handleMinInputChange}
          style={{ width: '150px', height: '50px' }}
        />

        <Box sx={{ width: 700 }} style={{ margin: 'auto' }}>
          <Slider
            value={selectedRange}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            step={10}
            marks
            min={globalMin}
            max={globalMax}
          />
        </Box>

        <TextField
          id="max"
          label="Max Price $"
          variant="outlined"
          type="number"
          value={maxLimit}
          onChange={handleMaxInputChange}
          style={{ width: '150px', height: '50px' }}
        />
      </div>

      {/* Hotel Cards */}
      <div className={`d-flex ${styles.page_container}`}>
        <div className={`d-none d-lg-block d-md-block ${styles.fliter_container}`}>
          <FilterSide />
        </div>

        <div className={`col-11 col-sm-12 col-md-12 col-lg-8 m-1 m-lg-4 ${styles.search_result_cards}`}>
          {filteredHotels.length > 0 ? (
            filteredHotels.map((hotel) => (
              <HotelsCard hotel={hotel} key={hotel.id}  />
            ))
          ) : (
            <div className={styles.no_result}>No Result Found</div>
          )}
        </div>
      </div>
    </>
  );
}
