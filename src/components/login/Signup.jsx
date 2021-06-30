import "./login.css";
import { Link } from "react-router-dom";

export const Signup = () => {
  return (
    <div className="login-page">
      <div className="login">
        <h1 className="brand-name">Social monks</h1>
        <form>
          <div className="input-div">
            <input
              class="input"
              type="text"
              id="input-md"
              placeholder="Email or Phone"
              required
            />
            <input
              class="input"
              type="text"
              id="input-md"
              placeholder="FullName"
              required
            />
            <input
              class="input"
              type="text"
              id="input-md"
              placeholder="Username"
              required
            />
            <input
              class="input"
              type="password"
              id="input-md"
              placeholder="Password"
              required
            />
          </div>
          <button className="btn">Sign Up </button>
        </form>
      </div>

      <div className="signup-div">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
};
