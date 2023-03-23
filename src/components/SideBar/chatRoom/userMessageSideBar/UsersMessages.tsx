import React, { useContext } from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import UsersMessagesThread from "./UsersMessagesThread";
import UserContext from "../../../store/UserContext";
import MessageContext from "../../../store/MessageContext";
// interface myType {
//   receiverEmail: string | null;
//   receiverUid: string | null;
//   userToReceiver: string | null;
// }

function UsersMessages() {
  const { user } = useContext(UserContext);
  const { message } = useContext(MessageContext);
  const userArray = [
    "fsfs@gmail.com",
    "1@1.com",
    "elmomoyeahyeah@gmail.com",
    "pnthaha@gmail.com",
  ];

  const arrOfObj = [
    {
      uid: "2C7w47vCbOUDgD45MolSL4lec6E2",
      email: "fsfs@gmail.com",
      userIcon: "",
    },
    { uid: "rUDx5HzPHOWjT22pbXcf9nRbWd73", email: "1@1.com" },
    { uid: "9PMVwuBoLSajinPgdaUYHuC53H42", email: "elmomoyeahyeah@gmail.com" },
    { uid: "RsmdqQWXdMessGwN9V3jFLi5lMx1", email: "pnthaha@gmail.com" },
  ];

  return (
    <div className="col-span-7 lg:col-span-3 border-r">
      <div className=" items-center flex space-x-2 p-5 border-b">
        <div className="flex items-center justify-between ">
          <h1 className="p-5 pb-0 text-xl font-bold">Message</h1>
          <button>
            <Cog6ToothIcon className="h-8 w-8  mr-5 mt-5 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125" />
          </button>
        </div>
      </div>
      {arrOfObj.map((receiver) => {
        return (
          //make changes later
          <UsersMessagesThread
            userToReceiver={`${user.email}-TO-${receiver.email}`}
            key={`${user.uid}-to-${receiver.uid}`}
            receiverUid={receiver.uid}
            receiverEmail={receiver.email}
          />
        );
      })}
    </div>
  );
}

export default UsersMessages;
