import React, { useContext, useState, useEffect } from "react";
import {
  ChatBubbleOvalLeftIcon,
  ShareIcon,
  HeartIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import PostIcon from "./PostIcon";
import UserContext from "../store/UserContext";
import avatar from "../../img/avatar.svg";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { getDb } from "../../firebase";
import firebase from "../../firebase";
import Retweet from "./retweet/Retweet";

interface Props {
  id: string;
  name: string;
  postDate: any;
  tweetContent: string;
  imgPath: string;
  email: string;
  image: any;
  url: string;
  likes: number;
  retweetFrom: string;
}
function AddPosts({
  image,
  id,
  name,
  postDate,
  tweetContent,
  imgPath,
  email,
  url,
  likes,
  retweetFrom,
}: Props) {
  // const [numberOfLikes, setNumberOfLikes] = useState(0);
  const [numberOfLikes, setNumberOfLikes] = useState<number | null>(
    +localStorage.getItem(`likes-${id}`) || 0
  );
  const tweetName = email.substring(0, email.lastIndexOf("@"));
  const ctx = useContext(UserContext);
  const [filled, setFilled] = useState<boolean>(
    localStorage.getItem(`isLiked-${id}`) === "true" || false
  );

  let tweetId = "";
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    localStorage.setItem(`likes-${id}`, numberOfLikes);
    localStorage.setItem(`isLiked-${id}`, filled);
  }, [numberOfLikes, filled]);

  const handleClick = async () => {
    tweetId = id;
    console.log(tweetId);
    // setFilled(!filled);
    // setNumberOfLikes(numberOfLikes === 0 ? 1 : 0);

    if (!filled) {
      setNumberOfLikes(numberOfLikes + 1);
      setFilled(true);
    } else {
      setNumberOfLikes(numberOfLikes - 1);
      setFilled(false);
    }
  };
  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };

  return (
    <li className="flex space-x-2 p-5 border">
      <img
        className="h-14 w-14 rounded-full object-cover mt-4"
        alt="profile image"
        src={
          localStorage.getItem("myUrl") ? localStorage.getItem("myUrl") : avatar
        }
      />
      <div className="w-11/12 ">
        <div className="flex w-11/12 ">
          <h2 className="l pr-3 font-bold">{name}</h2>
          <h2 className="text-gray-500 pr-2">@{tweetName}</h2>
          <h2 className="text-gray-500">{postDate}</h2>
        </div>
        {retweetFrom && (
          <div className="text-l font-semibold text-blue-600/100 dark:text-blue-500/100">
            Retweet from:@
            {retweetFrom.substring(0, retweetFrom.lastIndexOf("@"))}
          </div>
        )}
        <div className="mb-4 w-11/12  ">{tweetContent}</div>
        <div className="mb-4">
          {url && (
            <img
              className="object-cover sm:object-scale-down"
              alt="uploaded picture"
              src={url.length > 0 ? url : ""}
            />
          )}
        </div>
        <div className="flex flex-1 sm:space-x-2 lg:space-x-6 md:space-x-2  w-10/12  ">
          <PostIcon Icon={ChatBubbleOvalLeftIcon} title="3777" />
          <button
            onClick={() => {
              // retweetHandler();
              showModalHandler();
            }}
          >
            <PostIcon Icon={ShareIcon} title="10.9K" />
          </button>
          {showModal && <Retweet id={id} onClose={hideModalHandler} />}
          <div
            onClick={handleClick}
            className="flex max-w-fit items-center space-x-2 px-4 py-3 rounded-full  hover:bg-gray-100 transition-all duration-200 group"
          >
            {filled ? (
              <HeartIcon className="h-6 w-6 fill-red-400" />
            ) : (
              <HeartIcon className="h-6 w-6" />
            )}
            <p className=" group-hover:text-twitter  text-base ">
              {numberOfLikes}
            </p>
          </div>
          <PostIcon Icon={ChartBarIcon} title="9.1M" />
        </div>
      </div>
    </li>
  );
}

export default AddPosts;
