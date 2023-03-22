import React, { useEffect, useState, useCallback } from "react";
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  EnvelopeIcon,
  UserIcon,
  HomeIcon,
  EllipsisHorizontalIcon,
  ClipboardDocumentCheckIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

import SideBarRow from "./SideBarRow";
import TweetButton from "./TweetButton";
import firebase from "firebase/compat/app";
import { icon } from "@fortawesome/fontawesome-svg-core";
import SetIcon from "./modal/SetIcon";
import UserContext from "../store/UserContext";
import { useContext } from "react";
import avatar from "../../img/avatar.svg";
import ChatRoom from "./chatRoom/ChatRoom";
import { UserIconContext } from "../store/UserImageContext";
import { BrowserRouter, Route, Routes, Router, Link } from "react-router-dom"; //use routes instead of switch

interface SidebarRowProps {
  onPassIcon: (icon: string) => void;
}
interface myType {
  id: string;
  email: string;
  imageName: [];
  url: [];
}

const SideBar = () => {
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [messageShowModal, setMessageShowModal] = useState(false);

  const ctxUserIcon = useContext(UserIconContext);
  const signoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("sign Out");
      });
  };

  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };

  // const showMessageModalHandler = () => {
  //   setMessageShowModal(true);
  // };

  // const hideMessageModalHandler = () => {
  //   setMessageShowModal(false);
  // };

  // console.log("siodeL ", user.email, user.userIcon);

  const email = user?.email;
  const name = email?.substring(0, email.lastIndexOf("@"));

  console.log("compnoent: ", user.photoURL);
  return (
    <div className="col-span-2 items-center px-4 md:items-start">
      <img
        className="h-10 w-10 m-3"
        src="https://links.papareact.com/drq"
        alt="twiiter icon"
      />
      <Link to="/">
        <SideBarRow Icon={HomeIcon} title="home" />
      </Link>

      {/* <button
        onClick={() => {
          window.location.reload();
        }}
      >
        <SideBarRow Icon={HomeIcon} title="home" />
      </button> */}
      <SideBarRow Icon={HashtagIcon} title="explore" />
      <SideBarRow Icon={BellIcon} title="notification" />
      {/* <button onClick={showMessageModalHandler}>
        <SideBarRow Icon={EnvelopeIcon} title="message" />
      </button> */}
      {/* {messageShowModal && <ChatRoom onClose={hideMessageModalHandler} />} */}
      <Link to="/chatroom">
        <SideBarRow Icon={EnvelopeIcon} title="message" />
      </Link>

      <SideBarRow Icon={BookmarkIcon} title="bookmarks" />
      <SideBarRow Icon={ClipboardDocumentCheckIcon} title="lists" />

      <SideBarRow Icon={EllipsisHorizontalIcon} title="more" />
      <button onClick={showModalHandler}>
        <SideBarRow Icon={UserIcon} title="profile" />
      </button>
      {showModal && <SetIcon onClose={hideModalHandler} />}
      <button
        onClick={signoutHandler}
        className="flex max-w-fit items-center space-x-2 px-4 py-3 rounded-full  hover:bg-gray-100 transition-all duration-200 group"
      >
        <ArrowLeftOnRectangleIcon className="h-7 w-7" />
        <p className="hidden group-hover:text-twitter md:inline-flex text-base lg:text-xl ">
          Sign Out
        </p>
      </button>
      <TweetButton />
      <div className="static hidden lg:block">
        <div className="flex text-center items-center my-40">
          <div>
            <img
              key={Math.random().toString(36).substring(2, 9)}
              className="h-14 w-14 rounded-full object-cover"
              alt="profile pic"
              src={user.userIcon || avatar}
            />
          </div>
          <div className="pl-4">
            <h2>{name}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
