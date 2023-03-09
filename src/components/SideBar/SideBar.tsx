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
import SetIcon from "./modal/SetIcon";
import UserContext from "../store/UserContext";
import { useContext } from "react";
import avatar from "../../img/avatar.svg";

interface SidebarRowProps {}
const SideBar = () => {
  const ctx = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [userIcon, setUserIcon] =
    useState<React.ComponentType<React.SVGProps<SVGSVGElement>>>(avatar);

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

  const email = ctx.email;
  const name = email.substring(0, email.lastIndexOf("@"));

  const imageHandler = (image) => {
    console.log(image[0], "😁😁😁😁😁😁😁😁😁");
    console.log(image, "🤏🏿🤏🏿🤏🏿🤏🏿🤏🏿🤏🏿🤏🏿🤏🏿🤏🏿");
    setUserIcon(image[0]);
  };
  console.log(userIcon);
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
      {showModal && (
        <SetIcon onPassImage={imageHandler} onClose={hideModalHandler} />
      )}

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
              className="h-14 w-14 rounded-full object-cover"
              alt="profile pic"
              src={userIcon}
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
