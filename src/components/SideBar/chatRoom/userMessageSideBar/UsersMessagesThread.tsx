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
}: Type) {
  const { message, setMessage } = useContext(MessageContext);
  const username = receiverEmail?.substring(0, receiverEmail.lastIndexOf("@"));
  const [uploadedMessage, setUploadedMessage] = useState<myType[]>([]);
  const [receiverSelected, setReceiverSelected] = useState(false);
  const { user } = useContext(UserContext);

  //get message
  const handleClick = async () => {
    console.log(userToReceiver);

    setReceiverSelected((prev) => !prev);
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

  console.log(allReceivingMessage);

  return (
    <div
      onClick={() => {
        handleClick();
        // setReceiverSelected(true);
      }}
      className={`items-center flex space-x-2 p-3 border-b cursor-pointer ${
        receiverSelected ? "bg-blue-200" : ""
      }
      `}
    >
      <img
        className="h-12 w-12 rounded-full object-cover "
        src={receiverIcon || avatar}
      />
      <div className=" items-center justify-between ">
        <h1 className="p-5 pb-0 text-lg">{username}</h1>
        <div className="flex items-center  justify-content">
          <h1 className="p-5 pb-0 text-xs text-gray-500">
            {allReceivingMessage?.messageContent}
          </h1>
          {/* <h3 className="p-5 pb-0 text-xs">{allReceivingMessage?.timestamp}</h3> */}
        </div>
      </div>
    </div>
  );
}

export default UsersMessagesThread;
