import { useDispatch, useSelector } from "react-redux";
import { MobileNav } from "../index";
import "./profile.css";
import {
  followUnfollow,
  getUser,
  resetProfile,
  reduceFollowingCount,
  followUser,
  resetUserInfo,
} from "./profileSlice";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resetFeed } from "../post/postSlice";
import { logOutUser } from "../auth/userSlice";
import { resetAllPosts } from "../explore/exploreSlice";
import Loader from "react-loader-spinner";

export const Profile = () => {
  const { status, userInfo, error } = useSelector((state) => state.userInfo);
  const { loggedInUser, token } = useSelector(
    (state) => state.loggedInUserInfo
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (status === "idle" || status === "fulfilled") {
      if (state?.userId) {
        dispatch(getUser(state.userId));
      } else {
        dispatch(getUser(loggedInUser._id));
      }
    }
    return () => {
      dispatch(resetProfile());
    };
  }, [state?.userId, loggedInUser._id, dispatch]);

  let {
    _id,
    username,
    profileUrl,
    fullname,
    bio,
    followers,
    following,
    posts,
  } = userInfo;

  const followingOrNot = (followers, myId) => {
    return followers.filter(
      (follower) =>
        follower.followStatus === "following" && follower.userId === myId
    ).length;
  };
  const followersLength = () => {
    return followers.filter((follower) => follower.followStatus === "following")
      .length;
  };
  const followOrUnfolllow = async (id) => {
    const result = await dispatch(followUnfollow(id));
    if (result.payload.unfollowed) {
      dispatch(reduceFollowingCount());
    }
    if (result.payload.followed) {
      dispatch(followUser(loggedInUser._id));
    }
  };
  const logOut = () => {
    console.log("Logging out");
    dispatch(resetFeed());
    dispatch(resetAllPosts());
    dispatch(resetUserInfo());
    dispatch(logOutUser());
  };
  return (
    <>
      <div className="user-page">
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

        {userInfo.posts && (
          <>
            {" "}
            <div className="user-header">
              <img class="avatar-circle" src={profileUrl} alt="Avatar" />
              <div className="user-info">
                <h2 className="username">{username}</h2>
                {_id === loggedInUser._id ? (
                  <>
                    <button
                      className="plain-action-btn"
                      onClick={() =>
                        navigate("/editprofile", {
                          state: {
                            userId: loggedInUser.userId,
                          },
                        })
                      }
                    >
                      Edit profile
                    </button>
                    <button
                      className="plain-action-btn"
                      onClick={() => logOut()}
                    >
                      Log-out
                    </button>
                  </>
                ) : (
                  <div>
                    {followingOrNot(followers, loggedInUser._id) > 0 ? (
                      <button
                        className="plain-action-btn following"
                        onClick={() => followOrUnfolllow(_id)}
                      >
                        Following
                      </button>
                    ) : (
                      <button
                        className="plain-action-btn"
                        onClick={() => followOrUnfolllow(_id)}
                      >
                        Follow
                      </button>
                    )}
                  </div>
                )}
                {console.log("loggedInUserid===>", loggedInUser._id)}
              </div>
            </div>
            <div className="bio">
              <span>
                <strong>{fullname}</strong>
                <br />
                {bio}
              </span>
            </div>
            <div className="follow">
              <div className="follow-count">
                <span>
                  {posts.length}
                  <br />
                  posts
                </span>
              </div>
              <div className="follow-count">
                <button
                  className="post-action-btn"
                  onClick={() =>
                    navigate("/followers", {
                      state: {
                        userId: _id,
                      },
                    })
                  }
                >
                  {followersLength()} Followers
                </button>
              </div>
              <div className="follow-count">
                <button
                  className="post-action-btn"
                  onClick={() =>
                    navigate("/following", {
                      state: {
                        userId: _id,
                      },
                    })
                  }
                >
                  {following} following
                </button>
              </div>
            </div>
            <div className="explore-container"></div>
            {/* {posts.map(({ ...props }) => (
              <Post {...props} />
            ))} */}
            {posts.map(({ fileurl }) => (
              <div className="explore-post">
                <img src={fileurl} width="100%" height="100%" alt="img-post" />
              </div>
            ))}
          </>
        )}
      </div>
      <MobileNav />
    </>
  );
};
