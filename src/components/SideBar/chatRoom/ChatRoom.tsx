import React, { useContext } from "react";
import MessageContext from "../../store/MessageContext";
import UserContext from "../../store/UserContext";
import Modal from "../../UI/Modal";
import SideBar from "../SideBar";
import Chats from "./Chats";
import UsersMessages from "./userMessageSideBar/UsersMessages";

interface Type {
  email: string | null;
  uid: string | null;
  userToReceiver: string | null;
}

const ChatRoom = () => {
  const { message } = useContext(MessageContext);
  const passAllUserData = (allUser: Type) => {};
  return (
    <>
      <Chats />
      <UsersMessages />
    </>
  );
};

export default ChatRoom;
