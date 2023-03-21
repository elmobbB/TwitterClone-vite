import React from "react";
import { createContext } from "react";
import { useContext } from "react";
import { useState } from "react";
import { ReactNode } from "react";

interface UserContextType {
  userIcon: string | null;
  setUserIcon: (icon: string) => void;
}

export const UserIconContext = createContext<UserContextType>({
  userIcon: "",
  setUserIcon: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserImageContext = ({ children }: UserProviderProps) => {
  const [userIcon, setUserIcon] = useState<string>("");

  return (
    <UserIconContext.Provider value={{ userIcon, setUserIcon }}>
      {children}
    </UserIconContext.Provider>
  );
};
