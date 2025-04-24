import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import postReducer from './postslices'; 
import updateReducer from '../features/updatebioslice';
import updateUsernameReducer from '../features/updateusernameslice';
import updateProfileReducer from '../features/updateprofilepicslice';
import followReducer from '../features/followslices';
import followersReducer from '../features/followerlistslice';
import followingReducer from '../features/followingslistlice';
import feedReducer from '../features/feedSlices';
import commentReducer from '../features/commentslice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts:postReducer,
    update:updateReducer,
    updateUsername: updateUsernameReducer,
    updateProfile: updateProfileReducer,
    follow:followReducer,
    followers:followersReducer,
    following:followingReducer,
    feed:feedReducer,
    comments: commentReducer,
  
  },
});