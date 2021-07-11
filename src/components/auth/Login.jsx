import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginUser } from "./userSlice";
import {
  saveUserToLocalStorage,
  setupAuthHeaderForServiceCalls,
} from "../utils";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mesg, setMesg] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const onType = (event) => {
    const { name, value } = event.target;
    setUserData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const { status, error } = useSelector((state) => state.loggedInUserInfo);
  const submitForm = async (event) => {
    event.preventDefault();
    let result = await dispatch(loginUser(userData));
    if (!result.payload.success) {
      console.log(result.payload);
      setMesg(result.payload.message);
    } else {
      setUserData({
        username: "",
        password: "",
      });
      setupAuthHeaderForServiceCalls(result.payload.token);
      saveUserToLocalStorage(result.payload.user, result.payload.token);
      console.log(result.payload.token);
      navigate("/");
    }
  };

  return (
    <div className="login-page">
      <div className="form">
        <h1 className="brand-name">Social monks</h1>
        <form onSubmit={(event) => submitForm(event)}>
          <div className="input-div">
            <input
              onChange={(event) => onType(event)}
              class="input-line"
              type="text"
              id="input-md"
              name="username"
              placeholder="Username"
              required
            />
            <input
              onChange={(event) => onType(event)}
              class="input-line"
              type="password"
              id="input-md"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <button className="btn" type="submit">
            Log In{" "}
          </button>
        </form>
      </div>
      <div className="err-mesg">{mesg}</div>
      <div className="signup-div">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};
