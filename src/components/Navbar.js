import { useState } from "react";
import { FaUser } from "react-icons/fa";
import Profile from "../pages/Profile";
import "./Navbar.css";

export default function Navbar() {
  const [showProfile, setShowProfile] = useState(false);

  const closeProfile = () => setShowProfile(false); 

  return (
    <>
      <nav className="navbar">
        <button className="profile-btn" onClick={() => setShowProfile(true)}>
          <FaUser />
        </button>
      </nav>

      {showProfile && (
        <div className="profile-overlay">
          <div className="profile-modal">
            <button className="close-btn" onClick={closeProfile}>
              ✖
            </button>
            <Profile closeProfile={closeProfile} /> 
          </div>
        </div>
      )}
    </>
  );
}
