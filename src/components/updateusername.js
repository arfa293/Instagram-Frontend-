import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUsername } from "../features/updateusernameslice";

const UpdateUsername = () => {
  const dispatch = useDispatch();
  const { username, loading, error } = useSelector((state) => state.updateUsername);

  const [newUsername, setNewUsername] = useState("");

  useEffect(() => {
    if (username !== undefined && username !== null) {
      setNewUsername(username);
    }
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newUsername.trim()) {
      dispatch(updateUsername(newUsername));
    }
  };

  return (
    <div className="container mt-4">
    <div className="row justify-content-center">
     <div className="col-md-3 col-lg-4">
    <form onSubmit={handleSubmit}>
      <input
        className="form-control mb-2"
        placeholder="Enter new username"
        value={newUsername || ""}
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Username"}
      </button>
     
      {error && <p style={{ color: 'red' }}>
      {typeof error === 'string' ? error : error.error || 'Something went wrong'}
      </p>}

      {username && <p className="text-success">Username updated to: {username}</p>}
    </form>
    </div>
    </div>
    </div>
  );
};

export default UpdateUsername;
