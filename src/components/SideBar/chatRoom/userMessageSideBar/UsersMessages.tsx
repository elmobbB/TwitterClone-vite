import React, { useContext, useEffect, useState } from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import UsersMessagesThread from "./UsersMessagesThread";
import UserContext from "../../../store/UserContext";
import MessageContext from "../../../store/MessageContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";
import { reverse } from "dns";
import { Select, MenuItem } from "@mui/material";
import { query, where } from "firebase/firestore";

interface myType {
  uid: string;
  email: string;
  photoURL: string;
  timestamp: string;
  id: string;
}
function UsersMessages() {
  const { user } = useContext(UserContext);
  const { message } = useContext(MessageContext);
  const [userCollection, setUserCollection] = useState<
    {
      uid: string;
      email: string;
      photoURL: string;
      timestamp: string;
      id: string;
    }[]
  >([]);

  useEffect(() => {
    //get user collection
    const getUserCollection = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, "data"), where("email", "!=", user.email))
      );

      console.log("get doc");
      const listOfUsers: myType[] = [];

      querySnapshot.forEach((doc: any) => {
        listOfUsers.push({ ...doc.data(), id: doc.id });
      });
      setUserCollection(listOfUsers);
    };
    getUserCollection();
  }, []);

  return (
    <div className="col-span-3 border-r hidden lg:inline">
      <div className=" items-center flex space-x-2 p-5 border-b">
        <div className="flex items-center justify-between ">
          <h1 className="p-5 pb-0 text-xl font-bold">Message</h1>
          <button>
            <Cog6ToothIcon className="h-8 w-8  mr-5 mt-5 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125" />
          </button>
        </div>
      </div>

      {userCollection.map((receiver) => {
        return (
          //make changes later
          <UsersMessagesThread
            userToReceiver={`${user.email}-AND-${receiver.email}`}
            key={receiver.id}
            receiverUid={receiver.uid}
            receiverEmail={receiver.email}
            receiverIcon={receiver.photoURL}
          />
        );
      })}
    </div>
  );
}

export default UsersMessages;
