import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import postReducer from './postslices'; 

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts:postReducer
  },
});
