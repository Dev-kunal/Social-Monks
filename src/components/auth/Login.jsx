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
import axios from "axios";

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

  const submitForm = async (event) => {
    event.preventDefault();
    const {
      payload: { success, message, user, token },
    } = await dispatch(loginUser(userData));
    if (!success) {
      console.log(token, success);
      setMesg(message);
    } else {
      setUserData({
        username: "",
        password: "",
      });
      setupAuthHeaderForServiceCalls(token);
      saveUserToLocalStorage(user, token);
      console.log(token);
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
