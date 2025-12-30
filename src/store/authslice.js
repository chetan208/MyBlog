import {createSlice} from "@reduxjs/toolkit"

const initialState ={
    status:false,
    userName:"",
    userData:null
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
       login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
            state.userName= action.payload.name;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.userName="";
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;