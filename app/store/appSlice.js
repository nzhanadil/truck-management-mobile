import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        }
    }
})

export const {
    setIsLoading
} = appSlice.actions
export default appSlice.reducer