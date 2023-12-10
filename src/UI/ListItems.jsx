import React from "react";
import style from "./ListItem.module.css";
import male1 from "../image/UserPlaceHolders/male1.png";
import axios from "axios";
import { ChatState } from "../Context/ContextProvider";

const ListItems = (props) => {
  const { user, setUser, setSelectedChat, chats, setChats } = ChatState();

  const accessChat = async (event) => {
    const userId = props.userId;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "https://encrypted-voice-remake-backend.vercel.app/api/chat",
        { userId },
        config
      );

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);

      console.log(data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <button onClick={accessChat} className={style["list_item"]}>
      <img src={props.image} alt="user1" />
      <div className={style["connection_content"]}>
        <h4>{props.name}</h4>
        {/* <span>message goes here ...</span> */}
      </div>
      {/* <div className={style["time"]}>05:29</div> */}
    </button>
  );
};

export default ListItems;
