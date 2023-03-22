import React, { useContext, useState } from "react";
import avatar from "../../../img/avatar.svg";
import UserContext from "../../store/UserContext";
import { db } from "../../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
function Chats() {
  const { user } = useContext(UserContext);
  const name = user.email?.substring(0, user.email.lastIndexOf("@"));
  const [messageInput, setMessageInput] = useState("");

  const messageInputHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setMessageInput(e.currentTarget.value);
  };

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setMessageInput("");

    try {
      const docRef = addDoc(collection(db, "idToId"), {
        messageContent: messageInput,
        email: user.email,
        uid: user.uid,
        timestamp: serverTimestamp(),
        userIcon: user.photoURL,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="col-span-5 px-2 mt-2 hidden lg:inline  border-x ">
      <div className=" items-center flex space-x-2 p-5 border-b mb-6">
        <img
          className="h-14 w-14 rounded-full object-cover mt-4"
          src={user.userIcon || avatar}
        />
        <div className="flex items-center justify-between ">
          <h1 className="p-5 pb-0 text-md font-bold">{name}</h1>
        </div>
      </div>

      {/* map all message and use if else to differentiate whether the message is  from others/me */}
      <div className="w-full px-5 flex flex-col justify-between">
        <div className="flex flex-col mt-5 mb-96">
          <div className="flex justify-start mb-4">
            <img
              className="h-12 w-12 rounded-full object-cover mt-4"
              src={avatar}
              alt="usericon"
            ></img>
            <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
              message by others
            </div>
          </div>

          <div className="flex justify-end mb-4">
            <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
              message by ME
            </div>
            <img
              className="h-12 w-12 rounded-full object-cover mt-4"
              src={avatar}
              alt="usericon"
            ></img>
          </div>
        </div>

        <form onSubmit={submitHandler}></form>
        <div className="py-5">
          <input
            onChange={messageInputHandler}
            className=" w-full bg-gray-300 py-5 px-3 rounded-xl"
            type="text"
            placeholder="type your message here..."
          />
        </div>
      </div>
    </div>
  );
}

export default Chats;
