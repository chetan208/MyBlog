import { configureStore } from "@reduxjs/toolkit";  
import authReducer from "./authslice";
import blogReducer from "./blogslice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        blog:blogReducer
    }
});

export default store;