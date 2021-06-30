import axios from "axios";
import { useEffect, useState } from "react";
import { MobileNav } from "../navbar/MobileNav";
import "./newpost.css";

export const NewPost = () => {
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [caption, setCaption] = useState("");
  const [status, setStatus] = useState("idle");

  const selectFile = (event) => {
    const fileSelected = event.target.files[0];
    const fileTypes = ["image/png", "image/jpeg"];

    if (fileSelected && fileTypes.includes(fileSelected.type)) {
      setFile(fileSelected);
      setFileError("");
    } else {
      setFile(null);
      setFileError("select an image of type jpeg/png");
    }
  };

  const uploadPost = (event) => {
    if (file) {
      console.log("submit");
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("file-to-upload", file);
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      (async () => {
        try {
          setStatus("loading");
          console.log("calling...");
          const response = await axios.post(
            "http://localhost:3000/post",
            formData,
            config
          );
          console.log(response);
          if (response.data.success) {
            setFile(null);
            setStatus("Uploaded ");
            setCaption("");
          }
        } catch (error) {
          setFile(null);
          console.log(error);
        }
      })();
    } else {
      setFileError("Please select an image");
    }
  };
  // useEffect(() => {
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append("file-to-upload", file);
  //     const config = {
  //       headers: {
  //         "content-type": "multipart/form-data"
  //       }
  //     };
  //     (async () => {
  //       try {
  //         setStatus("loading");
  //         console.log("calling...");
  //         const response = await axios.post(
  //           "https://social-media-server.kunaltijare.repl.co/post",
  //           formData,
  //           config
  //         );
  //         console.log(response);
  //         if (response.data.success) {
  //           setFile(null);
  //           setStatus("Uploaded ");
  //         }
  //       } catch (error) {
  //         setFile(null);
  //         console.log(error);
  //       }
  //     })();
  //   }
  // }, [file, setFile]);

  return (
    <div className="newpost">
      <div className="newpost-container">
        <form method="POST" className="post-form">
          <input
            className="input line-input"
            type="text"
            id="line-input-md"
            placeholder="Caption..."
            name="caption"
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
          />
          <div className="seprator">&</div>
          <label>
            <input
              required
              type="file"
              onChange={(event) => selectFile(event)}
              id="file-to-upload"
              name="image"
            />
            <span>+</span>
          </label>
          <span>{file ? file.name : "Add image"}</span>
          <button
            onClick={uploadPost}
            type="button"
            className="plain-action-btn mt"
          >
            Upload
          </button>
        </form>
        {status === "loading" && <div className="mt">Loading..</div>}
        {fileError && <div className="error">{fileError}</div>}
      </div>

      <MobileNav />
    </div>
  );
};
