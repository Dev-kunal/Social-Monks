import "./edit.css";
import { useEffect, useState } from "react";
import { ProgressBar } from "../newpost/ProgressBar";
import { resetProfile, updateUserProfile } from "./profileSlice";
import { MobileNav } from "..";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetProfileImg } from "../auth/userSlice";

export const EditProfile = () => {
  const [file, setFile] = useState(null);
  const [fileStatus, setfileStatus] = useState(null);
  const [uploadedFileurl, setuploadedFileurl] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    bio: "",
    fullname: "",
    profileUrl: "",
  });
  const { status, updateStatus, userInfo, error } = useSelector(
    (state) => state.userInfo
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((state) => state.loggedInUserInfo);
  useEffect(() => {
    if (updateStatus === "idle") {
      console.log(userInfo);
      setUserData(() => ({
        username: userInfo.username,
        bio: userInfo.bio,
        fullname: userInfo.fullname,
      }));
    }
  }, [updateStatus]);

  const updateProfile = async () => {
    const userUpdate = { ...userData, profileUrl: uploadedFileurl };
    // console.log(userUpdate);
    const result = await dispatch(
      updateUserProfile(userUpdate, loggedInUser.userId)
    );
    if (result.payload.success) {
      dispatch(resetProfileImg(result.payload.updatedUser.profileUrl));
      console.log(
        "upudated userProfile ",
        result.payload.updatedUser.profileUrl
      );
      setUserData({
        username: "",
        bio: "",
        fullname: "",
        profileUrl: "",
      });
      // navigate("/profile", {
      //   state: {
      //     userId: loggedInUser.userId,
      //   },
      // });
    }
  };

  const selectFile = (event) => {
    let selectedFile = event.target.files[0];
    const allowFileTypes = ["image/png", "image/jpeg"];
    if (selectedFile && allowFileTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setfileStatus("");
    } else {
      setFile(null);
      setfileStatus("Select an image file (png or jpg)");
    }
  };
  const onType = (event) => {
    let { name, value } = event.target;
    setUserData((data) => {
      return {
        ...data,
        [name]: value,
      };
    });
  };

  return (
    <div className="edit-page">
      {" "}
      <div className="form">
        <h1 className="brand-name">Social monks</h1>
        <form>
          <div className="input-div">
            <label>
              <strong>Username</strong>
            </label>
            <input
              class="input-line"
              type="text"
              name="username"
              onChange={(event) => onType(event)}
              value={userData.username}
            />
            <label>
              <strong>full Name</strong>
            </label>
            <input
              class="input-line"
              type="text"
              name="fullname"
              id="input-md"
              onChange={(event) => onType(event)}
              value={userData.fullname}
            />
            <label>
              <strong>Bio</strong>
            </label>
            <input
              class="input-line"
              type="text"
              name="bio"
              id="input-md"
              onChange={(event) => onType(event)}
              value={userData.bio}
            />
            <label className="upload-label">
              <input
                required
                type="file"
                onChange={(event) => selectFile(event)}
                name="profileUrl"
              />
              <span>+</span>
            </label>

            <div>
              {" "}
              {uploadedFileurl && "Profile image added to Update"}
              {fileStatus && <div className="error">{fileStatus}</div>}
              {file && (
                <ProgressBar
                  file={file}
                  setFile={setFile}
                  setuploadedFileurl={setuploadedFileurl}
                />
              )}
            </div>
          </div>
          <button className="btn" type="button" onClick={updateProfile}>
            Update Profile
          </button>
        </form>
      </div>
      <MobileNav />
    </div>
  );
};
