import React, { useEffect, useState } from "react";
import style from "./Messege.module.css";
import ConnectionBox from "../../Components/ConnectionBox";
import ChatBox from "../../Components/ChatBox";
import ChatDetailsBox from "../../Components/ChatDetailsBox";
import Overlay from "../../UI/Overlay";

const Messege = (props) => {
  const [isPressedContact, setIsPressedContact] = useState(false);

  const pressedFuncMInside = (value) => {
    setIsPressedContact(value);
  };

  useEffect(() => {
    setIsPressedContact(false);
  }, [isPressedContact]);

  return (
    <div className={style["message"]}>
      <Overlay />
      <ConnectionBox pressedFuncM={pressedFuncMInside} />
      <ChatBox pressedFuncToCB={isPressedContact} />
      {/* <ChatDetailsBox /> */}
    </div>
  );
};

export default Messege;
