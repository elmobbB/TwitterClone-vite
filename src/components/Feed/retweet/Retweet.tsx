import React, { useState } from "react";
import Modal from "../../UI/Modal";
import { getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { getDb } from "../../../firebase";
interface Props {
  onClose: () => void;
  retweet: () => void;
  id: string;
}
interface myType {
  id: string;
  tweetContent: string;
  email: string;
  image: [];
  url: [];
  likes: number;
}

const Retweet = ({ onClose, id }: Props) => {
  const [postedtweets, setPostedTweets] = useState<
    {
      id: string;
      email: string;
      tweetContent: string;
      image: string;
      url: string;
      likes: number;
    }[]
  >([]);
  const fetchPostFromOthers = async () => {
    let tweetId = id;
    console.log(tweetId);
    try {
      const doc_refs = await getDocs(collection(getDb(), "tweets"));

      const loadedPostedTweets: myType[] = [];

      doc_refs.forEach((tweet: any) => {
        loadedPostedTweets.unshift({
          email: tweet.data().email,
          id: tweet.id,
          tweetContent: tweet.data().tweetContent,
          image: tweet.data().image,
          url: tweet.data().url,
          likes: tweet.data().likes,
        });
      });

      console.log(
        loadedPostedTweets.filter((tweet) => {
          return id === tweet.id;
        })
      );
      //   const sharedPost = loadedPostedTweets.filter((tweet) => {});
      setPostedTweets(loadedPostedTweets);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="text-center my-2">Confirm Retweet?</div>
      <div className="text-center">
        <button
          onClick={() => {
            onClose();
            fetchPostFromOthers();
          }}
          type="button"
          className="text-white lg:pr-20 lg:pl-20  bg-twitter hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-700  "
        >
          Confirm
        </button>
        <button
          onClick={onClose}
          type="button"
          className="text-white lg:pr-20 lg:pl-20  bg-twitter hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-700  "
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default Retweet;
