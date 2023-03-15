import React, { useContext, useState } from "react";
import Modal from "../../UI/Modal";
import { getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { getDb } from "../../../firebase";
import { addDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import UserContext from "../../store/UserContext";
import { doc, getDoc } from "firebase/firestore";
interface Props {
  onClose: () => void;
  id: string;
  onFetch: () => {};
}
interface myType {
  id: string;
  tweetContent: string;
  email: string;
  image: [];
  url: [];
  likes: number;
}

const Retweet = ({ onClose, id, onFetch }: Props) => {
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
      const docRef = doc(db, "tweets", tweetId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        if (docSnap.data().image) {
          try {
            console.log("add doc , push to data base");
            const docRef = await addDoc(collection(db, "tweets"), {
              tweetContent: docSnap.data().tweetContent,
              email: ctx.email,
              image: docSnap.data().image,
              url: docSnap.data().url,
              likes: 0,
              retweetFrom: docSnap.data().email,
            });
          } catch (e) {
            console.log("error");
          }
        } else {
          try {
            console.log("add doc , push to data base");
            const docRef = await addDoc(collection(db, "tweets"), {
              tweetContent: docSnap.data().tweetContent,
              email: ctx.email,
              likes: 0,
              retweetFrom: docSnap.data().email,
            });
          } catch (e) {
            console.log("error");
          }
        }
      } else {
        console.log("No such document!");
      }
    } catch (error: any) {
      console.log(error.message);
    }
    onFetch();
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
