import React from "react";
import { createContext } from "react";

interface IUser {
  email: string | null;
  uid: string | null;
  photoURL: string | null;
  userIcon: string | null;
}
interface Type {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
}

const UserContext = createContext<Type>({
  user: {
    email: "",
    uid: "",
    photoURL: "",
    userIcon: "",
  },
  setUser: () => {},
});

export default UserContext;
