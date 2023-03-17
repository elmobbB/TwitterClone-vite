import React from "react";
import { createContext } from "react";

interface Type {
  value: {};
}
const UserContext = createContext({ email: "", uid: "", photoURL: "" });
export default UserContext;
