import React from "react";
import { createContext } from "react";

interface Type {
  value: {};
}
const UserContext = createContext({ email: "", uid: "", icon: "" });
export default UserContext;
