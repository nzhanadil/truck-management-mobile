import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    alert: { isOpen: false, message: '', type: '' },
    dialog: { isOpen: false, message: '', alertMessage: '', handleConfirm: () => {}, data: null, navigateBack: false },
    unassignDialog: { isOpen: false, id: '', type: '' },
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
        },
        setDialog: (state, action) => {
            state.dialog = action.payload
        },
        setUnassignDialog: (state, action) => {
            state.unassignDialog = action.payload
        }
    }
})

export const {
    setIsLoading,
    setAlert,
    setDialog,
    setUnassignDialog,
} = appSlice.actions
export default appSlice.reducer