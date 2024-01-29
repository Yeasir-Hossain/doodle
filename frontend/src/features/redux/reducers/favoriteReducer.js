import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        loading: false,
        favorites: []
    },
    reducers: {
        insertFavorite: (state, action) => {
            state.favorites = [...state.favorites, ...action.payload];
        },
        deleteFavorite: (state, action) => {
            const idToDelete = action.payload;
            state.favorites = state.favorites.filter((id) => id !== idToDelete);
        },
    }
});

export const { insertFavorite, deleteFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
