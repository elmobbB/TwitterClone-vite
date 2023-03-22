import React from "react";
import avatar from "../../../../img/avatar.svg";

interface Type {
  email: string | null;
  uid: string | null;
  userToReceiver: string;
}

function UsersMessagesThread({ email, uid, userToReceiver }: Type) {
  const username = email?.substring(0, email.lastIndexOf("@"));
  const handleClick = () => {
    console.log(userToReceiver);
  };
  return (
    <div
      onClick={handleClick}
      className=" items-center flex space-x-2 p-3 border-b cursor-pointer"
    >
      <img className="h-12 w-12 rounded-full object-cover " src={avatar} />
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
