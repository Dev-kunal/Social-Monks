import { useEffect } from "react";
import { motion } from "framer-motion";
import useStorage from "../../hooks/useStorage";

export const ProgressBar = ({ file, setFile, setuploadedFileurl }) => {
  const { url, progress } = useStorage(file);
  console.log(url);

  useEffect(() => {
    if (url) {
      setFile(null);
      setuploadedFileurl(url);
    }
  }, [url, setFile]);

  return (
    <motion.div
      className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
    ></motion.div>
  );
};
