import React from "react";
import { createContext } from "react";
import { useContext } from "react";
// interface Type {
//   userIcon: string;
//   setUserIcon: React.Dispatch<React.SetStateAction<string>>;
// }
// interface ChildrenType {
//   children?: JSX.Element | JSX.Element[];
// }
// const UserImageConText = createContext<Type>({
//   imageUrl: "",
//   setImageUrl: () => {},
// });

// export const ImageContextProvider: React.FC = ({ children }: ChildrenType) => {
//   const [imageUrl, setImageUrl] = React.useState("");

//   return (
//     <UserImageConText.Provider value={{ imageUrl, setImageUrl }}>
//       {children}
//     </UserImageConText.Provider>
//   );
// };

export type GlobalContent = {
  userIcon: string;
  setUserIcon: (c: string) => void;
};
export const MyGlobalContext = createContext<GlobalContent>({
  userIcon: "Hello World", // set a default value
  setUserIcon: () => {},
});
export const UserImageConText = () => useContext(MyGlobalContext);
