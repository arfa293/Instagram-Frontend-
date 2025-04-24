import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBio } from '../features/updatebioslice';

const UpdateBio = ({ currentBio }) => {
  const dispatch = useDispatch();
  const { loading, error, bio } = useSelector((state) => state.update);
  const [newBio, setNewBio] = useState(currentBio || '');

  useEffect(() => {
    setNewBio(currentBio || ''); 
  }, [currentBio]);

  useEffect(() => {
    if (bio) {
      setNewBio(bio);
    }
  }, [bio]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBio(newBio));
  };
  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Update Bio</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          value={newBio}
          onChange={(e) => setNewBio(e.target.value)}
          style={{ width: '100%', marginBottom: 10 }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Bio'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {bio && !loading && <p style={{ color: 'green' }}>Updated Bio: {bio}</p>}
    </div>
  );
};

export default UpdateBio;
