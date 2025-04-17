import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const updateBio = createAsyncThunk(
  'update/updateBio',
  async (bio, { rejectWithValue, getState }) => {

    try {
      const token = getState().user.user.token; 
      console.log('here', getState().user.user.token)
      const response = await axios.put(
        'http://localhost:8000/api/update-bio/',  
        { bio },  
        {
          headers: {
            Authorization: `Token ${token}`, 
          },
        }
      );
      return response.data.bio; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

// Slice to handle bio updates
const updateSlice = createSlice({
  name: 'update',
  initialState: {
    bio: '',
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateBio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBio.fulfilled, (state, action) => {
        state.loading = false;
        state.bio = action.payload;
      })
      .addCase(updateBio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update bio';
      });
  },
});

export default updateSlice.reducer;
