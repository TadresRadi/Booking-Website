import { createSlice } from "@reduxjs/toolkit";

<<<<<<< HEAD
const counterslice=createSlice({
=======


const counter=createSlice({
>>>>>>> origin/main
    name:'counter',
    initialState:{counter:0},
    reducers:{
       
<<<<<<< HEAD
       increasecounter:(state,action)=>{
=======
       inctrasecounter:(state)=>{
>>>>>>> origin/main
          state.counter++
        },
       dicreasecounter:(state)=>{
          state.counter--
        },
       
    }
})

export const { increasecounter,dicreasecounter}=counterslice.actions
export default counterslice.reducer