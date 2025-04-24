import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { logoutUser } from "./redux/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchFeed } from "./features/feedSlices";
import Comment from "./components/comment"; // Import the Comment component

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { posts, loading, error } = useSelector((state) => state.feed);

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user || !user.token) return;

    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/profile/", {
          headers: {
            Authorization: `Token ${user.token}`,
          },
        });

        if (response.data?.profile_picture) {
          setProfile(response.data);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error.message);
        setProfile(null);
      }
    };

    fetchProfile();
    dispatch(fetchFeed()); // Fetch feed on load
  }, [user, dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  if (!user) {
    return <p>Please log in...</p>;
  }

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar navbar-light bg-light d-flex justify-content-between px-3">
        <h2 className="navbar-brand">MySocialApp</h2>
        <div className="d-flex align-items-center">
          <button onClick={() => navigate("/profile")} className="btn btn-outline-primary mr-2">
            Profile
          </button>
          <span className="mr-2">{profile?.username}</span>
          <img
            src={profile?.profile_picture || "defaultProfilePic.jpg"}
            alt="Profile"
            className="rounded-circle"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
          />
          <button onClick={handleLogout} className="btn btn-outline-danger ml-2">
            Logout
          </button>
        </div>
      </nav>

      {/* Feed Section */}
      <div className="mt-4">
        <h3>Your Feed</h3>
        {loading && <p>Loading posts...</p>}
        {error && <p className="text-danger">Error: {error}</p>}

        {/* Center the cards */}
        <div className="d-flex justify-content-center">
          <div className="row">
            {posts.map((post) => (
              <div key={post.id} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-header d-flex align-items-center">
                    <img
                      src={`http://localhost:8000${post.author_profile_picture}`}  
                      alt="Profile"
                      className="rounded-circle"
                      style={{ width: "40px", height: "40px", objectFit: "cover", marginRight: "10px" }}
                    />
                    <strong>{post.author_name}</strong>
                  </div>
                  <img src={`http://localhost:8000${post.image}`} className="card-img-top" alt="Post" />
                  <div className="card-body">
                    <p className="card-text">{post.caption}</p>
                    {/* Add the Comment component for each post */}
                    <Comment postId={post.id} /> 
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
