import React, { useEffect, useState, useCallback, useContext } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import TweetBox from "./TweetBox";
// import Posts from "./Posts";
import { onSnapshot } from "firebase/firestore";
import AddPosts from "./AddPosts";
import { db } from "../../firebase";
import { collection, query, orderBy } from "firebase/firestore";

interface myType {
  id: string;
  tweetContent: string;
  email: string;
  image: [];
  url: string;
  likes: number;
  retweetFrom: string;
  timestamp: any;
  retweetTimes: number;
  userIcon: string;
}

const Feed = () => {
  const [postedTweets, setPostedTweets] = useState<
    {
      id: string;
      email: string;
      likes: number;
      tweetContent: string;
      retweetFrom: string;
      userIcon: string;
      url: string;
      timestamp: any;
      retweetTimes: number;
    }[]
  >([]);

  const [loading, setLoading] = useState(false);

  const fetchPostedTweets = useCallback(async () => {
    setLoading(true);

    try {
      const doc_refs = await query(
        collection(db, "tweets"),
        orderBy("timestamp", "desc")
      );

      onSnapshot(doc_refs, (snapshot) => {
        const loadedPostedTweets: myType[] = [];

        snapshot.docs.forEach((doc: any) => {
          loadedPostedTweets.push({ ...doc.data(), id: doc.id });
        });
        setPostedTweets(loadedPostedTweets);
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Unexpected error", error);
      }
    }
    setLoading(false);
  }, []); //

  useEffect(() => {
    fetchPostedTweets();
  }, []);

  const clickrefreshHandler = () => {
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
      {loading && (
        <div className="mb-3 inset-0 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        </div>
      )}
      <TweetBox />

      <ul>
        {postedTweets.map((post) => {
          return (
            <AddPosts
              email={post.email}
              key={post.id}
              id={post.id}
              tweetContent={post.tweetContent}
              url={post?.url}
              likes={post?.likes}
              retweetFrom={post.retweetFrom}
              retweetTimes={post.retweetTimes}
              userIcon={post.userIcon}
            />
          );
        })}
      </ul>
      {/* {isLoading ? (
        <ul className=" text-center"></ul>
      ) : (
        <ul>
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
      )} */}
    </div>
  );
};
export default Feed;
