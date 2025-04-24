import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/userSlice';

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirm_password: '',  
    bio: '',
    profile_picture: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profile_picture') {
      setFormData({ ...formData, profile_picture: files[0] }); 
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      alert('Passwords do not match');
      return;
    }

    const data = new FormData();
    data.append('email', formData.email);
    data.append('username', formData.username);
    data.append('password', formData.password);
    data.append('confirm_password', formData.confirm_password);
    if (formData.bio) data.append('bio', formData.bio);
    if (formData.profile_picture) data.append('profile_picture', formData.profile_picture);

    dispatch(registerUser(data));
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h2 className="text-center mb-4">Register Account</h2>
        <form onSubmit={handleSubmit} className="needs-validation" encType="multipart/form-data">
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <textarea
              name="bio"
              placeholder="Bio (optional)"
              value={formData.bio}
              onChange={handleChange}
              className="form-control"
              rows="3"
            />
          </div>

          <div className="form-group">
            <input
              type="file"
              name="profile_picture"
              accept="image/*"
              onChange={handleChange}
              className="form-control-file"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
          {error && (
           <div className="text-danger mt-2">
           {error.message ? error.message : error.error ? error.error : error }
          </div>
        )}
        {user && <p className="text-success mt-2">Registered Successfully!</p>}

      </div>
    </div>
  );
};

export default Register;
