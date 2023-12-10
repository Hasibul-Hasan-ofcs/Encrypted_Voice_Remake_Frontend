import React from "react";
import style from "./Messege.module.css";
import ConnectionBoxGroups from "../../Components/ConnectionBoxGroups";
import ChatBoxGroups from "../../Components/ChatBoxGroups";
import Overlay from "../../UI/Overlay";

const Messege = () => {
  return (
    <div className={style["message"]}>
      <Overlay />
      <ConnectionBoxGroups />
      <ChatBoxGroups />
    </div>
  );
};

export default Messege;
