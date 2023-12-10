import React from "react";
import style from "./ConnectionBox.module.css";
import threeDots from "../svg/three-dots.svg";
import edit from "../svg/edit.svg";
import BasicMenu_logout from "../UI/MUI/BasicMenu_logout";
import male1 from "../image/UserPlaceHolders/male1.png";
import male2 from "../image/UserPlaceHolders/male2.png";
import male3 from "../image/UserPlaceHolders/male3.png";
import male4 from "../image/UserPlaceHolders/male4.png";
import SearchUserModal from "../UI/MUI/SearchUserModal";

const ConnectionBox = () => {
  return (
    <section className={style["contacts_box"]}>
      <div className={style["userprofilecontent"]}>
        <div className={style["profile_image"]}>
          <img src={male4} alt="user" title="username" />
        </div>
        <div className={style["uname_status"]}>
          <h4 className={style["username"]}>Username</h4>
          <div className={style["status"]}>
            <span></span>
            <p>active</p>
          </div>
        </div>
        <BasicMenu_logout></BasicMenu_logout>
      </div>

      <div className={style["messages"]}>
        <div className={style["heading_box"]}>
          <h3>
            All Groups <span>(15)</span>
          </h3>
          {/* <button>
            <img src={edit} alt="edit contacts" />
          </button> */}
          <SearchUserModal></SearchUserModal>
        </div>
        <div className={style["connection_list"]}>
          <div className={style["list_item"]}>
            <img src={male1} alt="user1" />
            <div className={style["connection_content"]}>
              <h4>Contact Name</h4>
              <span>message goes here ...</span>
            </div>
            <div className={style["time"]}>05:29</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectionBox;
