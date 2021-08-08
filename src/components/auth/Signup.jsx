import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "./userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Loader from "react-loader-spinner";

export const Signup = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
    fullname: "",
  });
  const [mesg, setMesg] = useState({
    success: false,
    mesg: "",
  });
  const { signupStatus } = useSelector((state) => state.loggedInUserInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onType = (event) => {
    const { name, value } = event.target;
    setUserData((data) => ({
      ...data,
      [name]: value,
    }));
  };
  const submitForm = async (event) => {
    event.preventDefault();
    let result = await dispatch(signupUser(userData));
    if (!result.payload.success) {
      setMesg({ success: false, mesg: result.payload.message });
    } else {
      setUserData({
        username: "",
        fullname: "",
        email: "",
        password: "",
      });
      setMesg({ success: true, mesg: result.payload.message });
      // navigate("/login");
    }
  };

  return (
    <div className="login-page">
      {signupStatus === "loading" && (
        <div className="loader-container">
          <Loader
            type="Oval"
            color="#2bc48a"
            height={60}
            width={60}
            timeout={3000}
          />
        </div>
      )}
      <div className="form" onSubmit={(event) => submitForm(event)}>
        <h1 className="brand-name">Social monks</h1>
        <form>
          <div className="input-div">
            <input
              className="input-line"
              type="email"
              placeholder="Email"
              name="email"
              onChange={(event) => onType(event)}
              value={userData.email}
              required
            />
            <input
              className="input-line"
              type="text"
              placeholder="FullName"
              name="fullname"
              onChange={(event) => onType(event)}
              value={userData.fullname}
              required
            />
            <input
              className="input-line"
              type="text"
              placeholder="Username"
              name="username"
              onChange={(event) => onType(event)}
              value={userData.username}
              required
            />
            <input
              className="input-line"
              type="password"
              placeholder="Password"
              name="password"
              onChange={(event) => onType(event)}
              value={userData.password}
              required
            />
          </div>
          <button className="btn">Sign Up</button>
        </form>
        <div className={mesg.success ? "success-mesg" : "err-mesg"}>
          {mesg.mesg}
        </div>
      </div>
      <div className="signup-div">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
};
