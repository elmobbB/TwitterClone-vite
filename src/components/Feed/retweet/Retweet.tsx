import React, { useContext, useState } from "react";
import Modal from "../../UI/Modal";
import { getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { getDb } from "../../../firebase";
import { addDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import UserContext from "../../store/UserContext";
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
  const ctx = useContext(UserContext);
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
      const tweetObj = loadedPostedTweets.filter((tweet) => {
        return id === tweet.id;
      });

      if (tweetObj[0].image) {
        try {
          console.log("add doc , push to data base");
          const docRef = addDoc(collection(db, "tweets"), {
            tweetContent: tweetObj[0].tweetContent,
            email: ctx.email,
            image: tweetObj[0].image,
            url: tweetObj[0].url,
            likes: 0,
            retweetFrom: tweetObj[0].email,
          });
        } catch (e) {
          console.log("error");
        }
      } else {
        try {
          console.log("add doc , push to data base");
          const docRef = addDoc(collection(db, "tweets"), {
            tweetContent: tweetObj[0].tweetContent,
            email: ctx.email,
            likes: 0,
            retweetFrom: tweetObj[0].email,
          });
        } catch (e) {
          console.log("error");
        }
      }

      console.log(
        loadedPostedTweets.filter((tweet) => {
          return id === tweet.id;
        })
      );
      //   const sharedPost = loadedPostedTweets.filter((tweet) => {});
      //   setPostedTweets(tweetObj);
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
