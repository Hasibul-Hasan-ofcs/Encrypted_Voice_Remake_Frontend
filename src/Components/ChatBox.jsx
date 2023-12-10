import style from "./ChatBox.module.css";
import React, { useEffect, useState } from "react";
import video_call from "../svg/video_call.svg";
import phone_fill from "../svg/phone_fill.svg";
import video_call_blue from "../svg/video_call_blue.svg";
import phone_fill_blue from "../svg/phone_fill_blue.svg";
import send_fill_2_blue from "../svg/send-fill-2_blue.svg";
import { ChatState } from "../Context/ContextProvider";
import mic_fill from "../svg/mic-fill.svg";
import male3 from "../image/UserPlaceHolders/male3.png";
import male4 from "../image/UserPlaceHolders/male4.png";
import axios from "axios";
import socketIO from "socket.io-client";
import { isLastMessage, isSameSender } from "../configuration/logics";
import Overlay from "../UI/Overlay";

// Socket Connection generation
const ENDPOINT = "https://encrypted-voice-remake-backend.vercel.app";
let socket, selectedChatCompare;

const ChatBox = (props) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [currentChat, setCurrentChat] = useState();
  const [textBoxState, setTextBoxState] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [selected, setSelected] = useState();

  const [unPress, setUnpress] = useState();

  // useEffect(() => {
  //   setCurrentChat(JSON.parse(localStorage.getItem("current_chat"))._id);
  // }, []);

  const { user, selectedChat, setSelectedChat } = ChatState();

  useEffect(() => {
    socket = socketIO(ENDPOINT);
    socket.emit("setup", JSON.parse(localStorage.getItem("user_info")));
    socket.on("connection", () => setSocketConnected(true));
  }, []);

  const sendMessageHandler = async (event) => {
    // if(event.key === "Enter" && newMessage)
    event.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user_info")).token
          }`,
          // Authorization: `Bearer ${user.token}`,
        },
      };
      setNewMessage("");
      const { data } = await axios.post(
        "/api/message",
        {
          messageData: newMessage,
          chatId: JSON.parse(localStorage.getItem("current_chat"))._id,
        },
        config
      );

      // console.log(data);

      socket.emit("newmessage", data);
      setMessages([...messages, data]);
      // console.log(messages);
    } catch (error) {
      alert(error);
    }
  };

  const typeHandler = (event) => {
    setNewMessage(event.target.value);
  };

  const fetchMessages = async () => {
    // console.log(
    //   JSON.parse(localStorage.getItem("current_chat"))._id,
    //   JSON.parse(localStorage.getItem("current_chat")).token
    // );
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user_info")).token
          }`,
        },
      };

      const { data } = await axios.get(
        `/api/message/${JSON.parse(localStorage.getItem("current_chat"))._id}`,
        config
      );

      setMessages(data);
      // console.log(data);

      socket.emit(
        "joinroom",
        JSON.parse(localStorage.getItem("current_chat"))._id
      );
    } catch (error) {
      alert(error.message);
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();

    // testing load
    setLoading(true);
  }, [props.pressedFuncToCB]);

  useEffect(() => {
    socket.on("message recieved", (messageRecieved) => {
      setMessages([...messages, messageRecieved]);
    });
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [loading]);

  return (
    <>
      {!localStorage.getItem("current_chat") ? (
        <section className={style["chat_box"]}></section>
      ) : (
        <section className={style["chat_box"]}>
          {loading && <Overlay />}

          <div className={style["chat_box_top"]}>
            {props.pressedFuncToCB === true &&
              JSON.parse(localStorage.getItem("user_info"))._id ===
                JSON.parse(localStorage.getItem("current_chat")).users[0]
                  ._id && (
                <h3>
                  {
                    JSON.parse(localStorage.getItem("current_chat")).users[1]
                      .name
                  }
                </h3>
              )}
            {props.pressedFuncToCB === true &&
              JSON.parse(localStorage.getItem("user_info"))._id ===
                JSON.parse(localStorage.getItem("current_chat")).users[1]
                  ._id && (
                <h3>
                  {
                    JSON.parse(localStorage.getItem("current_chat")).users[0]
                      .name
                  }
                </h3>
              )}
            {!props.pressedFuncToCB &&
              JSON.parse(localStorage.getItem("user_info"))._id ===
                JSON.parse(localStorage.getItem("current_chat")).users[0]
                  ._id && (
                <h3>
                  {
                    JSON.parse(localStorage.getItem("current_chat")).users[1]
                      .name
                  }
                </h3>
              )}
            {!props.pressedFuncToCB &&
              JSON.parse(localStorage.getItem("user_info"))._id ===
                JSON.parse(localStorage.getItem("current_chat")).users[1]
                  ._id && (
                <h3>
                  {
                    JSON.parse(localStorage.getItem("current_chat")).users[0]
                      .name
                  }
                </h3>
              )}

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
              {messages &&
                messages.map((m) => {
                  if (
                    m.sender._id ===
                    JSON.parse(localStorage.getItem("user_info"))._id
                  ) {
                    // console.log(false);
                    return (
                      <li className={style["fl_right"]} key={m._id}>
                        <div className={style["self_text_box"]}>
                          <span>{m.content}</span>
                        </div>
                      </li>
                    );
                  } else {
                    // console.log(true);
                    return (
                      <li className={style["fl_left"]} key={m._id}>
                        <img
                          src={m.sender.user_image}
                          alt="name of user"
                          className={style["contact_image"]}
                        />

                        <div className={style["recipient_text_box"]}>
                          <span>{m.content}</span>
                        </div>
                      </li>
                    );
                  }
                })}
            </ul>
          </div>

          <div className={style["type_message_box"]}>
            <img
              src={JSON.parse(localStorage.getItem("user_info")).user_image}
              alt="profile_image"
            />
            <form onSubmit={sendMessageHandler}>
              <input
                type="text"
                name="typemessage"
                id="typemessage"
                className={style["typemessage"]}
                placeholder="Your message...."
                autoComplete="off"
                onChange={typeHandler}
              />
              {/* <div className={style["others"]}>
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
          </div> */}
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
      )}
    </>
  );
};

export default ChatBox;
