import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import HeaderComponent from "../components/HeaderComponent";

import axios from "axios";
import avatar from "../assets/avatar.png";
import "../styles/profile.css";

function Profile() {
  const [user, setUser] = useState({ fullName: "", email: "", profilePic: "" });
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleImageClick = () => {
    fileInputRef.current.click();
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
        const { data } = await axios.post(
          "http://localhost:5000/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (data.url) {
          const updatedUser = {
            ...user,
            profilePic: `${data.url}`,
          };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      } catch (error) {
        console.error("Image upload failed", error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {user && (
        <>
          <HeaderComponent page="/" header="Profile" />
          <div className="d-flex w-100 justify-content-center">
            <div className="card" style={{ width: "18rem" }}>
              <input
                type="file"
                id="profilePic"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                hidden
              />
              <img
                src={selectedImage || user.profilePic || avatar}
                className="card-img-top align-self-center mt-4"
                onClick={handleImageClick}
                alt="Profile"
              />
              <div className="card-body text-center">
                <div className="d-block">
                  <span>{user.fullName}</span>
                </div>
                <div className="d-block">
                  <span>{user.email}</span>
                </div>
                <div className="d-block">
                  <p
                    className="text-center mt-2"
                    onClick={() => handleLogout()}
                  >
                    Sign out
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
