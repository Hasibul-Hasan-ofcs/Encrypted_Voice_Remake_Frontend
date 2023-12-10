import React, { useEffect, useState } from "react";
import axios from "axios";
import Overlay from "../../UI/Overlay";
import style from "./Settings.module.css";
import BasicMenu from "../../UI/MUI/BasicMenu";
import defImage from "../../image/UserPlaceHolders/male.png";
import backDefaultImage from "../../image/neon_ring_background.jpg";

const Settings = () => {
  const [jsonData, setJsonData] = useState(
    JSON.parse(localStorage.getItem("user_info"))
  );
  // const [temp, setTemp] = useState([]);
  // const fetchData = async () => {
  //for getting this kind of path specification proxy needs to be defined in package.json
  // const { data } = await axios.get("https://encrypted-voice-remake-backend.vercel.app/api/data/");
  // setTemp(data);
  // };

  // useEffect(() => {
  // fetchData();
  // }, []);

  return (
    <div className={style["settings_main"]}>
      <Overlay />

      <div className={style["top_box"]}>
        {/* <img
          className={style["topbox_background_image"]}
          src={backDefaultImage}
        /> */}
        <div className={style["user_image"]}>
          <img src={jsonData.user_image} />
        </div>
      </div>
      <div className={style["bottom_box"]}>
        <div className={style["settings_content_header"]}>
          <h2>{jsonData.name}</h2>
          {/* <BasicMenu className={style["basic_menu"]}></BasicMenu> */}
        </div>
        <div className={style["settings_content_main"]}>
          <div className={style["div"]}>
            <h3 style={{ color: "#1E97F0" }}>Email :&nbsp;&nbsp;&nbsp;</h3>
            <span>{jsonData.email}</span>
            <br />
            <br />
            <h3 style={{ color: "#1E97F0" }}>Password :&nbsp;&nbsp;&nbsp;</h3>
            <span>*********</span>
            <br />
            <br />

            <div className={style["description_box"]}>
              <h3 style={{ color: "#1E97F0" }}>Description: </h3>
              <br />
              <span>Hello there! 😀</span>
            </div>
            <br />
            <br />
            <h3 style={{ color: "#1E97F0" }}>Interested in :&nbsp;</h3>
            <span>male & female</span>
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
