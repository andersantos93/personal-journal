import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import HeaderComponent from "../components/HeaderComponent";

import "../styles/profile.css";

function Profile() {
  const [user, setUser] = useState({ fullName: "", email: "", profilePic: "" });
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
    navigate("/login");
  };

  return (
    <>
      {user && (
        <>
          <HeaderComponent page="/" header="Profile" />
          <div className="d-flex w-100 justify-content-center">
            <div className="card" style={{ width: "18rem" }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/59/User-avatar.svg"
                className="card-img-top align-self-center mt-4"
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
