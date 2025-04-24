// src/redux/slices/feedSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch posts
export const fetchFeed = createAsyncThunk(
  'feed/fetchFeed',
  async (_, { getState }) => {
    const token = getState().user.user.token;
    const response = await axios.get('http://127.0.0.1:8000/api/feed/', {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default feedSlice.reducer;
