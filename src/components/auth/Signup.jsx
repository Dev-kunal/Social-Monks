import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "./userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

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
      console.log(result.payload);
      setMesg({ success: false, mesg: result.payload.message });
    } else {
      setMesg({ success: true, mesg: result.payload.message });
      setUserData({
        username: "",
        fullname: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="login-page">
      <div className="form" onSubmit={(event) => submitForm(event)}>
        <h1 className="brand-name">Social monks</h1>
        <form>
          <div className="input-div">
            <input
              className="input-line"
              type="email"
              id="input-md"
              placeholder="Email"
              name="email"
              onChange={(event) => onType(event)}
              required
            />
            <input
              className="input-line"
              type="text"
              id="input-md"
              placeholder="FullName"
              name="fullname"
              onChange={(event) => onType(event)}
              required
            />
            <input
              className="input-line"
              type="text"
              id="input-md"
              placeholder="Username"
              name="username"
              onChange={(event) => onType(event)}
              required
            />
            <input
              className="input-line"
              type="password"
              id="input-md"
              placeholder="Password"
              name="password"
              onChange={(event) => onType(event)}
              required
            />
          </div>
          <button className="btn">Sign Up </button>
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
