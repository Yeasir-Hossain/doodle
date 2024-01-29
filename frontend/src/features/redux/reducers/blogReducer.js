import { createSlice } from '@reduxjs/toolkit'

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: {
        loading: false,
        singleBlog: {},
        blogs: []
    },
    reducers: {
        setValue: (state, action) => {
            state[action.payload.target] = action.payload.value;
        },
        createBlog: (state, action) => {
            state.blogs = [...state.blogs, action.payload];
        },
        updateBlog: (state, action) => {
            state.blogs = state.blogs.map((b) => b.id === action.payload.id ? { ...b, ...action.payload } : b);
            state.singleBlog = action.payload;
        },
        deleteBlog: (state, action) => {
            state.blogs = state.blogs.filter((d) => d.id !== action.payload);
        },
    }
});

export const { setValue, createBlog, updateBlog, deleteBlog } = blogsSlice.actions;
export default blogsSlice.reducer;