import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock, FaBell, FaGlobe, FaSignOutAlt, FaPalette, FaGift, FaKey } from "react-icons/fa";
import "./Profile.css";

function Profile({ closeProfile }) {
  const [user, setUser] = useState({ fullName: "", email: "", profilePic: "" });
  const [selectedImage, setSelectedImage] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    closeProfile(); 
    navigate("/login");
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); 
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("profilePic", file);
      formData.append("email", user.email);

      try {
        const { data } = await axios.post("http://localhost:5000/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (data.url) {
          const updatedUser = { ...user, profilePic: `http://localhost:5000${data.url}` };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      } catch (error) {
        console.error("Image upload failed", error);
      }
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-header">
        <label htmlFor="profilePic">
          <img
            src={selectedImage || user.profilePic || "default-avatar.png"} 
            alt="Profile"
            className="profile-pic"
          />
        </label>
        <input type="file" id="profilePic" accept="image/*" onChange={handleImageChange} hidden />
        <div>
          <h3>{user.fullName}</h3>
          <p>{user.email}</p>
        </div>
      </div>

      <ul className="profile-options">
        <li><FaUser /> Account settings</li>
        <li><FaLock /> Security</li>
        <li><FaGlobe /> Change language</li>
        <li><FaBell /> Notifications</li>
        <li><FaPalette /> Change theme</li>
        <li><FaGift /> Refer friends</li>
        <li><FaKey /> Privacy policy</li>
      </ul>

      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}

export default Profile;
