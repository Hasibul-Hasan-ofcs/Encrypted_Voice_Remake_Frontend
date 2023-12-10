import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Signup.module.css";
import upload_icon from "../svg/upload.svg";
import axios from "axios";
import { Navigate } from "react-router-dom";

import maleDefault from "../image/UserPlaceHolders/male.png";

// firebase inregration
import { storage } from "../Firebase/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [user_image1, setUser_Image] = useState(null);
  const [user_image, setUser_Image_UUID] = useState(null);
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);

  // useEffect()
  useEffect(() => {
    if (user_image1 === null) {
      // toast goes here
      return;
    }

    // setUser_Image_UUID(user_image.name + v4());

    const imageRef = ref(storage, `profile_images/${user_image}`);
    setUser_Image_UUID(imageRef);
    console.log(imageRef);
    uploadBytes(imageRef, user_image1).then((res) => {
      alert("Image got uploaded");
      console.log(res);
    });
  }, [user_image1]);

  // const imageUploadHandler = () => {
  // };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    /*Save data to database portion*/
    try {
      if (name && email && password && retypePassword) {
        if (password === retypePassword) {
          /*Image upload portion*/

          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };

          const { data } = await axios.post(
            "https://encrypted-voice-remake-backend.vercel.app/api/user/signup",
            {
              name,
              email,
              password,
              user_image,
            },
            config
          );
          localStorage.setItem("user_info", JSON.stringify(data));
          navigate("/home");
          // return <Redirect to="/home" />;
        } else {
          return alert("Password for both fields are not same");
        }
      } else {
        return alert("All fields should be filled...");
      }
    } catch (err) {
      return alert(`Error occurred ${err.message}`);
    }

    // clearing all field states
    setName("");
    setEmail("");
    setPassword("");
    setRetypePassword("");
  };

  return (
    <section className={style["main_section"]}>
      <div className={style["main_card"]}>
        <h2 className={style["sign_in_text"]}>Sign Up</h2>
        <form className={style["login_form"]} onSubmit={formSubmitHandler}>
          <div className={style["left_fields"]}>
            <input
              type="text"
              className={`username_textbox ${style["text_input"]}`}
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
              required
              value={name}
            />
            <input
              type="email"
              className={`user_email ${style["text_input"]}`}
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              required
              value={email}
            />
            <input
              type="password"
              className={`user_password ${style["text_input"]}`}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              value={password}
            />
            <input
              type="password"
              className={`user_password_retype ${style["text_input"]}`}
              placeholder="Re-type Password"
              onChange={(e) => setRetypePassword(e.target.value)}
              required
              value={retypePassword}
            />
          </div>

          <div className={style["right_fields"]}>
            <div className={style["file_upload_box"]}>
              <label>Please upload your image</label>
              <div className={style["file_upload_box_inner"]}>
                <input
                  type="file"
                  className={`user_image ${style["file_input"]}`}
                  accept="image/*"
                  onChange={(e) => setUser_Image(e.target.files[0])}
                  // required
                />
                {/* <img src={upload_icon} className={style["upload_icon"]} /> */}
              </div>
            </div>

            <button
              type="submit"
              className={style["login_submit"]}
              onClick={(e) => setUser_Image_UUID(user_image1.name + v4())}
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className={style["login_extraa"]}>
          <p>
            Already have an account?{" "}
            <Link to="/" variant="body2">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
