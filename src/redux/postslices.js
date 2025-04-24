// postSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create the async thunk for the API call
export const createPost = createAsyncThunk(
  'posts/createPost',
  async ({ caption, image }, { getState, rejectWithValue }) => {
    try {
      const {
        user: { user},
      } = getState();

      const formData = new FormData();
      formData.append('caption', caption);
      formData.append('image', image);

      const config = {
        headers: {
          'Authorization': `Token ${user.token}`,
        },
      };

      const { data } = await axios.post('http://127.0.0.1:8000/api/create-post/', formData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || error.message);
    }
  }
);

// Create the slice
const postSlice = createSlice({
  name: 'posts',
  initialState: {
    post: null,
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.post = action.payload;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;
