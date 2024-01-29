import { createSlice } from '@reduxjs/toolkit'

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        loading: false,
        comments: []
    },
    reducers: {
        setValue: (state, action) => {
            state[action.payload.target] = action.payload.value;
        },
        createComment: (state, action) => {
            state.comments = [...state.comments, action.payload];
        },
        updateComment: (state, action) => {
            state.comments = state.comments.map((c) => c.id === action.payload.id ? { ...c, ...action.payload } : c);
        },
        deleteComment: (state, action) => {
            state.comments = state.comments.filter((c) => c.id !== action.payload);
        },
    }
});

export const { setValue, createComment, updateComment, deleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;