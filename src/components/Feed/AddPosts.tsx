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
import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { getDb } from "../../firebase";
import firebase from "../../firebase";
import Retweet from "./retweet/Retweet";
interface Props {
  id: string;
  // postDate: any;
  tweetContent: string;
  email: string;
  retweetFrom: string;
  url?: string | null;
  likes?: number | null;
  onFetch: () => {};
  retweetTimes: number;
  userIcon: "";
}
const AddPosts = ({
  id,
  // postDate,
  tweetContent,
  email,
  url,
  likes,
  retweetFrom,
  onFetch,
  retweetTimes,
  userIcon,
}: Props) => {
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

  /////////
  useEffect(() => {
    localStorage.setItem(`isLiked-${id}`, `${filled}`);
  }, [filled]);
  const handleClick = async () => {
    tweetId = id;
    if (!filled) {
      setFilled(true);
      const updateRef = doc(db, "tweets", `${id}`);

      await updateDoc(updateRef, {
        // likeBy: ctx.uid,
        likes: increment(1),
      });
      console.log("+1");
      // setNumberOfLikes(numberOfLikes + 1);
    } else {
      setFilled(false);
      const updateRef = doc(db, "tweets", `${id}`);

      await updateDoc(updateRef, {
        // likeBy: ctx.uid,
        likes: increment(-1),
      });
      console.log("-1");
      // setNumberOfLikes(numberOfLikes - 1);
    }
  };
  //whenever the state changes, the localstorage's value will change as well
  // useEffect(() => {
  //   localStorage.setItem(`likes-${id}`, `${numberOfLikes}`);
  //   localStorage.setItem(`isLiked-${id}`, `${filled}`);
  // }, [numberOfLikes, filled]);

  // const handleClick = async () => {
  //   tweetId = id;
  //   console.log(tweetId);

  //   if (!filled) {
  //     setNumberOfLikes((prevNumberOfLikes) => {
  //       if (prevNumberOfLikes === null) {
  //         return null;
  //       }
  //       return prevNumberOfLikes + 1;
  //     });

  //     setFilled(true);
  //   } else {
  //     setNumberOfLikes((prevNumberOfLikes) => {
  //       if (prevNumberOfLikes === null || prevNumberOfLikes === 0) {
  //         return null;
  //       }
  //       return prevNumberOfLikes - 1;
  //     });
  //     setFilled(false);
  //   }
  // };
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
        // src={ctx.photoURL || avatar}
        src={userIcon || avatar}
      />
      <div className="w-11/12 ">
        <div className="flex w-11/12 ">
          {/* <h2 className="l pr-3 font-bold">{name}</h2> */}
          <h2 className="text-gray-500 pr-2">@{tweetName}</h2>
          {/* <h2 className="text-gray-500">{postDate}</h2> */}
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
              showModalHandler();
            }}
          >
            <PostIcon Icon={ShareIcon} title={retweetTimes} />
          </button>
          {showModal && (
            <Retweet onFetch={onFetch} id={id} onClose={hideModalHandler} />
          )}
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
              {/* {numberOfLikes} */}
              {likes}
            </p>
          </div>
          {/* <PostIcon Icon={ChartBarIcon} title="9.1M" /> */}
        </div>
      </div>
    </li>
  );
};

export default AddPosts;
