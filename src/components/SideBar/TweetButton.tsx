import React, { useContext } from "react";
import UserImageConText from "../store/UserImageContext";
export default function TweetButton() {
  return (
    <div className="text-center">
      <button
        type="button"
        className="text-white lg:pr-20 lg:pl-20  bg-twitter hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-700  "
      >
        Tweet
      </button>
    </div>
  );
}
