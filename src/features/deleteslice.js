import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for deleting a post
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId, { rejectWithValue, getState }) => {
    try {
      const token = getState().user.user.token; // Get token from the Redux state
      const response = await axios.delete(
        `http://localhost:8000/api/delete-post/${postId}/`,  // API endpoint to delete post
        {
          headers: {
            Authorization: `Token ${token}`,  // Authorization header with token
          },
        }
      );
      return postId;  // Return the postId to be used in the fulfilled case
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

const deleteSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],  // Store posts
    loading: false,  // Tracks loading state during delete operation
    error: null,  // Holds any error during the delete request
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Case for pending action (delete request is in progress)
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Case for successful delete (postId is returned)
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post.id !== action.payload);  // Remove the deleted post
      })
      // Case for failed delete request
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete post';
      });
  },
});

export default deleteSlice.reducer;  // Export the reducer to be added to the store
