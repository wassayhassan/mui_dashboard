import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import UserService from "services/UserService";
let user = JSON.parse(localStorage.getItem("user"));

export const login = createAsyncThunk('user/login', async(userData, thunkAPI)=> {
    try{
     let data = await UserService.login(userData);
        return data.data;
    }catch(err){
        console.log(err);
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
         return  thunkAPI.rejectWithValue(message);
    }
})


const initialState = {
    user: user? user: null,
    logged_in: user? true: false,
    loading: false,
    errorMessage: ""
}
export const userSlice = createSlice({
    name: "userState",
    initialState,
    reducers: {
        logout: (state)=> {
            state.user= null;
            state.logged_in = false;
            state.errorMessage = "";
            state.loading = false;
            localStorage.removeItem("user");
        }
    },
    extraReducers: (builder)=> {
        builder
        .addCase(login.fulfilled, (state, action)=> {
            console.log(action)
            localStorage.setItem("user",JSON.stringify(action.payload));
            state.user = action.payload;
            state.logged_in = true;
            state.loading = false;
            state.errorMessage = ""
        })
        .addCase(login.pending, (state, action)=> {
            state.loading = true;
        })
        .addCase(login.rejected, (state, action)=> {
            console.log(action)
            state.user = null;
            state.logged_in = false;
            state.loading = false;
            state.errorMessage = action.payload;
        })
    }

})
export const {logout} = userSlice.actions;
export default userSlice.reducer;