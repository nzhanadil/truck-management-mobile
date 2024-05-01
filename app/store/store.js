import { configureStore } from "@reduxjs/toolkit";

import usersReducer from './usersSlice'
import trucksReducer from "./trucksSlice";
import appReducer from './appSlice'

export const store = configureStore({
    reducer: {
        users: usersReducer,
        trucks: trucksReducer,
        app: appReducer
    }
})