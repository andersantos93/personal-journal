import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar({ isOpen, onClose }) {
  const [user] = useState({
    name: "Jane Melwin",
    email: "janemelvin@gmail.com",
    avatar: "https://i.pravatar.cc/100?img=5"
  });
  
  // Prevent body scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`} 
        onClick={onClose}
      ></div>
      
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
        </div>
        
        <div className="user-profile">
          <div className="avatar">
            <img src={user.avatar} alt={user.name} />
          </div>
          <div className="user-info">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/" onClick={onClose}>
                <span className="icon">🏠</span>
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard" onClick={onClose}>
                <span className="icon">⚡</span>
                <span>Journal stats</span>
              </Link>
            </li>
            <li>
              <Link to="/profile" onClick={onClose}>
                <span className="icon">📅</span>
                <span>Calendar</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <button className="sign-out" onClick={() => alert("Sign out functionality would go here")}>
            <span className="icon">↪</span>
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </>
  );
}
