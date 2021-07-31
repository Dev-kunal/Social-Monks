import { useDispatch, useSelector } from "react-redux";

import { MobileNav } from "../index";
import "./profile.css";
import {
  followUnfollow,
  getUser,
  resetProfile,
  reduceFollowerCount,
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
  const { status, userInfo, error, followUnfollowStatus } = useSelector(
    (state) => state.userInfo
  );
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
        follower.userId === myId && follower.followStatus === "following"
    ).length;
  };
  const followersLength = () => {
    return followers.filter((follower) => follower.followStatus === "following")
      .length;
  };

  const followOrUnfolllow = (id) => {
    dispatch(followUnfollow(id));
  };

  const logOut = () => {
    dispatch(resetFeed());
    dispatch(resetAllPosts());
    dispatch(resetUserInfo());
    dispatch(logOutUser());
  };

  return (
    <>
      <div className="user-page">
        {(status === "loading" || followUnfollowStatus === "loading") && (
          <>
            <div className="loader-container">
              <Loader
                type="Oval"
                color="#2bc48a"
                height={60}
                width={60}
                timeout={2000}
              />
            </div>
          </>
        )}

        {userInfo.posts && (
          <>
            {" "}
            <div className="user-header">
              <img
                className="avatar-circle"
                src={
                  profileUrl
                    ? profileUrl
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                }
                alt="Avatar"
              />
              <div className="user-info">
                <h2 className="username">{username}</h2>
                {_id === loggedInUser._id ? (
                  <>
                    <button
                      className="plain-action-btn"
                      onClick={() =>
                        navigate("/editprofile", {
                          state: {
                            userId: loggedInUser?.userId,
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
                  {following > 0 ? following : "0"} following
                </button>
              </div>
            </div>
            <div className="explore-container"></div>
            {posts.map(({ fileurl, _id }) => (
              <div className="explore-post" key={_id}>
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
