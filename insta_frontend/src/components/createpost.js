import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../redux/postslices';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreatePost = () => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.posts || {});

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createPost({ caption, image }));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h3 className="text-center mb-4">📸 Create a Post</h3>

            {success && (
              <div className="alert alert-success" role="alert">
                ✅ Post created successfully!
              </div>
            )}

            {error && (
              <div className="alert alert-danger" role="alert">
                ❌ {error}
              </div>
            )}

            <form onSubmit={submitHandler} encType="multipart/form-data">
              <div className="mb-3">
                <label className="form-label">Caption</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Write something..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Upload Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Posting...' : 'Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
