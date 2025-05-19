import { createSlice } from "@reduxjs/toolkit";



const loaderslice=createSlice({
    name:'loader',
    initialState:{loader:true},
    reducers:{
       
    changeloader:(state,action)=>{
          state.loader=action.payload
        },

    
    }
})

export const {changeloader}=loaderslice.actions
export default loaderslice.reducer