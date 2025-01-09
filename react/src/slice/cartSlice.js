import {changeCart, getCartItems, removeFromCart} from "../api/cartApi"
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const getCartItemsAsync = createAsyncThunk('getCartItemsAsync', (memberId)=> {
    return getCartItems(memberId)
})
export const changeCartAsync = createAsyncThunk('changeCartAsync', (cartDTO) => {
    return changeCart(cartDTO)
})

export const removeFromCartAsync = createAsyncThunk('removeFromCartAsync', (cartDTO) => {
    return removeFromCart(cartDTO)
})

const initState = {
    items: [],
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed' 상태 관리
    error: null,
}
const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: initState,
    extraReducers: (builder) => {
        builder
        .addCase(getCartItemsAsync.fulfilled, (state, action) => {
            console.log("getCartItemsAsync fulfilled")
            state.items = action.payload
            state.status = 'succeeded'
        })
        .addCase(getCartItemsAsync.rejected, (state, action) => {
            console.error("Error fetching cart items:", action.error)
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(changeCartAsync.fulfilled, (state, action) => {
            console.log("changeCartAsync fulfilled")
            state.items = action.payload
            state.status = 'succeeded'
        })
        .addCase(changeCartAsync.rejected, (state, action) => {
            console.error("Error changing cart:", action.error)
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(removeFromCartAsync.fulfilled, (state, action) => {
            console.log("removeFromCartAsync fulfilled")
            state.items = action.payload
            state.status = 'succeeded'
        })
        .addCase(removeFromCartAsync.rejected, (state, action) => {
            console.error("Error removing cart item:", action.error)
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})

export default cartSlice.reducer