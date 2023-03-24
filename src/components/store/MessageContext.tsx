import React from "react";
import { createContext } from "react";

interface IUser {
  receiverEmail: string | null;
  receiverUid: string | null;
  userToReceiver: string | null;

  uploadedMessage: {
    email: string;
    messageContent: string;
    timestamp: string;
    uid: string;
    userIcon: string;
    receiver: string;
    id: string;
  }[];
}
interface Type {
  message: IUser;
  setMessage: React.Dispatch<React.SetStateAction<IUser>>;
}

const MessageContext = createContext<Type>({
  message: {
    receiverEmail: "",
    receiverUid: "",
    userToReceiver: "",
    uploadedMessage: [],
  },
  setMessage: () => {},
});

export default MessageContext;
