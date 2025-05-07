import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import styles from "./result.module.css"
import HotelsCard from '../../components/hotel_card/hotels_card';
import { SearchInput } from '../../components/search_input/searchInput';
import { FilterSide } from '../../components/filter_side/FilterSide';
export function SearchResult() {

  function valuetext(value) {
    return `${value}$`;
  }

  return (<>
    {/* <SearchInput></SearchInput> */}

    {/* price slider */}
    <div className={`${styles.price_slider}`} >
      <TextField id="min" label="Min" variant="outlined" style={{ width: '150px', height: '50px' }} />
      <Box sx={{ width: 700 }} style={{ margin: 'auto', paddingTop: '0px' }}>
        <Slider
          aria-label="Temperature"
          defaultValue={30}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          shiftStep={30}
          step={10}
          marks
          min={10}
          max={110}
        />
      </Box>
      <TextField id="max" label="Max" variant="outlined" style={{ width: '150px', height: '50px' }} />
    </div>


    {/* main content  */}
    <div className={` d-flex ${styles.page_container}`}>

        {/* filter */}
        <div className={`d-none d-lg-block d-md-block ${styles.fliter_container}`}>
          <FilterSide></FilterSide>
        </div>

        {/* hotel cards  */}
        <div className={`col-12 col-sm-12 col-md-12 col-lg-8 m-1 m-lg-4  ${styles.search_result_cards}`}>
          <HotelsCard></HotelsCard>
          <HotelsCard></HotelsCard>
          <HotelsCard></HotelsCard>
          <HotelsCard></HotelsCard>
        </div>







      </div>

  


  </>
  );

}
