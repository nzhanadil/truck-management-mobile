import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    alert: { isOpen: false, message: '', type: '' }
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setAlert: (state, action) => {
            state.alert = action.payload
        }
    }
})

export const {
    setIsLoading,
    setAlert
} = appSlice.actions
export default appSlice.reducer