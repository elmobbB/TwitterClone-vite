import React, { useContext, useState } from "react";
import avatar from "../../../img/avatar.svg";
import UserContext from "../../store/UserContext";
import { db } from "../../../firebase";
import {
  addDoc,
  serverTimestamp,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import MessageContext from "../../store/MessageContext";
import ScrollContainer from "./userMessageSideBar/ScrollContainer";
import ChatMessage from "./ChatMessage";
interface myType {
  email: string;
  timestamp: string;
  uid: string;
  userIcon: string;
  receiver: string;
  id: string;
}

function Chats() {
  const { user } = useContext(UserContext);
  const name = user.email?.substring(0, user.email.lastIndexOf("@"));
  const [messageInput, setMessageInput] = useState("");
  const { message } = useContext(MessageContext);

  const messageInputHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setMessageInput(e.currentTarget.value);
  };
  // console.log(message.uploadedMessage);
  // console.log(message.receiverEmail);
  const allMessages = message.uploadedMessage;
  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setMessageInput("");

    try {
      const docRef = await addDoc(collection(db, `messages`), {
        isHighlighted: false,
        messageContent: messageInput,
        email: user.email,
        uid: user.uid,
        timestamp: serverTimestamp(),
        userIcon: user.photoURL,
        receiver: message.receiverEmail,
        color: "transparent",
      });
      console.log("uploaded");
    } catch (error) {
      console.log(error);
    }
  };
  const [numItems, setNumItems] = useState(5);

  const currentUser = user.email;
  const receiver = message.receiverEmail; //context

  const randomkey = Math.random().toString(36).substring(2, 9) + "";

  return (
    <div className=" col-span-7 lg:col-span-5 px-2 mt-2  border-l border-r">
      <div className=" items-center flex space-x-2 p-5 border-b mb-6">
        <img
          className="h-14 w-14 rounded-full object-cover mt-4"
          src={user.userIcon || avatar}
        />
        <div className="flex items-center justify-between ">
          <h1 className="p-5 pb-0 text-md font-bold">{name}</h1>
        </div>
      </div>

      {message.isClick && (
        <div
          className="w-full "
          style={{
            height: "545px",
            border: "2px solid white",
          }}
        >
          <ScrollContainer scrollCta="New message!">
            {/* sort by timestamp */}
            {message.receiverEmail != null &&
              allMessages.map((message) => {
                return (
                  <div key={message.id}>
                    {/* take all messages out, filter the the current user and receiver's email  */}
                    {(message.email === currentUser &&
                      receiver === message.receiver) ||
                    (message.email === receiver &&
                      message.receiver === currentUser) ? (
                      <div>
                        {message.email === currentUser ? (
                          <div className="flex justify-end mb-4">
                            <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                              {message.messageContent}
                              {/* {receiver === message.receiver && message.messageContent} */}
                            </div>

                            <img
                              className="h-12 w-12 rounded-full object-cover mt-4"
                              src={message.userIcon || avatar}
                              alt="usericon"
                            ></img>
                          </div>
                        ) : (
                          <div className="flex justify-start mb-4">
                            <img
                              className="h-12 w-12 rounded-full object-cover mt-4"
                              src={message.userIcon}
                              alt="usericon"
                            ></img>
                            <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                              {message.messageContent || avatar}

                              {/* {receiver === message.receiver && message.messageContent} */}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>{/* user havent contacted the receiver */}</div>
                    )}
                  </div>
                );
              })}
          </ScrollContainer>
        </div>
      )}
      {/* {allMessages.length > 0 && ( */}
      {message.isClick && (
        <form onSubmit={submitHandler}>
          <div className="py-5 flex justify-between">
            <input
              type="text"
              onChange={messageInputHandler}
              className=" w-9/12 bg-gray-300 py-5 px-3 rounded-xl"
              placeholder="type your message here..."
              value={messageInput}
            />
            <div>
              <div className="mt-2">
                <button
                  disabled={!messageInput}
                  typeof="submit"
                  onClick={() => {
                    setNumItems(numItems + 1);
                  }}
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded my-1.5 disabled:opacity-40"
                >
                  send
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* )} */}
    </div>
  );
}

export default Chats;
