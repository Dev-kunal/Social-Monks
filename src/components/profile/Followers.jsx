import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { MobileNav } from "../navbar/MobileNav";
import { getFollowers, resetFollowers } from "./profileSlice";
import Loader from "react-loader-spinner";

export const Followers = () => {
  const { followersStatus, followers, error, userInfo } = useSelector(
    (state) => state.userInfo
  );
  const { state } = useLocation();
  let {
    state: { userId },
  } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (followersStatus === "idle") {
      dispatch(getFollowers(state.userId));
    }
    return () => {
      dispatch(resetFollowers());
    };
  }, [userInfo.userId, dispatch]);

  console.log("followers from followers page", followers);
  return (
    <div className="followers">
      {followersStatus === "loading" && (
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
      <div className="user-list">
        <ul class="list">
          {followers.length < 1 && "No  Followers"}
          {followers.map(
            ({ userId: { _id, username, fullname, profileUrl } }) => (
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
            )
          )}
        </ul>
      </div>
      <MobileNav />
    </div>
  );
};
