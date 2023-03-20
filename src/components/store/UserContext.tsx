import React from "react";
import { createContext } from "react";

interface Type {
  email: string;
  uid: string;
  photoURL: string | null;
}
const UserContext = createContext<Type>({
  email: "",
  uid: "",
  photoURL: "",
});

export default UserContext;
