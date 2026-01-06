import {createSlice} from "@reduxjs/toolkit"

const initialState ={
    status:false,
    blogData:null,
    loading: true
}

const blogSlice=createSlice({
    name:"blog",
    initialState,
    reducers:{
        addblog:(state,action)=>{
            state.status=true,
            state.blogData=action,
            state.loading=false
        }
    }
})

export const {addblog} =blogSlice.actions
export default blogSlice.reducer