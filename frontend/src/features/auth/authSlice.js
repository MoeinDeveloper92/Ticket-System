import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const user = JSON.parse(localStorage.getItem("user"))
const initialState = {
    user: user ? user : null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

//create Register user  
export const register = createAsyncThunk("auth/register", async (user, thunkAPI) => {
    try {
        console.log(user)
    } catch (error) {

    }
})


//create Login user
export const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
    try {
        console.log(userData)
    } catch (error) {

    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => { }
})


export default authSlice.reducer