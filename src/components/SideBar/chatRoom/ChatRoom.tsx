import React, { useContext } from "react";
import UserContext from "../../store/UserContext";
import Modal from "../../UI/Modal";
import SideBar from "../SideBar";
import Chats from "./Chats";
import UsersMessages from "./userMessageSideBar/UsersMessages";

interface Type {
  uid: string | null;
  email: string | null;
}

const ChatRoom = () => {
  const passAllUserData = (allUser: Type) => {};
  return (
    <>
      <Chats />
      <UsersMessages />
    </>
  );
};

export default ChatRoom;
