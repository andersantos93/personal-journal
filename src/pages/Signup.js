import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "../styles/login.css";

function Signup() {
  const [user, setUser] = useState({ fullName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.fullName || !user.email || !user.password) {
      alert("Please fill in all the fields.");
      return;
    }

    try {
      setError(null);
      setLoading(true);
      await axios.post("http://localhost:5000/signup", user);
      setAlert(
        "Registration complete! You will be redirected to the login page in 5 seconds."
      );
      setLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      setLoading(false);
      if (error.status === 400) {
        setError("User already exists, please enter another email.");
      } else {
        setError("Error to complete registration, please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="mb-5">Signup</h2>
        <form
          onSubmit={handleSubmit}
          className="row justify-content-center m-3"
        >
          <div className="col-md-8">
            <label htmlFor="fullName" className="form-label">
              Full name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              className="form-control"
              placeholder="Enter your full name"
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="col-md-8">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="col-md-8">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="col-12 col-md-8 mt-2 btn btn-primary"
            >
              Signup
            </button>
          </div>
        </form>
        {loading && (
          <div className="d-flex justify-content-center">
            <span className="message">Loading...</span>
          </div>
        )}
        {error && (
          <div className="d-flex justify-content-center">
            <span className="message">{error}</span>
          </div>
        )}
        {alert && (
          <div className="d-flex justify-content-center col-12 p-2 alert text-white">
            <span>{alert}</span>
          </div>
        )}
        <p className="signup text-center" onClick={() => navigate("/login")}>
          Go to Login
        </p>
      </div>
    </div>
  );
}

export default Signup;
