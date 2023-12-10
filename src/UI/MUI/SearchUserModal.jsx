import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import style from "./SearchUserModal.module.css";
import { ChatState } from "../../Context/ContextProvider";
import ListItems from "../ListItems";

import EditIcon from "../../svg/edit-white.svg";
import MaleD from "../../image/UserPlaceHolders/male.png";
import axios from "axios";

export default function SearchUserModal() {
  const [open, setOpen] = React.useState(false);
  const [searchBox, setSearchBox] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  const { user, setUser, setSelectedChat, chats, setChats } = ChatState();

  const userSearchHandler = async (e) => {
    e.preventDefault();
    if (!searchBox) {
      return alert("You haven't provided any value");
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${searchBox}`, config);

      setSearchResult(data);
      // console.log(data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        <img src={EditIcon} />
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "16px",
            gap: "15px",
          }}
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
            bgcolor: "#fff",
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: "calc(-1/4 * var(--IconButton-size))",
              right: "calc(-1/4 * var(--IconButton-size))",
              boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
              borderRadius: "50%",
              bgcolor: "red",
            }}
          />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="#333"
            fontWeight="lg"
            mb={1}
          >
            Search for users
          </Typography>
          <form
            onSubmit={userSearchHandler}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "5px",
            }}
          >
            <input
              type="text"
              onChange={(e) => setSearchBox(e.target.value)}
              value={searchBox}
              style={{
                minHeight: "25px",
                minWidth: "250px",
                border: "1px solid #666",
                borderRadius: "5px",
                padding: "0 3px",
              }}
            />

            <button
              type="submit"
              style={{
                padding: "1rem",
                backgroundColor: "#2D7FFE",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Search
            </button>
          </form>
          <div
            style={{
              // backgroundColor: "blue",
              display: "flex",
              flexDirection: "column",
              gap: "3px",
              maxHeight: "50vh",
              overflowY: "scroll",
            }}
          >
            {searchResult.length == 0 ? (
              <span style={{ color: "purple" }}>nothing found</span>
            ) : (
              searchResult?.map((userD) => (
                <ListItems
                  key={userD._id}
                  userId={userD._id}
                  name={userD.name}
                  image={userD.user_image}
                ></ListItems>
              ))
            )}
          </div>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
