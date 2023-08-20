import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import ticketServicer from "./ticketService"


const initialState = {
    tickets: [],
    ticket: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
}

//Create New ticket
export const createTicket = createAsyncThunk("ticket/create", async (ticketData, thunkAPI) => {
    try {
        //we need to access the protected route
        const token = thunkAPI.getState().auth.user.token
        return ticketServicer.createTicket(ticketData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


//fetch user's tickets

export const getTickets = createAsyncThunk("ticket/getAll", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return ticketServicer.getTickets(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


//Get Single Ticket
export const getTicket = createAsyncThunk("ticket/get", async (ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return ticketServicer.getTicket(ticketId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


//Close Ticket
export const closeTicket = createAsyncThunk("ticket/close", async (ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return ticketServicer.closeTicket(ticketId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})




export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTicket.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getTickets.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTickets.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tickets = action.payload
            })
            .addCase(getTickets.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getTicket.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTicket.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.ticket = action.payload
            })
            .addCase(getTicket.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(closeTicket.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.tickets.map((ticket) => ticket.id === action.payload._id ? (ticket.status = "closed") : ticket)
            })
    }
})

export const { reset } = ticketSlice.actions
export default ticketSlice.reducer