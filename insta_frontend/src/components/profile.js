import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { logoutUser } from "../redux/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!user || !user.token) return;

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

    fetchProfile();
    fetchPosts();
  }, [user]);

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

  if (!user) {
    return <p>Please log in</p>;
  }

  return (
    <div className="text-center mt-5">
      <img
        src={profile?.profile_picture || "defaultProfilePic.jpg"}
        alt="Profile"
        className="rounded-circle mb-3"
        style={{ width: "200px", height: "200px", objectFit: "cover" }}
      />
      <h3>{profile?.username}</h3>
      <p>{profile?.bio || "No bio yet."}</p>

      <button onClick={Navigatetocreatepost} className="btn btn-outline-danger mt-3 me-2">
        Create Post
      </button>
      <button onClick={handleLogout} className="btn btn-outline-danger mt-3">
        Logout
      </button>

      <h3 className="mt-5">My Posts</h3>
      <div
        className="posts-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          padding: "20px",
        }}
      >
        {posts.map((post) => (
          <div
            key={post.id}
            className="post-card"
            style={{
              border: "1px solid #ccc",
              padding: "8px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <p>{post.caption}</p>
            {post.image_url && (
              <img
                src={post.image_url}
                alt={post.caption}
                style={{
                  width: "100%",
                  height: "200px", 
                  objectFit: "cover", 
                  borderRadius: "8px",
                  cursor: "pointer", 
                }}
                onClick={() => handleImageClick(post.image_url)} 
              />
            )}
            <p className="mt-2">{new Date(post.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>

      
      {selectedImage && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={closeModal} 
        >
          <img
            src={selectedImage}
            alt="Selected"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "8px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
