import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  following: [],
  loading: false,
  error: null,
};


export const fetchFollowing = createAsyncThunk(
  'following/fetchFollowing',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.user.token;
      console.log('Token:', token);

      const response = await axios.get(
        'http://localhost:8000/api/following/', 
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      return response.data.following;
    } catch (error) {
      console.error('Fetch Following Error:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const followingSlice = createSlice({
  name: 'following',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFollowing.fulfilled, (state, action) => {
        state.loading = false;
        state.following = action.payload;
      })
      .addCase(fetchFollowing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default followingSlice.reducer;
