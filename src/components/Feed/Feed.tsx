import React, { useEffect, useState, useCallback, useContext } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import TweetBox from "./TweetBox";
import Posts from "./Posts";
import { getDocs, collection } from "firebase/firestore";
import { getDb } from "../../firebase";
import AddPosts from "./AddPosts";
import UserContext from "../store/UserContext";

const Feed = () => {
  const ctx = useContext(UserContext);
  const [tweets, setTweets] = useState<
    {
      // key: string;
      id: string;
      name: string;
      postDate: string;
      tweetContent: string;
      imgPath: string;
    }[]
  >([]);
  const [postedTweets, setPostedTweets] = useState<
    {
      // key: string;
      id: string;
      email: string;
      // name: string;
      // postDate: string;
      tweetContent: string;
      // imgPath: string;
    }[]
  >([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  //fake data
  const fetchTweets = useCallback(async () => {
    setIsloading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://twitterclone-f51ff-default-rtdb.firebaseio.com/tweets.json"
      );
      const responseData = await response.json();

      if (!response.ok) {
        setIsloading(false);
        throw new Error(`${responseData.message} (${responseData.status})`);
      }

      interface myType {
        id: string;
        name: string;
        postDate: string;
        tweetContent: string;
        imgPath: string;
      }

      const loadedTweets: myType[] = [];

      for (const key in responseData) {
        loadedTweets.push({
          id: responseData[key].id,
          name: responseData[key].name,
          postDate: responseData[key].postDate,
          tweetContent: responseData[key].tweetContent,
          imgPath: responseData[key].imgPath,
        });
      }

      setTweets(loadedTweets);
      setIsloading(false);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Unexpected error", error);
      }
    }
  }, []); //
  useEffect(() => {
    setIsloading(false);
    fetchTweets();
  }, []);
  ////

  //user post tweets
  const fetchPostedTweets = useCallback(async () => {
    setIsloading(true);
    setError(null);

    try {
      const doc_refs = await getDocs(collection(getDb(), "tweets"));

      console.log();

      interface myType {
        id: string;
        tweetContent: string;
        email: string;
      }
      const loadedPostedTweets: myType[] = [];

      doc_refs.forEach((tweet) => {
        loadedPostedTweets.unshift({
          email: tweet.data().email,
          id: tweet.id,
          tweetContent: tweet.data().tweetContent,
        });
      });
      setPostedTweets(loadedPostedTweets);
      setIsloading(false);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Unexpected error", error);
      }
    }
  }, []); //

  useEffect(() => {
    setIsloading(false);
    fetchPostedTweets();
  }, []);
  const clickrefreshHandler = () => {
    fetchPostedTweets();
    window.location.reload();
  };

  return (
    <div className="col-span-7 lg:col-span-5  border-x">
      {/* by default it will be span 7 , when it hits to a large screen, then span 5 */}
      <div className="flex items-center justify-between ">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <button onClick={clickrefreshHandler}>
          <ArrowPathIcon className="h-8 w-8  mr-5 mt-5 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125" />
        </button>
      </div>
      <TweetBox onFetch={fetchPostedTweets} />

      <ul>
        {postedTweets
          .slice(0)
          .reverse()
          .map((post) => {
            return (
              <AddPosts
                email={post.email}
                key={post.id}
                id={post.id}
                tweetContent={post.tweetContent}
              />
            );
          })}
      </ul>
      {isLoading ? (
        <ul className=" text-center"></ul>
      ) : (
        <ul>
          {/* rmb to add return -_- */}
          {tweets.map((post) => {
            return (
              <Posts
                key={post.id}
                id={post.id}
                name={post.name}
                postDate={post.postDate}
                imgPath={post.imgPath}
                tweetContent={post.tweetContent}
              />
            );
          })}
        </ul>
      )}
      {!isLoading && error && <p>{error}</p>}
    </div>
  );
};
export default Feed;
