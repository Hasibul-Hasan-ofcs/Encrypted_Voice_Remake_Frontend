import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./Login.module.css";
import login_ui from "../image/login_ui.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user_info"));

    if (userInfo) {
      navigate("/home");
    }
  }, [navigate]);

  const loginFormSubmitHandler = async (event) => {
    event.preventDefault();

    /*Save data to database portion*/
    try {
      if (email && password) {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const { data } = await axios.post(
          "https://encrypted-voice-remake-backend.vercel.app/api/user/",
          {
            email,
            password,
          },
          config
        );
        if (data) {
          localStorage.setItem("user_info", JSON.stringify(data));
          navigate("/home");
          // return <Redirect to="/home" />;
        } else {
          return alert("login failed");
        }
      } else {
        return alert("All fields should be filled...");
      }
    } catch (err) {
      // return alert(`Error occurred ${err.message}`);
      return alert(
        `Failed to log in. Please provide correct email and password`
      );
    }

    // clearing all field states
    setEmail("");
    setPassword("");
  };

  return (
    <section className={style["main_section"]}>
      <div className={style["main_card"]}>
        <div className={style["left_portion"]}>
          <div className={style["heading"]}>
            <h1>
              <span style={{ color: "#9953cf" }}>E</span>
              <span style={{ color: "#19191D" }}>NCRYPTED</span>
            </h1>
            <h1>
              <span style={{ color: "#9953cf" }}>V</span>
              <span style={{ color: "#19191D" }}>OICE</span>
            </h1>
          </div>
          <img src={login_ui} />
        </div>
        <div className={style["right_portion"]}>
          <form
            className={style["login_form"]}
            onSubmit={loginFormSubmitHandler}
          >
            <h2 className={style["sign_in_text"]}>Sign In</h2>
            <input
              type="email"
              className={`username_textbox ${style["text_input"]}`}
              placeholder="Email"
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

            <button type="submit" className={style["login_submit"]}>
              Sign In
            </button>
          </form>
          <div className={style["login_extraa"]}>
            <p>
              Dont have an account?{" "}
              <Link to="/signup" variant="body2">
                Sign up
              </Link>
            </p>
            {/* <p>
              Forgot password? <a href="/">Click here</a>
            </p> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
