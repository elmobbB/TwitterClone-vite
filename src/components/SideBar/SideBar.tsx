import React, { Component, useState } from "react";
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
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import SideBarRow from "./SideBarRow";
import TweetButton from "./TweetButton";
import firebase from "firebase/compat/app";
import { icon } from "@fortawesome/fontawesome-svg-core";
import SetIcon from "./modal/setIcon";
import UserContext from "../store/UserContext";
import { useContext } from "react";
// interface SidebarRowProps {
//   Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
//   title: string;
// }
const SideBar = () => {
  const ctx = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  const signoutHandler = () => {
    firebase.auth().signOut();
  };

  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };

  const email = ctx.email;
  const name = email.substring(0, email.lastIndexOf("@"));

  return (
    <div className="col-span-2 items-center px-4 md:items-start">
      <img
        className="h-10 w-10 m-3"
        src="https://links.papareact.com/drq"
        alt="twiiter icon"
      />
      <SideBarRow Icon={HomeIcon} title="home" />
      <SideBarRow Icon={HashtagIcon} title="explore" />
      <SideBarRow Icon={BellIcon} title="notification" />
      <SideBarRow Icon={EnvelopeIcon} title="message" />
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
        <div className="flex text-center items-center my-60">
          <div>
            <img
              className="h-14 w-14 rounded-full object-cover"
              alt="profile pic"
              src="data:image/jpeg;base64,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"
            />
          </div>
          <div className="pl-4">
            <h2>{name}</h2>
            {/* <h2>{ctx.name}</h2> */}
            {/* <h3>{ctx.uid}</h3> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
