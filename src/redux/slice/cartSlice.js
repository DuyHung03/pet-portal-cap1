import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: JSON.parse(localStorage.getItem('cart')) || [],
        totalQuantity: 0,
    },
    reducers: {
        updateCartFromLocalStorage(state, action) {
            state.items = action.payload;
            state.totalQuantity = action.payload.reduce(
                (total, item) => total + item.quantity,
                0,
            );
        },
        addToCart(state, action) {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id,
            );
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
            state.totalQuantity += action.payload.quantity;
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        updateItemQuantity(state, action) {
            const { itemId, quantity } = action.payload;
            const item = state.items.find((item) => item.id === itemId);
            if (item) {
                item.quantity = quantity;
            }
            state.totalQuantity = state.items.reduce(
                (total, item) => total + item.quantity,
                0,
            );
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        removeFromCart(state, action) {
            const itemId = action.payload;
            const updatedItems = state.items.filter(
                (item) => item.id !== itemId,
            );
            state.items = updatedItems;
            state.totalQuantity = updatedItems.reduce(
                (total, item) => total + item.quantity,
                0,
            );
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            localStorage.removeItem('cart');
        },
    },
});

export const {
    addToCart,
    updateCartFromLocalStorage,
    updateItemQuantity,
    removeFromCart,
    clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
