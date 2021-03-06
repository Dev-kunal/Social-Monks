import { useDispatch, useSelector } from "react-redux";
import { getNotifications, resetNotifications } from "../auth/userSlice";
import { MobileNav } from "../index";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "react-loader-spinner";

export const Activity = () => {
  const dispatch = useDispatch();
  const { notificationStatus, notifications } = useSelector(
    (state) => state.loggedInUserInfo
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (notificationStatus === "idle") {
      dispatch(getNotifications());
    }
  }, [notificationStatus, dispatch]);

  const userNotifications = notifications?.map((item) => ({
    ...item.sourceUser,
    type: item.notificationType,
  }));

  return (
    <div style={{ maxWidth: "35rem", margin: "4rem auto" }}>
      {notificationStatus === "loading" && (
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
      {userNotifications?.length < 1 && "No Notifications"}
      <ul className="list">
        {userNotifications?.map(({ _id, type, profileUrl, username }) => (
          <div>
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
                <strong>{username}</strong>
                {type === "LIKE"
                  ? "  Liked Your Post"
                  : "  Started Following You"}
                <br />
              </div>
            </li>
          </div>
        ))}
      </ul>
      <MobileNav />
    </div>
  );
};
