import React, { useContext, useState } from "react";
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
} from "firebase/firestore";
interface Type {
  receiverEmail: string | null;
  receiverUid: string | null;
  userToReceiver: string | null;
  receiverIcon: string | null;
}
interface myType {
  email: string;
  messageContent: string;
  timestamp: string;
  uid: string;
  userIcon: string;
}
function UsersMessagesThread({
  receiverEmail,
  receiverUid,
  userToReceiver,
  receiverIcon,
}: Type) {
  const { message, setMessage } = useContext(MessageContext);
  const username = receiverEmail?.substring(0, receiverEmail.lastIndexOf("@"));

  const [uploadedMessage, setUploadedMessage] = useState<
    {
      email: string;
      messageContent: string;
      timestamp: string;
      uid: string;
      userIcon: string;
    }[]
  >([]);

  const handleClick = async () => {
    console.log(userToReceiver);

    //get message when the user is clicked in the thread
    const doc_refs = await query(
      collection(db, `messages`),
      orderBy("timestamp", "asc")
    );

    onSnapshot(doc_refs, (snapshot) => {
      const loadedmessage: myType[] = [];

      snapshot.docs.forEach((doc: any) => {
        loadedmessage.push({ ...doc.data(), id: doc.id });
      });
      setUploadedMessage(loadedmessage);
    });
    //useContext to store all message info
    setMessage({ receiverEmail, receiverUid, userToReceiver });
  };

  console.log(uploadedMessage);
  return (
    <div
      onClick={handleClick}
      className=" items-center flex space-x-2 p-3 border-b cursor-pointer"
    >
      <img
        className="h-12 w-12 rounded-full object-cover "
        src={receiverIcon || avatar}
      />
      <div className=" items-center justify-between ">
        <h1 className="p-5 pb-0 text-lg">{username}</h1>
        <div className="flex items-center  justify-content">
          <h1 className="p-5 pb-0 text-xs">latest message content</h1>
          <h3 className="p-5 pb-0 text-xs">timestamp</h3>
        </div>
      </div>
    </div>
  );
}

export default UsersMessagesThread;
