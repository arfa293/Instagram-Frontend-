import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; 

export const togglefollow = createAsyncThunk(
  'follow/toggleFollow',
  async (targetUsername, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.user.token;
      console.log('Token:', token); // Check if the token is correctly retrieved
      console.log('Target Username:', targetUsername); // Check the username being passed
      const response = await axios.post(
        `http://localhost:8000/api/follow/${targetUsername}/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log('Follow Response:', response.data); // Check the response from the API
      return { username: targetUsername, status: response.data.status };
    } catch (error) {
      console.error('Follow Error:', error); // More detailed error logging
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const followslice = createSlice({
  name: 'follow',
  initialState: {
    statusMap: {},
    loadingMap: {},
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(togglefollow.pending, (state, action) => {
        const username = action.meta.arg; // username is passed as the argument
        state.loadingMap[username] = true;
        state.error = null;
      })
      .addCase(togglefollow.fulfilled, (state, action) => {
        const { username, status } = action.payload;
        state.statusMap[username] = status;
        state.loadingMap[username] = false;
      })
      .addCase(togglefollow.rejected, (state, action) => {
        const username = action.meta.arg;
        state.loadingMap[username] = false;
        state.error = action.payload;
      });
  },
});

export default followslice.reducer;
