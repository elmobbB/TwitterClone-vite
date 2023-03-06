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
// interface SidebarRowProps {
//   Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
//   title: string;
// }
const SideBar = () => {
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
    </div>
  );
};

export default SideBar;
