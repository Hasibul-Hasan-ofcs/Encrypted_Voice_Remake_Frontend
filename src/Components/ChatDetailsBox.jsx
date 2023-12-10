import React from "react";
import style from "./ChatDetailsBox.module.css";

import video_call from "../svg/video_call.svg";
import chat from "../svg/chat.svg";
import remove from "../svg/remove.svg";
import directory from "../svg/directory.svg";
import link from "../svg/link.svg";
import right_fill from "../svg/right-fill.svg";

const ChatDetailsBox = () => {
  return (
    <section className={style["chat_details_box"]}>
      <div className={style["headerportion"]}>
        <div className={style["leftportion"]}>
          {/* <img src={chat} alt="chat icon" /> */}
          <h4>Chat Details</h4>
        </div>
        {/* <button className={style["close_chat_details"]}>
          <img src={remove} alt="exit chat details" />
        </button> */}
      </div>

      <div className={style["chat_connection_details"]}>
        <div className={style["connection_image"]}>EV</div>
      </div>

      {/* <div className={style["shared_files"]}>
        <button className={style["file_button"]}>
          <p>Files</p>
          <div>
            <img src={directory} alt="shared files" />
            <span>32</span>
          </div>
        </button>
        <button className={style["file_button"]}>
          <p>Links</p>
          <div>
            <img src={link} alt="shared links" />
            <span>32</span>
          </div>
        </button>
      </div> */}

      <div className={style["contact_credentials"]}>
        <button className={style["accordion_button1"]}>
          Contact Credentials
          <span className={style["right_arrow1"]}>
            <img src={right_fill} alt="right" />
          </span>
        </button>
        <ul className={style["accordion_list1"]}>
          <li>Data</li>
          <li>Data</li>
          <li>Data</li>
        </ul>
      </div>

      {/* <div className={style["shared_media_files"]}>
        <button className={style["accordion_button2"]}>
          Media Files
          <span className={style["right_arrow2"]}>
            <img src={right_fill} alt="right" />
          </span>
        </button>
        <ul className={style["accordion_list2"]}>
          <li>Data</li>
          <li>Data</li>
          <li>Data</li>
        </ul>
      </div> */}
    </section>
  );
};

export default ChatDetailsBox;
