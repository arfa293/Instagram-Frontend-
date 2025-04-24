// src/components/FollowersList.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFollowers } from '../features/followers/followersSlice';

const FollowersList = () => {
  const dispatch = useDispatch();
  const { followers, loading, error } = useSelector((state) => state.followers);

  useEffect(() => {
    // Replace 'your_token_here' with the token from your auth system
    const token = localStorage.getItem('auth_token'); 
    if (token) {
      dispatch(fetchFollowers(token));
    }
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Followers</h2>
      <ul>
        {followers.map((follower, index) => (
          <li key={index}>{follower}</li>
        ))}
      </ul>
    </div>
  );
};

export default FollowersList;
