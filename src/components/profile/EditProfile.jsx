import "./edit.css";
import { useEffect, useState } from "react";
import { ProgressBar } from "../newpost/ProgressBar";
import { resetProfile, updateUserProfile } from "./profileSlice";
import { MobileNav } from "..";
import { useSelector, useDispatch } from "react-redux";
import { resetProfileImg } from "../auth/userSlice";
import Loader from "react-loader-spinner";

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
  const { updateStatus, userInfo, error } = useSelector(
    (state) => state.userInfo
  );

  const dispatch = useDispatch();

  const { loggedInUser } = useSelector((state) => state.loggedInUserInfo);
  useEffect(() => {
    if (updateStatus === "idle" || updateStatus === "fulfilled") {
      setUserData(() => ({
        username: userInfo.username,
        bio: userInfo.bio,
        fullname: userInfo.fullname,
      }));
    }
  }, [updateStatus]);

  const updateProfile = async () => {
    const userUpdate = { ...userData, profileUrl: uploadedFileurl };
    const {
      payload: { updatedUser, success },
    } = await dispatch(updateUserProfile(userUpdate, loggedInUser.userId));
    if (success) {
      dispatch(resetProfileImg(updatedUser.profileUrl));
      setfileStatus("Profile Updated Succesfully");
      setuploadedFileurl("");
      setUserData({
        username: "",
        bio: "",
        fullname: "",
        profileUrl: "",
      });
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
      {updateStatus === "loading" && (
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
        <form>
          <div className="input-div">
            <label>
              <strong>Username</strong>
            </label>
            <input
              className="input-line"
              type="text"
              name="username"
              onChange={(event) => onType(event)}
              value={userData.username}
            />
            <label>
              <strong>full Name</strong>
            </label>
            <input
              className="input-line"
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
              className="input-line"
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
              {uploadedFileurl && (
                <div className="mesg">{"profileImage.jpg"}</div>
              )}
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
          {fileStatus && <div className="mesg">{fileStatus}</div>}
        </form>
      </div>
      <MobileNav />
    </div>
  );
};
