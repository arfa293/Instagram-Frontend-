import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logoutUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import UpdateBio from "./updatebio";
import UpdateUsername from "./updateusername";
import UpdateProfilePicForm from "./updateprofilepic";
import FollowButton from '../components/follow';
import { fetchFollowers } from "../features/followerlistslice";
import { fetchFollowing } from "../features/followingslistlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const updatedBio = useSelector((state) => state.update.bio);
  const updatename = useSelector((state) => state.updateUsername?.username);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showUpdateBio, setShowUpdateBio] = useState(false);
  const [showUpdateUsername, setShowUpdateUsername] = useState(false);
  const [showUpdatePic, setShowUpdatePic] = useState(false);
  const [otherUsers, setOtherUsers] = useState([]);
  const {following} =useSelector( (state)=>state.following);

  // State to hold followers
  const { followers, loading, error } = useSelector((state) => state.followers);

  // Fetch the profile
  const fetchProfile = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/profile/", {
        headers: {
          Authorization: `Token ${user.token}`,
        },
      });
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error.response?.data || error.message);
      setProfile(null);
    }
  };

  // Fetch posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/posts/", {
        headers: {
          Authorization: `Token ${user.token}`,
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error.response?.data || error.message);
      setPosts([]);
    }
  };

  // Fetch other users
  const fetchOtherUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/other-users/", {
        headers: {
          Authorization: `Token ${user.token}`,
        },
      });
      setOtherUsers(response.data);
    } catch (error) {
      console.error("Error fetching other users:", error.response?.data || error.message);
    }
  };

  // Fetch followers when the component mounts
  useEffect(() => {
    if (!user || !user.token) return;
    fetchProfile();
    fetchPosts();
    fetchOtherUsers();
    dispatch(fetchFollowers(user.token)); 
    dispatch(fetchFollowing());
  }, [user, dispatch]);

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/delete-post/${postId}/`, {
        headers: {
          Authorization: `Token ${user.token}`,
        },
      });
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error.response?.data || error.message);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const Navigatetocreatepost = () => {
    navigate("/createpost");
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleProfileUpdateComplete = () => {
    fetchProfile();
  };

  if (!user) {
    return <p>Please log in</p>;
  }

  return (
    <div className="text-center mt-5">
      <img
        src={profile?.profile_picture ? `${profile.profile_picture}?t=${new Date().getTime()}` : "defaultProfilePic.jpg"}
        alt="Profile"
        className="rounded-circle mb-3"
        style={{ width: "200px", height: "200px", objectFit: "cover" }}
      />

      <h3>{updatename || profile?.username}</h3>
      <p>{updatedBio || profile?.bio || "No bio yet."}</p>

      <div className="d-flex justify-content-center flex-wrap">
        <button onClick={() => setShowUpdateBio((prev) => !prev)} className="btn btn-outline-success mb-3 me-2">
          {showUpdateBio ? "Cancel" : "Update Bio"}
        </button>
        <button onClick={() => setShowUpdateUsername((prev) => !prev)} className="btn btn-outline-warning mb-3 me-2">
          {showUpdateUsername ? "Cancel" : "Update Username"}
        </button>
        <button onClick={() => setShowUpdatePic((prev) => !prev)} className="btn btn-outline-info mb-3 me-2">
          {showUpdatePic ? "Cancel" : "Update Profile Pic"}
        </button>
        <button onClick={Navigatetocreatepost} className="btn btn-outline-primary mb-3 me-2">
          Create Post
        </button>
        <button onClick={handleLogout} className="btn btn-outline-danger mb-3">
          Logout
        </button>
      </div>

      {showUpdateBio && <UpdateBio currentBio={profile?.bio} onUpdateComplete={handleProfileUpdateComplete} />}
      {showUpdateUsername && <UpdateUsername onUpdateComplete={handleProfileUpdateComplete} />}
      {showUpdatePic && <UpdateProfilePicForm onUploadComplete={handleProfileUpdateComplete} />}

      {/* Followers Section */}
      <h3 className="mt-5">Followers</h3>
      {loading ? (
        <div>Loading followers...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <ul>
          {followers.length > 0 ? (
            followers.map((follower, index) => (
              <li key={index}>{follower}</li>
            ))
          ) : (
            <p>No followers yet.</p>
          )}
        </ul>
      )}
      
      {/* Following Section */}
     <h3 className="mt-5">Following</h3>
     <ul>
     {following.length > 0 ? (
      following.map((followedUser, index) => (
       <li key={index}>{followedUser}</li>
    ))
  ) : (
    <p>You are not following anyone yet.</p>
  )}
</ul>

      {/* Posts Section */}
      <h3 className="mt-5">My Posts</h3>
      <div className="posts-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", padding: "20px" }}>
        {posts.map((post) => (
          <div key={post.id} className="post-card" style={{ border: "1px solid #ccc", padding: "8px", borderRadius: "10px", textAlign: "center" }}>
            <p>{post.caption}</p>
            {post.image_url && (
              <img
                src={post.image_url}
                alt={post.caption}
                style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px", cursor: "pointer" }}
                onClick={() => handleImageClick(post.image_url)}
              />
            )}
            <p className="mt-2">{new Date(post.created_at).toLocaleString()}</p>
            <button className="btn btn-sm btn-danger mt-2" onClick={() => handleDelete(post.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal-overlay" style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }} onClick={closeModal}>
          <img src={selectedImage} alt="Selected" style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "8px" }} />
        </div>
      )}

      {/* Other Users Section */}
      <h3 className="mt-5">Other Users</h3>
      <div className="d-flex flex-wrap justify-content-center" style={{ gap: "20px", padding: "20px" }}>
        {otherUsers.map((otherUser) => (
          <div key={otherUser.id} style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "10px", textAlign: "center", width: "200px" }}>
            <img src={otherUser.profile_picture || "defaultProfilePic.jpg"} alt={otherUser.username} style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", marginBottom: "8px" }} />
            <h5>{otherUser.username}</h5>
            <p>{otherUser.bio || "No bio available"}</p>
            <FollowButton targetUsername={otherUser.username} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
