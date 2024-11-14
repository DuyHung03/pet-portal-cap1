import { createSlice } from '@reduxjs/toolkit';

const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        search: '',
    },
    reducers: {
        setSearchQuery: (state, action) => {
            const { payload } = action;
            state.search = payload;
        },
    },
});

export const { setSearchQuery } = shopSlice.actions;
export default shopSlice.reducer;
