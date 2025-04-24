import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFollowing } from '../features/followingslistlice';

const Following = () => {
  const dispatch = useDispatch();

  // Access state from Redux
  const { following, loading, error } = useSelector((state) => state.following);

  // Fetch following on component mount
  useEffect(() => {
    dispatch(fetchFollowing());
  }, [dispatch]);

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Following</h2>

      {loading && <p className="text-blue-500 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && following.length === 0 && (
        <p className="text-gray-500 text-center">You are not following anyone yet.</p>
      )}

      {!loading && !error && following.length > 0 && (
        <ul className="space-y-2">
          {following.map((username, index) => (
            <li
              key={index}
              className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              {username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Following;
