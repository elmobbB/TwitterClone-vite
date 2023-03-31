import React, { useContext, useEffect, useState } from "react";
import avatar from "../../../../img/avatar.svg";
import MessageContext from "../../../store/MessageContext";
import { db } from "../../../../firebase";
import {
  addDoc,
  serverTimestamp,
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  FieldValue,
} from "firebase/firestore";
import UserContext from "../../../store/UserContext";
interface Type {
  receiverEmail: string | null;
  receiverUid: string | null;
  userToReceiver: string | null;
  receiverIcon: string | null;
  allReceivingMessage: any;
  index: number;
}
interface myType {
  email: string;
  messageContent: string;
  timestamp: string;
  uid: string;
  userIcon: string;
  receiver: string;
  id: string;
}
function UsersMessagesThread({
  receiverEmail,
  receiverUid,
  userToReceiver,
  receiverIcon,
  allReceivingMessage,
  index,
}: Type): any {
  const { message, setMessage } = useContext(MessageContext);
  const username = receiverEmail?.substring(0, receiverEmail.lastIndexOf("@"));
  const [uploadedMessage, setUploadedMessage] = useState<myType[]>([]);
  const { user } = useContext(UserContext);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  //get message

  const handleClick = async () => {
    // setIsActive(`${receiverUid}`);
    console.log(receiverUid);
    //get message when the user is clicked in the thread
    const doc_refs = await query(
      collection(db, `messages`),
      orderBy("timestamp", "asc")
    );
    //find meesages with the receiver
    onSnapshot(doc_refs, (snapshot) => {
      const loadedmessage: myType[] = [];

      snapshot.docs.forEach((doc: any) => {
        loadedmessage.push({ ...doc.data(), id: doc.id });
      });

      setUploadedMessage(loadedmessage);

      //useContext 1to store all message info
      setMessage({
        receiverEmail,
        receiverUid,
        userToReceiver,
        uploadedMessage: loadedmessage,
      });
    });
  };

  let time = {
    seconds: allReceivingMessage?.timestamp?.seconds,
    nanoseconds: allReceivingMessage?.timestamp?.nanoseconds,
  };

  const fireBaseTime = new Date(
    time.seconds * 1000 + time.nanoseconds / 1000000
  );
  const date = fireBaseTime.toDateString();
  const atTime = fireBaseTime.toLocaleTimeString();

  return (
    <div
      onClick={() => {
        handleClick();
        setSelectedIndex(index);
      }}
      className={`items-center flex space-x-2 p-3 border-b hover:bg-blue-200  cursor-pointer   
      ${index == selectedIndex ? "bg-blue-200" : ""}  
      `}
    >
      <img
        className="h-12 w-12 rounded-full object-cover "
        src={receiverIcon || avatar}
      />
      <div className=" items-center ">
        <h1 className="p-5 pb-0 text-lg">{username}</h1>
        <div className="flex justify-between ">
          <div className=" p-5 pb-0 text-xs  text-gray-500">
            {allReceivingMessage?.messageContent.slice(0, 13)}
          </div>
          <div className="p-5 pb-0 text-xs  text-gray-500">
            {allReceivingMessage?.timestamp?.seconds ? `${date}${atTime}` : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersMessagesThread;
