import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import "../styles/login.css";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setLoading(true);
      const { data } = await axios.post("http://localhost:5000/login", user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="mb-5">Login or Signup</h2>
        <form onSubmit={handleSubmit} className="row m-3">
          <div className="col-md-6">
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
          <div className="col-md-6">
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
            <button type="submit" className="col-12 mt-2 btn btn-primary">
              Login
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
        <p className="signup text-center" onClick={() => navigate("/signup")}>
          Go to Signup
        </p>
      </div>
    </div>
  );
}

export default Login;
