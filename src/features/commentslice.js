import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  commentsByPostId: {},
  loading: false,
  error: null,
};

// Fetch comments per post
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId, { getState, rejectWithValue }) => {
    const token = getState().user.user.token;
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/comments/${postId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return { postId, comments: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create comment
export const createComment = createAsyncThunk(
  'comments/createComment',
  async (commentData, { getState, rejectWithValue }) => {
    const token = getState().user.user.token;
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/comments/', commentData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return response.data; // The backend returns the full comment object
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        const { postId, comments } = action.payload;
        state.commentsByPostId[postId] = comments;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        const comment = action.payload;
        const postId = comment.post;

        if (state.commentsByPostId[postId]) {
          state.commentsByPostId[postId].push(comment);
        } else {
          state.commentsByPostId[postId] = [comment];
        }
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default commentSlice.reducer;
