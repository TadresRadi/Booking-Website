import { createSlice } from "@reduxjs/toolkit";



const counter=createSlice({
    name:'counter',
    initialState:{counter:0},
    reducers:{
       
       inctrasecounter:(state)=>{
          state.counter++
        },
       dicreasecounter:(state)=>{
          state.counter--
        },
       
    }
})

export const {inctrasecounter,dicreasecounter}=counter.actions
export default counter.reducer