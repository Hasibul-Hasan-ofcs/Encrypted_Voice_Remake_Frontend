import React, { useEffect, useState } from "react";
import style from "./ConnectionBox.module.css";
import threeDots from "../svg/three-dots.svg";
import edit from "../svg/edit.svg";
import BasicMenu_logout from "../UI/MUI/BasicMenu_logout";
import male1 from "../image/UserPlaceHolders/male1.png";
import male2 from "../image/UserPlaceHolders/male2.png";
import male3 from "../image/UserPlaceHolders/male3.png";
import male4 from "../image/UserPlaceHolders/male4.png";
import SearchUserModal from "../UI/MUI/SearchUserModal";
import { ChatState } from "../Context/ContextProvider";
import axios from "axios";
import ListItemsConnBox from "../UI/ListItemsConnBox";

const ConnectionBox = (props) => {
  const [loggedUser, setLoggedUser] = useState();
  const [selectedChat1, setSelectedChat1] = useState();
  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
    ChatState();
  const [jsonData, setJsonData] = useState(
    JSON.parse(localStorage.getItem("user_info"))
  );

  const pressedFuncCB = () => {
    props.pressedFuncM(true);
  };

  // settings Chats

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          // Authorization: `Bearer ${user.token}`,
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user_info")).token
          }`,
        },
      };

      const { data } = await axios.get(
        `https://encrypted-voice-remake-backend.vercel.app/api/chat`,
        config
      );
      setChats(data);
      // console.log(data);
    } catch (error) {
      console.log(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("user_info")));
    fetchChats();

    console.log("chat fetch operation ran");
  }, []);

  // const accessChat = async (userId) => {
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     };
  //     const { data } = await axios.post("https://encrypted-voice-remake-backend.vercel.app/api/chat", { userId }, config);
  //     setSelectedChat1(data);
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  return (
    <section className={style["contacts_box"]}>
      <div className={style["userprofilecontent"]}>
        <div className={style["profile_image"]}>
          <img src={jsonData.user_image} alt="user" title="username" />
        </div>
        <div className={style["uname_status"]}>
          <h4 className={style["username"]}>{jsonData.name}</h4>
          <div className={style["status"]}>
            <span></span>
            <p>active</p>
          </div>
        </div>
        <BasicMenu_logout></BasicMenu_logout>
      </div>
      <div className={style["connections_container"]}>
        <h3>Connections</h3>
        <ul>
          {chats &&
            chats.map((item) => {
              if (!item.isGroupChat) {
                if (
                  item.users[0]._id ===
                  JSON.parse(localStorage.getItem("user_info"))._id
                ) {
                  return (
                    <li key={item._id}>
                      <img
                        src={item.users[1].user_image}
                        alt="name of user"
                        className={style["contact_image"]}
                      />
                      <p>{item.users[1].name}</p>
                    </li>
                  );
                } else {
                  return (
                    <li key={item._id}>
                      <img
                        src={item.users[0].user_image}
                        alt="name of user"
                        className={style["contact_image"]}
                      />
                      <p>{item.users[1].name}</p>
                    </li>
                  );
                }
              }
            })}
        </ul>
      </div>

      <div className={style["messages"]}>
        <div className={style["heading_box"]}>
          <h3>
            Messages <span>[☑]</span>
          </h3>
          <SearchUserModal></SearchUserModal>
        </div>
        <div className={style["connection_list"]}>
          {chats.map((item) => {
            if (!item.isGroupChat) {
              if (
                item.users[0]._id ===
                JSON.parse(localStorage.getItem("user_info"))._id
              ) {
                return (
                  <ListItemsConnBox
                    key={item._id}
                    chatSel={item}
                    user_image={item.users[1].user_image}
                    name={item.users[1].name}
                    pressedFuncL={pressedFuncCB}
                  ></ListItemsConnBox>
                );
              } else {
                return (
                  <ListItemsConnBox
                    key={item._id}
                    chatSel={item}
                    user_image={item.users[0].user_image}
                    name={item.users[0].name}
                    pressedFuncL={pressedFuncCB}
                  ></ListItemsConnBox>
                );
              }
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default ConnectionBox;
