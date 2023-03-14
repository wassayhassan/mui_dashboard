import { configureStore } from "@reduxjs/toolkit";
import modeReducer from "state/modeSlice";
import  userSlice  from "state/userSlice";
const store = configureStore({
    reducer: {
        userState: userSlice,
        global: modeReducer,

    }
})
export default store; 