import React, { useContext } from "react";
import MessageContext from "../../store/MessageContext";
import UserContext from "../../store/UserContext";
import Modal from "../../UI/Modal";
import SideBar from "../SideBar";
import Chats from "./Chats";
import UsersMessages from "./userMessageSideBar/UsersMessages";

const ChatRoom = () => {
  return (
    <>
      <Chats />
      <UsersMessages />
    </>
  );
};

export default ChatRoom;
