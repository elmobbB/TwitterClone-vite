import React from "react";
import { createContext } from "react";

interface Type {
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
}
const UserImageConText = createContext<Type>({
  imageUrl: "",
  setMyData: () => any,
});

export const ImageContextProvider: React.FC = ({ children }: any) => {
  const [imageUrl, setImageUrl] = React.useState("");

  return (
    <UserImageConText.Provider value={{ imageUrl, setImageUrl }}>
      {children}
    </UserImageConText.Provider>
  );
};

export default UserImageConText;
