import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { MobileNav } from "../navbar/MobileNav";
import { getFollowers, resetFollowers } from "./profileSlice";

export const Followers = () => {
  const { followersStatus, followers, error } = useSelector(
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
      dispatch(getFollowers(userId));
    }
    return () => {
      dispatch(resetFollowers());
    };
  }, [userId, dispatch]);

  console.log("followers from foolowers page", followers);
  return (
    <div className="followers">
      <div className="user-list">
        <ul class="list">
          {followers.map(({ userId: { _id, username, fullname } }) => (
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
                <img className="avatar-xs" src="./userAvatar.svg" />
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
