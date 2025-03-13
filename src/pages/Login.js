import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/login", user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (error) {
      setError("Invalid email or password. Please try again."); 
      console.error("Login failed", error);
    }
  };

  const handleForgotPassword = () => {
    navigate("/signup"); 
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          {error && <div className="error-message">{error}</div>} 
          <button type="submit">Login</button>
        </form>
        <button className="forgot-password" onClick={handleForgotPassword}>Go to Signup</button> 
      </div>
    </div>
  );
}

export default Login;
