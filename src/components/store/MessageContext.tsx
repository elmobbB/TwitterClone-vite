import React from "react";
import { createContext } from "react";

interface IUser {
  receiverEmail: string | null;
  receiverUid: string | null;
  userToReceiver: string | null;
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
  },
  setMessage: () => {},
});

export default MessageContext;
