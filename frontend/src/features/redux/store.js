import { configureStore } from "@reduxjs/toolkit";
import blogsSlice from "./reducers/blogReducer"
import commentsSlice from "./reducers/commentReducer"
import favoritesSlice from "./reducers/favoriteReducer"

export default configureStore({
    reducer: {
        blogStore: blogsSlice,
        commentStore: commentsSlice,
        favoriteStore: favoritesSlice
    }
});