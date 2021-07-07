import { useDispatch, useSelector } from "react-redux";
import { MobileNav } from "../index";
import "./profile.css";
import { followUnfollow, getUser, resetProfile } from "./profileSlice";
import { useEffect, useState } from "react";
import { Post } from "../post/Post";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import axios from "axios";

export const Profile = () => {
  const { status, userInfo, error, loggedInUserId } = useSelector(
    (state) => state.userInfo
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  let {
    state: { userId },
  } = useLocation();

  useEffect(() => {
    if (status === "idle") {
      dispatch(getUser(userId));
    }
    return () => {
      dispatch(resetProfile());
    };
  }, [userId, dispatch]);

  // console.log("userid from profile ", userId);
  // console.log("loggedinuserid from profile ", loggedInUserId);
  console.log(userInfo);
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
    console.log("current users followers", followers);
    return followers.filter(
      (follower) =>
        follower.followStatus === "following" && follower.userId === myId
    ).length;
  };
  // const followUnfollow = async () => {
  //   const response = await axios.post("http://localhost:7000/followunfollow", {
  //     userId: "60db08481fa2cb0793c5f465",
  //     followingId: _id,
  //   });
  //   console.log(response.data);
  // };
  const followersLength = () => {
    return followers.filter((follower) => follower.followStatus === "following")
      .length;
  };
  return (
    <>
      <div className="user-page">
        {userInfo.posts && (
          <>
            {" "}
            <div className="user-header">
              <img class="avatar-circle" src={profileUrl} alt="Avatar" />
              <div className="user-info">
                <h2 className="username">{username}</h2>
                {_id === loggedInUserId ? (
                  <button
                    className="plain-action-btn"
                    onClick={() =>
                      navigate("/editprofile", {
                        state: {
                          userId: _id,
                        },
                      })
                    }
                  >
                    Edit profile
                  </button>
                ) : (
                  <div>
                    {followingOrNot(followers, loggedInUserId) > 0 ? (
                      <button
                        className="plain-action-btn following"
                        onClick={() => dispatch(followUnfollow(_id))}
                      >
                        Following
                      </button>
                    ) : (
                      <button
                        className="plain-action-btn"
                        onClick={() => dispatch(followUnfollow(_id))}
                      >
                        Follow
                      </button>
                    )}
                  </div>
                )}
                {console.log("loggedInUserid===>", loggedInUserId)}
                {console.log(followingOrNot(followers, loggedInUserId))}
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
            {posts.map(({ ...props }) => (
              <Post {...props} />
            ))}
          </>
        )}
      </div>
      <MobileNav />
    </>
  );
};
