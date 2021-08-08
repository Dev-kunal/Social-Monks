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
import Loader from "react-loader-spinner";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mesg, setMesg] = useState("");
  const [userData, setUserData] = useState({
    username: "raj",
    password: "raj",
  });
  const { status } = useSelector((state) => state.loggedInUserInfo);
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
      setMesg(message);
    } else {
      setUserData({
        username: "",
        password: "",
      });
      setupAuthHeaderForServiceCalls(token);
      saveUserToLocalStorage(user, token);
      navigate("/");
    }
  };

  return (
    <div className="login-page">
      {status === "loading" && (
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
      <div className="form">
        <h1 className="brand-name">Social monks</h1>
        <form onSubmit={(event) => submitForm(event)}>
          <div className="input-div">
            <input
              onChange={(event) => onType(event)}
              class="input-line"
              type="text"
              name="username"
              placeholder="Username"
              required
            />
            <input
              onChange={(event) => onType(event)}
              class="input-line"
              type="password"
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
