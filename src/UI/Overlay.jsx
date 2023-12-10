import React, { useState } from "react";
import LinearIndeterminate from "./MUI/LinearIndeterminate";
import style from "./Overlay.module.css";

const Overlay = () => {
  const [timeStamp, setTimeStamp] = useState(true);

  setTimeout(() => {
    setTimeStamp(false);
  }, 1200);

  return (
    <>
      {timeStamp === true && (
        <div className={style["overlay_main"]}>
          <LinearIndeterminate />
        </div>
      )}
      {timeStamp === false && <></>}
    </>
  );
};

export default Overlay;
