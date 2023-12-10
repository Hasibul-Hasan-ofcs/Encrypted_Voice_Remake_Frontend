import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeMenuBar from "../Components/HomeMenuBar";
import style from "./Home.module.css";
import Settings from "./HomePagePartitions/Settings";
import Messege from "./HomePagePartitions/Messege";
import Groups from "./HomePagePartitions/Groups";
import { ChatState } from "../Context/ContextProvider";
import axios from "axios";

const Home = () => {
  const [messenger, setMessenger] = useState(true);
  const [settings, setSettings] = useState(false);
  const [groups, setGroups] = useState(false);

  const { chats, setChats } = ChatState();

  const navigate = useNavigate();

  useEffect(() => {
    // const userInfo = JSON.parse(localStorage.getItem("user_info"));
    const userInfo = localStorage.getItem("user_info");

    if (!userInfo) {
      navigate("/");
    }
  }, []);

  const partitionHandler = (buttonName) => {
    if (buttonName === "messenger") {
      setMessenger(true);
      setGroups(false);
      setSettings(false);
    } else if (buttonName === "groups") {
      setMessenger(false);
      setGroups(true);
      setSettings(false);
    } else if (buttonName === "settings") {
      setMessenger(false);
      setGroups(false);
      setSettings(true);
    }
  };

  return (
    <div className={style["home_main"]}>
      <HomeMenuBar
        onButtonPress={partitionHandler}
        messengerActive={messenger}
        settingsActive={settings}
        groupsActive={groups}
      />
      {messenger === true && <Messege />}
      {groups === true && <Groups />}
      {settings === true && <Settings />}
    </div>
  );
};

export default Home;
