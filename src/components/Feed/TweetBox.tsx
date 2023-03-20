import React, {
  useContext,
  useRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  PhotoIcon,
  GifIcon,
  FaceSmileIcon,
  CalendarIcon,
  MapIcon,
} from "@heroicons/react/24/outline";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import UserContext from "../store/UserContext";
import Avatar from "@mui/material/Avatar";
import {
  ref,
  uploadBytes,
  uploadString,
  getStorage,
  getDownloadURL,
} from "firebase/storage";
import avatar from "../../img/avatar.svg";
import firebase from "../../firebase";
import "./Spinner.css";
interface ButtonProps {
  onFetch: () => void;
}

function TweetBox({ onFetch }: ButtonProps) {
  const ctx = useContext(UserContext);
  const [tweetContent, setTweetContent] = useState("");
  const [loading, setLoading] = useState(false);

  //set image
  // const [selectedImage, setSelectedImage] = useState([]);

  const [url, setUrl] = useState<string[]>([]);
  const [images, setImages] = useState([]);
  const [imageData, setImageData] = useState<string | null>(null);

  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    //e: React.ChangeEvent<HTMLInputElement>

    // const selectedFile = e.target.files;
    // const selectedFileArray = Array.from(selectedFile);

    // const imageArray = selectedFileArray.map((file) => {
    //   return URL.createObjectURL(file);
    // });

    // setSelectedImage(imageArray);

    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        setImageData(reader.result as string);
      };
    }
  };

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setTweetContent("");
    // setSelectedImage([]);
    setImageData("");
    setLoading(true);
    const randomIdForTweetsImage =
      Math.random().toString(36).substring(2, 9) + "";

    //import image to storage
    const storage = getStorage();

    if (imageData) {
      const imageRef = ref(
        storage,
        `tweetsImage/${randomIdForTweetsImage}.png`
      );

      await uploadString(imageRef, imageData, "data_url").then((snapshot) => {
        // Get the file's download URL
        getDownloadURL(imageRef).then((url: any) => {
          setUrl(url);
          // Store the file's URL in Firestore

          console.log("add doc , push to data base");
          const docRef = addDoc(collection(db, "tweets"), {
            tweetContent: tweetContent,
            email: ctx.email,
            uid: ctx.uid,
            image: `${randomIdForTweetsImage}.png`,
            url: url,
            likes: 0,
            likeBy: [],
            timestamp: serverTimestamp(),
            retweetTimes: 0,
            userIcon: ctx.photoURL,
          });
        });
      });
    } else {
      console.log("add doc , push to data base");
      const docRef = addDoc(collection(db, "tweets"), {
        tweetContent: tweetContent,
        email: ctx.email,
        uid: ctx.uid,
        likes: 0,
        likeBy: [],
        timestamp: serverTimestamp(),
        retweetTimes: 0,
        userIcon: ctx.photoURL,
      });
    }
    setLoading(false);
    onFetch();
    console.log("onfetch");
  };

  const handleDeleteImage = () => {
    setImageData("");
  };
  function changeHandler(e: React.FormEvent<HTMLInputElement>) {
    setTweetContent(e.currentTarget.value);
  }

  return (
    <div>
      {loading && (
        <div className="mb-3 inset-0 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        </div>
      )}
      <div className="flex space-x-2 p-5">
        <img
          className="h-14 w-14 rounded-full object-cover mt-4"
          alt="profile pic"
          src={ctx.photoURL || avatar}
        />

        <div className="flex flex-1 items-center pl-2">
          <form className="flex flex-1 flex-col" onSubmit={submitHandler}>
            {/* <input type="submit" /> */}
            <input
              value={tweetContent}
              onChange={changeHandler}
              className="h-24 w-full text-xl outline-none placeholder:text-xl"
              type="text"
              placeholder="What's Happening?"
            />
            <div className="border border-black rounded-lg max-w-fit">
              <label htmlFor="image" className="items-center  max-w-fit ">
                + Add Images
                <br />
                <input
                  type="file"
                  name="image"
                  onChange={onSelectFile}
                  multiple
                  accept="image/jpeg, image/png, image/webp, image/svg"
                />
              </label>
            </div>
            <div>
              <button
                disabled={!imageData}
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded my-1.5 disabled:opacity-40"
                onClick={handleDeleteImage}
              >
                Delete image
              </button>
              {imageData && (
                <img src={imageData} height="200" alt="Selected image" />
              )}
              {/* {selectedImage &&
              selectedImage.map((image, index) => {
                return (
                  <div key={image}>
                    <img src={image} height="200" alt="uploaded image" />
                    <button
                      onClick={() => {
                        setSelectedImage(
                          selectedImage.filter((e) => {
                            e !== image;
                          })
                        );
                      }}
                    >
                      delete image
                    </button>
                  </div>
                );
              })} */}
            </div>

            <div className="flex items-center">
              <div className=" flex flex-1 space-x-2 text-twitter">
                <PhotoIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150 " />

                {/* <GifIcon className="h-5 w-5" />
                <PhotoIcon className="h-5 w-5" />
                <FaceSmileIcon className="h-5 w-5" />
                <CalendarIcon className="h-5 w-5" />
                <MapIcon className="h-5 w-5" /> */}
              </div>
              <div>
                <button
                  type="submit"
                  disabled={tweetContent.trim().length === 0}
                  className="bg-twitter rounded-full px-5 py-2 font-bold text-white disabled:opacity-40"
                >
                  Tweet
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default TweetBox;
