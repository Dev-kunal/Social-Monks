import { useState } from "react";
import "./search.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchedUsers } from "./searchSlice";
import { MobileNav } from "../navbar/MobileNav";
import { useNavigate } from "react-router";
export const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [mesg, setMesg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, searchedUsers, error } = useSelector(
    (state) => state.searchedUsers
  );

  const handleInputChange = (value) => {
    setInputValue(value);
  };
  useEffect(() => {
    return () => {
      setInputValue("");
      setMesg("");
    };
  }, []);
  const getUsers = async () => {
    const {
      payload: { users, success },
    } = await dispatch(getSearchedUsers(inputValue));
    if (users.length < 1) {
      setMesg("Searched user not found");
    } else {
      setMesg("");
    }
  };

  return (
    <div className="search-page">
      {" "}
      <div className="search-div">
        <h3> Find user</h3>
        <div className="search-holder">
          <input
            className="input-line search-box"
            type="text"
            placeholder="username"
            value={inputValue}
            name="inputValue"
            onChange={(event) => handleInputChange(event.target.value)}
            required
          />
          <button
            className="post-action-btn search-btn"
            type="button"
            onClick={getUsers}
          >
            <svg
              aria-label="Search &amp; Explore"
              class="_8-yf5 "
              fill="#262626"
              height="20"
              viewBox="0 0 60 60"
              width="20"
            >
              <path d="M20 40C9 40 0 31 0 20S9 0 20 0s20 9 20 20-9 20-20 20zm0-37C10.6 3 3 10.6 3 20s7.6 17 17 17 17-7.6 17-17S29.4 3 20 3z"></path>
              <path d="M46.6 48.1c-.4 0-.8-.1-1.1-.4L32 34.2c-.6-.6-.6-1.5 0-2.1s1.5-.6 2.1 0l13.5 13.5c.6.6.6 1.5 0 2.1-.2.3-.6.4-1 .4z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="user-list">
        <div style={{ margin: "0 auto", textAlign: "center" }}>
          {/* {searchedUsers.length < 1 && "User not found with searched username"} */}
          {mesg}
        </div>
        <ul class="list">
          {searchedUsers.map(({ _id, username, fullname, profileUrl }) => (
            <li
              className="list-item"
              onClick={() =>
                navigate("/profile", {
                  state: {
                    userId: _id,
                  },
                })
              }
            >
              <div>
                <img className="avatar-xs" src={profileUrl} />
              </div>
              <div style={{ marginLeft: "0.4rem" }}>
                {" "}
                {username}
                <br />
                <small>{fullname}</small>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <MobileNav />
    </div>
  );
};
