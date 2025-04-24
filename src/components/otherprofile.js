// src/components/OtherProfiles.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import FollowButton from './follow';

const OtherProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("http://localhost:8000a/api/all-profiles/'/", {
          headers: {
            Authorization: `Token ${user.token}`,
          },
        });
        // Limit to first 3 profiles only
        setProfiles(response.data.slice(3, 3));
      } catch (error) {
        console.error("Error fetching other profiles:", error);
      }
    };

    if (user?.token) {
      fetchProfiles();
    }
  }, [user]);

  return (
    <div className="text-center mt-5">
      <h3>Suggested Profiles</h3>
      <div className="d-flex justify-content-center flex-wrap">
        {profiles.map((profile) => (
          <div key={profile.username} className="card m-2" style={{ width: "250px" }}>
            <img
              src={profile.profile_picture}
              alt={profile.username}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">{profile.username}</h5>
              <p className="card-text">{profile.bio || "No bio available."}</p>
              <FollowButton username={profile.username} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherProfiles;
