import React, { useState } from "react";
import style from "./HomeMenuBar.module.css";

const HomeMenuBar = (props) => {
  const messengerClass = props.messengerActive
    ? `messengerActive`
    : `menu_top_item_messenger`;

  const settingsClass = props.settingsActive
    ? `settingsActive`
    : `menu_bottom_settings`;

  const groupsClass = props.groupsActive
    ? `groupsActive`
    : `menu_top_item_group`;

  const messengerHandler = () => {
    props.onButtonPress("messenger");
  };
  const settingsHandler = () => {
    props.onButtonPress("settings");
  };
  const groupsHandler = () => {
    props.onButtonPress("groups");
  };

  return (
    <section className={style["menu_bar"]}>
      <div className={style["logo_main"]}>
        <span>EV</span>
      </div>
      <div className={style["menu_box"]}>
        <div className={style["menu_top"]}>
          <button
            className={style[`${messengerClass}`]}
            onClick={messengerHandler}
            title="messeges"
          ></button>
          {/* <button
            className={style[`${groupsClass}`]}
            onClick={groupsHandler}
            title="groups"
          ></button> */}
          {/* <button className={style["menu_top_item_phone"]}></button> */}
          {/* <button className={style["menu_top_item_videocall"]}></button> */}
        </div>
        <div className={style["menu_bottom"]}>
          <button
            className={style[`${settingsClass}`]}
            onClick={settingsHandler}
            title="profile settings"
          ></button>
        </div>
      </div>
    </section>
  );
};

export default HomeMenuBar;
