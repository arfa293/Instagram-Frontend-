import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { logoutUser } from "./redux/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

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
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  if (!user) {
    return <p>Please log in...</p>;
  }

  return (
    <div className="container">
      <nav className="navbar navbar-light bg-light">
        <h2 className="navbar-brand">MySocialApp</h2>
        <div className="d-flex align-items-center">
        <button
      onClick={() => navigate("/profile")}
      className="btn btn-outline-primary mr-2"
     >
      Profile
      </button> 


          <div>
          {profile? <span>{profile.username}</span>:null}
          </div>
          {/* Profile Image */}
          <img
            src={
              profile?.profile_picture
                ? profile.profile_picture
                : "defaultProfilePic.jpg"
            }
            alt="Profile"
            className="rounded-circle"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
          />
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="btn btn-outline-danger ml-2"
          >
            Logout
          </button>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="d-flex justify-content-center mt-4">
        <div className="card" style={{ width: "18rem" }}>
          <img
            src="https://via.placeholder.com/150"
            className="card-img-top"
            alt=""
          />
          <div className="card-body">
            <h5 className="card-title">Followed Post</h5>
            <p className="card-text">Some description of the post...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
