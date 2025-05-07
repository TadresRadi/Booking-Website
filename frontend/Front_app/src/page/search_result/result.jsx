import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';

import styles  from "./result.module.css"
import HotelsCard from '../../components/hotel_card/hotels_card';
import { SearchInput } from '../../components/search_input/searchInput';
export  function SearchResult() {

  function valuetext(value) {
    return `${value}$`;
  }
  
  return (<>
     <SearchInput></SearchInput>
    <div className={styles.price_slider} >
    <TextField id="min" label="Min" variant="outlined" style={{width:'150px',height:'50px' }} />   
    <Box sx={{ width: 500 }} style={{ margin: 'auto', paddingTop: '0px' }}>
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
    <TextField id="max" label="Max" variant="outlined"  style={{width:'150px',height:'50px' }} />   
    </div>
    <div className={styles.bi}></div>
      <div className={styles.search_result_cards}>
      <HotelsCard></HotelsCard>
      <HotelsCard></HotelsCard>
      <HotelsCard></HotelsCard>
      <HotelsCard></HotelsCard>   
      </div>
    
    </>
  );

}
