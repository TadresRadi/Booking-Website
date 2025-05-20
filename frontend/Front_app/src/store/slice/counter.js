import { createSlice } from "@reduxjs/toolkit";

const counterslice=createSlice({
    name:'counter',
    initialState:{counter:0},
    reducers:{
       
       increasecounter:(state,action)=>{
          state.counter++
        },
       dicreasecounter:(state,action)=>{
          state.counter--
        },
       
    }
})

export const { increasecounter,dicreasecounter}=counterslice.actions
export default counterslice.reducer