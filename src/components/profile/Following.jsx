import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getFollowing, resetFollowing } from "./profileSlice";
import { MobileNav } from "..";
import { useNavigate, useLocation } from "react-router-dom";

export const Following = () => {
  const { followingStatus, following, error, userInfo } = useSelector(
    (state) => state.userInfo
  );
  const { state } = useLocation();
  let {
    state: { userId },
  } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (followingStatus === "idle") {
      dispatch(getFollowing(state.userId));
    }
    return () => {
      dispatch(resetFollowing());
    };
  }, [userId, dispatch]);

  console.log("following from following page", following);
  // console.log("userinfo from following page", userInfo);
  return (
    <div className="followers">
      <div className="user-list">
        <ul class="list">
          {following.length < 1 && "Not Following Anyone"}
          {following.map(
            ({ followingId: { _id, username, fullname, profileUrl } }) => (
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
