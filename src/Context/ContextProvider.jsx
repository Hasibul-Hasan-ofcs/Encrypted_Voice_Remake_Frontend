import { useEffect } from "react";
import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user_info"));
    setUser(userInfo);

    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <AppContext.Provider
      value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(AppContext);
};

export default ContextProvider;
