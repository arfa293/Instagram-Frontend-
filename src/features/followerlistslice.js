// src/features/followers/followersSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state for the followers
const initialState = {
  followers: [],
  loading: false,
  error: null,
};

// Define an async thunk for fetching followers
export const fetchFollowers = createAsyncThunk(
    'followers/fetchFollowers',
    async (_, { getState, rejectWithValue }) => {
      try {
        const token = getState().user.user.token; // Retrieve token from the state
        console.log('Token:', token); // Log the token to ensure it's being retrieved correctly
  
        const response = await axios.get(
          'http://localhost:8000/api/followers/', // Assuming this is the correct API endpoint for fetching followers
          {
            headers: { Authorization: `Token ${token}` }, // Pass token in the header
          }
        );
  
        return response.data ; // Return the list of followers from the response
      } catch (error) {
        console.error('Fetch Followers Error:', error); // Log the error to understand what went wrong
        return rejectWithValue(error.response?.data || error.message); // Return error if failed
      }
    }
  );
// Create the slice
const followersSlice = createSlice({
  name: 'followers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        state.loading = false;
        state.followers = action.payload; // Set followers to the response data
      })
      .addCase(fetchFollowers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Capture error if the fetch fails
      });
  },
});

// Export the followers slice reducer
export default followersSlice.reducer;
