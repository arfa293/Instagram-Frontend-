import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import postReducer from './postslices'; 
import updateReducer from '../features/updatebioslice';
import updateUsernameReducer from '../features/updateusernameslice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts:postReducer,
    updateBio:updateReducer,
    updateUsername: updateUsernameReducer 
   
  },
});
