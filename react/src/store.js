import { configureStore } from "@reduxjs/toolkit";
import loginSlice from './slice/loginSlice'
import cartSlice from './slice/cartSlice'
const store = configureStore({
    reducer: {
        loginSlice : loginSlice,
        cartSlice: cartSlice
    }
})

export default store;