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

import {
  getStorage,
  ref,
  uploadString,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getDb } from "../../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import UserImageConText from "../store/UserImageContext";
import Message from "./message/Message";
interface SidebarRowProps {
  onPassIcon: (icon: string) => void;
}
interface myType {
  id: string;
  email: string;
  imageName: [];
  url: [];
}
const SideBar = ({ onPassIcon }: SidebarRowProps) => {
  const ctx = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [messageShowModal, setMessageShowModal] = useState(false);
  // const [userIcon, setUserIcon] =
  //   useState<React.ComponentType<React.SVGProps<SVGSVGElement>>>(avatar);
  const [imageUrl, setImageUrl] = useState("");
  const imgCtx = useContext(UserImageConText);
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

  const showMessageModalHandler = () => {
    setMessageShowModal(true);
  };

  const hideMessageModalHandler = () => {
    setMessageShowModal(false);
  };

  const email = ctx.email;
  const name = email.substring(0, email.lastIndexOf("@"));

  const imageUrlHandler = (url: any) => {
    setImageUrl(url);
  };

  // const fetchIcon = useCallback(async () => {
  //   try {
  //     const doc_refs = await getDocs(collection(getDb(), "userIcon"));

  //     const loadIcon: myType[] = [];

  //     doc_refs.forEach((icon) => {
  //       loadIcon.unshift({
  //         email: icon.data().email,
  //         id: icon.id,
  //         imageName: icon.data().imageName,
  //         url: icon.data().url,
  //       });
  //     });
  //     console.log(loadIcon);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }, []); //

  // useEffect(() => {
  //   fetchIcon();
  // }, []);

  return (
    <div className="col-span-2 items-center px-4 md:items-start">
      <img
        className="h-10 w-10 m-3"
        src="https://links.papareact.com/drq"
        alt="twiiter icon"
      />
      <button
        onClick={() => {
          window.location.reload();
        }}
      >
        <SideBarRow Icon={HomeIcon} title="home" />
      </button>
      <SideBarRow Icon={HashtagIcon} title="explore" />
      <SideBarRow Icon={BellIcon} title="notification" />

      <button onClick={showMessageModalHandler}>
        <SideBarRow Icon={EnvelopeIcon} title="message" />
      </button>
      {messageShowModal && <Message onClose={hideMessageModalHandler} />}

      <SideBarRow Icon={BookmarkIcon} title="bookmarks" />
      <SideBarRow Icon={ClipboardDocumentCheckIcon} title="lists" />

      <SideBarRow Icon={EllipsisHorizontalIcon} title="more" />
      <button onClick={showModalHandler}>
        <SideBarRow Icon={UserIcon} title="profile" />
      </button>
      {showModal && (
        <SetIcon passImageUrl={imageUrlHandler} onClose={hideModalHandler} />
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
              key={Math.random().toString(36).substring(2, 9)}
              className="h-14 w-14 rounded-full object-cover"
              alt="profile pic"
              // src={imgCtx.imageUrl ? imgCtx.imageUrl : avatar}
              src={
                localStorage.getItem("myUrl") //make changes later
                  ? localStorage.getItem("myUrl")
                  : avatar
              }
            />
            {/* {image.length > 0
              ? image.map((url) => (
                  <img
                    key={Math.random().toString(36).substring(2, 9)}
                    className="h-14 w-14 rounded-full object-cover"
                    alt="profile pic"
                    src={url}
                  />
                ))
              : userIcon} */}
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
