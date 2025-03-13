import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import dashboardIcon from "../assets/icons/dashboard.png";
import signoutIcon from "../assets/icons/signout.png";
import profileIcon from "../assets/icons/user.png";

import "../styles/sidebar.css";
import avatar from "../assets/avatar.png";

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    avatar: avatar,
  });

  useEffect(() => {
    const userAuthenticated = JSON.parse(localStorage.getItem("user"));
    setUser({
      name: userAuthenticated.fullName,
      avatar:
        userAuthenticated.profilePic !== ""
          ? userAuthenticated.profilePic
          : avatar,
    });
  }, []);

  // Prevent body scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? "active" : ""}`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
        </div>

        {}
        <div className="user-profile">
          <div className="avatar">
            <img src={user.avatar} alt={user.name} />
          </div>
          <div className="user-info">
            <h3>{user.name}</h3>
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/profile" onClick={onClose}>
                <span className="icon">
                  <img src={profileIcon} alt="Profile icon" />
                </span>
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link to="/" onClick={onClose}>
                <span className="icon">
                  <img src={dashboardIcon} alt="Dashboard icon" />
                </span>
                <span>Dashboard</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button className="sign-out" onClick={() => handleLogout()}>
            <span className="icon">
              <img src={signoutIcon} alt="Sign out icon" />
            </span>
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </>
  );
}
