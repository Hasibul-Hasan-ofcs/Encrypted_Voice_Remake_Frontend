import React from "react";
import style from "./ListItem.module.css";
import male1 from "../image/UserPlaceHolders/male1.png";
import { ChatState } from "../Context/ContextProvider";

const ListItems = (props) => {
  const setSelectedChat = () => {
    localStorage.setItem("current_chat", JSON.stringify(props.chatSel));
    props.pressedFuncL(true);
  };
  return (
    <button className={style["list_item"]} onClick={setSelectedChat}>
      <img src={props.user_image} alt="user1" />
      <div className={style["connection_content"]}>
        <h4>{props.name}</h4>
        {/* <span>message goes here ...</span> */}
      </div>
      {/* <div className={style["time"]}>05:29</div> */}
    </button>
  );
};

export default ListItems;
