import { createSlice } from '@reduxjs/toolkit';

const getUserCartKey = (userId) => `cart_${userId}`;

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
    },
    reducers: {
        loadCartFromStorage(state, action) {
            const userId = action.payload;
            if (userId) {
                const savedCart =
                    JSON.parse(localStorage.getItem(getUserCartKey(userId))) ||
                    [];
                state.items = savedCart;
                state.totalQuantity = savedCart.reduce(
                    (total, item) => total + item.quantity,
                    0,
                );
            }
        },
        addToCart(state, action) {
            const { userId, item } = action.payload;
            const existingItem = state.items.find((i) => i.id === item.id);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                state.items.push(item);
            }
            state.totalQuantity += item.quantity;
            if (userId) {
                localStorage.setItem(
                    getUserCartKey(userId),
                    JSON.stringify(state.items),
                );
            }
        },
        updateItemQuantity(state, action) {
            const { userId, itemId, quantity } = action.payload;
            const item = state.items.find((i) => i.id === itemId);
            if (item) {
                item.quantity = quantity;
            }
            state.totalQuantity = state.items.reduce(
                (total, i) => total + i.quantity,
                0,
            );
            if (userId) {
                localStorage.setItem(
                    getUserCartKey(userId),
                    JSON.stringify(state.items),
                );
            }
        },
        removeFromCart(state, action) {
            const { userId, itemId } = action.payload;
            state.items = state.items.filter((item) => item.id !== itemId);
            state.totalQuantity = state.items.reduce(
                (total, item) => total + item.quantity,
                0,
            );
            if (userId) {
                localStorage.setItem(
                    getUserCartKey(userId),
                    JSON.stringify(state.items),
                );
            }
        },
        clearCart(state, action) {
            const userId = action.payload;
            state.items = [];
            state.totalQuantity = 0;
            if (userId) {
                localStorage.removeItem(getUserCartKey(userId));
            }
        },
    },
});

export const {
    loadCartFromStorage,
    addToCart,
    updateItemQuantity,
    removeFromCart,
    clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
