import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateprofilepic } from "../features/updateprofilepicslice"; 

const UpdateProfilePicForm = ({ onUploadComplete }) => {  
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.updateProfile);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("profile_pic", file);
    dispatch(updateprofilepic(formData));  
    onUploadComplete();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const preview = URL.createObjectURL(selectedFile);
      setPreviewUrl(preview);
    }
  };

  return (
    <div className="container mt-4">
       <div className="row justify-content-center">
        <div className="col-md-3 col-lg-4">
    <form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm bg-light">
         <div className="mb-3">
        <label htmlFor="profilePicInput" className="form-label fw-bold">Select Profile Picture</label>
        <input
          id="profilePicInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="form-control"
        />
         </div>
        
      {previewUrl && (
        <div className="mb-3 text-center">
          <p className="fw-semibold">Preview:</p>
          <img
            src={previewUrl}
            alt="Selected Preview"
            className="rounded-circle border"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </div>
      )}

      <div className="d-grid">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    

      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </form>
    </div>
       </div>
      </div>
  );
};

export default UpdateProfilePicForm;
