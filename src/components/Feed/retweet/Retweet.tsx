import React, { useContext, useState } from "react";
import Modal from "../../UI/Modal";
import { db } from "../../../firebase";
import UserContext from "../../store/UserContext";
import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
  addDoc,
  collection,
} from "firebase/firestore";
import firebase from "../../../firebase";
import { FieldValue, setDoc, increment } from "firebase/firestore";
interface Props {
  onClose: () => void;
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
  const [loading, setLoading] = useState(false);
  const [retweetsIncrement, setRetweetsIncrement] = useState(0);

  const fetchPostFromOthers = async () => {
    setLoading(true);

    await setRetweetsIncrement((prev) => prev++);
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
              ...docSnap.data(),
              // tweetContent: docSnap.data().tweetContent,
              // email: ctx.email,
              // image: docSnap.data().image,
              // url: docSnap.data().url,
              // likes: 0,
              retweetFrom: docSnap.data().email,
              timestamp: serverTimestamp(),
              // retweetTimes: 0,
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
              timestamp: serverTimestamp(),
              retweetTimes: 0,
              userIcon: ctx.photoURL,
            });
          } catch (e) {
            console.log("error");
          }
        }
      } else {
        console.log("No such document!");
      }

      ////change the retweetTimes, increment by 1

      try {
        const updateRef = doc(db, "tweets", `${id}`);

        // Set the "capital" field of the city 'DC'

        await updateDoc(updateRef, {
          retweetTimes: increment(1),
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error: any) {
      console.log(error.message);
    }
    setLoading(false);
  };

  return (
    <div>
      {loading && (
        <div className="mb-3 inset-0 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        </div>
      )}
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
    </div>
  );
};

export default Retweet;
