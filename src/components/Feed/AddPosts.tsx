import React, { useContext } from "react";
import {
  ChatBubbleOvalLeftIcon,
  ShareIcon,
  HeartIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import PostIcon from "./PostIcon";
import UserContext from "../store/UserContext";
import avatar from "../../img/avatar.svg";
interface Props {
  id: string;
  name: string;
  postDate: any;
  tweetContent: string;
  imgPath: string;
  email: string;
  image: any;
}
function AddPosts({
  image,
  id,
  name,
  postDate,
  tweetContent,
  imgPath,
  email,
}: Props) {
  const tweetName = email.substring(0, email.lastIndexOf("@"));
  const ctx = useContext(UserContext);
  // const myRequest = new Request(image);

  // const blobToImage = (blob) => {
  //   return new Promise((resolve) => {
  //     const url = URL.createObjectURL(blob);
  //     let img = new Image();
  //     img.onload = () => {
  //       URL.revokeObjectURL(url);
  //       resolve(img);
  //     };
  //     img.src = url;
  //   });
  // };
  // const newImage = blobToImage(image);
  // console.log(newImage);
  // console.log(image);
  return (
    <li className="flex space-x-2 p-5 border">
      <img
        className="h-14 w-14 rounded-full object-cover mt-4"
        alt="profile image"
        src={ctx.icon ? ctx.icon : avatar}
      />
      <div className="w-11/12 ">
        <div className="flex w-11/12 ">
          <h2 className="l pr-3 font-bold">{name}</h2>
          <h2 className="text-gray-500 pr-2">@{tweetName}</h2>
          <h2 className="text-gray-500">{postDate}</h2>
        </div>
        <div className="mb-4 w-11/12  ">{tweetContent}</div>
        <div className="mb-4">
          {image && (
            <img
              className="object-cover sm:object-scale-down"
              alt="uploaded picture"
              src={image}
            />
          )}
        </div>
        <div className="flex flex-1 sm:space-x-2 lg:space-x-6 md:space-x-2  w-10/12  ">
          <PostIcon Icon={ChatBubbleOvalLeftIcon} title="3777" />
          <PostIcon Icon={ShareIcon} title="10.9K" />
          <PostIcon Icon={HeartIcon} title="88.4K" />
          <PostIcon Icon={ChartBarIcon} title="9.1M" />
        </div>
      </div>
    </li>
  );
}

export default AddPosts;
