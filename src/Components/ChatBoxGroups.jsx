import style from "./ChatBox.module.css";
import React from "react";
import video_call from "../svg/video_call.svg";
import phone_fill from "../svg/phone_fill.svg";
import video_call_blue from "../svg/video_call_blue.svg";
import phone_fill_blue from "../svg/phone_fill_blue.svg";
import send_fill_2_blue from "../svg/send-fill-2_blue.svg";
import mic_fill from "../svg/mic-fill.svg";

import male3 from "../image/UserPlaceHolders/male3.png";
import male4 from "../image/UserPlaceHolders/male4.png";

const ChatBox = () => {
  return (
    <section className={style["chat_box"]}>
      <div className={style["chat_box_top"]}>
        <h4>Group Name</h4>
        {/* <div>
          <button>
            <img src={video_call_blue} alt="make a video call" />
          </button>
          <button>
            <img src={phone_fill_blue} alt="make a audio call" />
          </button>
        </div> */}
      </div>

      <div className={style["chat_messages"]}>
        <ul>
          <li className={style["recipient_message"]}>
            <img
              src={male3}
              alt="name of user"
              className={style["contact_image"]}
            />
            <div className={style["recipient_text_box"]}>
              <span>Hey, Hello there..</span>
            </div>
          </li>

          <li className={style["self_message"]}>
            <div className={style["self_text_box"]}>
              <span>Hi what's up 😀😀</span>
            </div>
            <img
              src={male4}
              alt="name of user"
              className={style["contact_image"]}
            />
          </li>
        </ul>
      </div>

      <div className={style["type_message_box"]}>
        <img src={male4} alt="profile_image" />
        <form action="">
          <input
            type="text"
            name="typemessage"
            id="typemessage"
            className={style["typemessage"]}
            placeholder="Your message...."
            // autocomplete="off"
          />
          <div className={style["others"]}>
            <button className={style["voice_record"]}>
              <img
                src={mic_fill}
                alt="tap voice record"
                className={style["type_message_icon"]}
              />
            </button>
            <div className={style["attach_file_container"]}>
              <input type="file" className={style["attach_clip"]} />
            </div>
          </div>
          <button type="submit" className={style["send_message"]}>
            <img
              src={send_fill_2_blue}
              alt="send your message"
              className={style["type_message_icon"]}
            />
          </button>
        </form>
      </div>
    </section>
  );
};

export default ChatBox;
