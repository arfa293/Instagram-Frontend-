// src/components/FollowButton.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {togglefollow} from '../features/followslices';
const FollowButton = ({ targetUsername }) => {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.follow.statusMap[targetUsername]);
    const loading = useSelector((state) => state.follow.loadingMap[targetUsername]);
  
    const handleClick = () => {
      dispatch(togglefollow(targetUsername));
    };
  
    return (
      <button
        onClick={handleClick}
        disabled={loading}
        className={`px-4 py-2 rounded ${
          status === 'followed' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
        }`}
      >
        {loading ? 'Loading...' : status === 'followed' ? 'Unfollow' : 'Follow'}
      </button>
    );
  };
  
export default FollowButton;
