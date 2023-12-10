import React, { useState } from "react";
import { ChatState } from "../Context/ContextProvider";
import axios from "axios";

const MyChat = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        "https://encrypted-voice-remake-backend.vercel.app/api/chat",
        config
      );
      setChats(data);
    } catch (error) {
      alert("Failed to load the chats");
    }
  };

  return <div>MyChat</div>;
};

export default MyChat;
