import "./login.css";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div className="login-page">
      <div className="form">
        <h1 className="brand-name">Social monks</h1>
        <form>
          <div className="input-div">
            <input
              class="input-line"
              type="text"
              id="input-md"
              placeholder="Email,Phone,Username"
              required
            />
            <input
              class="input-line"
              type="password"
              id="input-md"
              placeholder="Password"
              required
            />
          </div>
          <button className="btn">Log In </button>
        </form>
      </div>

      <div className="signup-div">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};
