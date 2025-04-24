import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PublicProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/${username}/`);
        setProfile(response.data);
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };

    fetchProfile();
  }, [username]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="text-center mt-5">
      <img
        src={profile.profile_picture}
        alt={profile.username}
        style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover" }}
      />
      <h2>{profile.username}</h2>
      <p>{profile.bio || "No bio available."}</p>
    </div>
  );
};

export default PublicProfile;
