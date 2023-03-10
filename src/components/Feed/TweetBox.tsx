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
import { collection, addDoc } from "firebase/firestore";
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

interface ButtonProps {
  onFetch: () => void;
}

function TweetBox({ onFetch }: ButtonProps) {
  const ctx = useContext(UserContext);
  const [tweetContent, setTweetContent] = useState("");
  //set image
  const [selectedImage, setSelectedImage] = useState([]);

  const [url, setUrl] = useState<string[]>([]);
  const [images, setImages] = useState([]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files;
    const selectedFileArray = Array.from(selectedFile);

    const imageArray = selectedFileArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImage(imageArray);
  };

  function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    setTweetContent("");
    setSelectedImage([]);

    const randomIdForTweetsImage =
      Math.random().toString(36).substring(2, 9) + "";

    //import image to storage
    const storage = getStorage();
    // const imageRef = storageRef.child(
    //   `tweetsImage/${randomIdForTweetsImage}.png`
    // );
    const imageRef = ref(storage, `tweetsImage/${randomIdForTweetsImage}.png`);

    uploadBytes(imageRef, selectedImage).then(() => {
      // Get the file's download URL

      getDownloadURL(imageRef).then((url: any) => {
        setUrl(url);

        // Store the file's URL in Firestore
        try {
          console.log("add doc , push to data base");
          const docRef = addDoc(collection(db, "tweets"), {
            tweetContent: tweetContent,
            email: ctx.email,
            image: selectedImage,
            url: url,
          });
        } catch (e) {
          console.log("error");
        }
      });
    });
  }

  function changeHandler(e: React.FormEvent<HTMLInputElement>) {
    setTweetContent(e.currentTarget.value);
  }

  return (
    <div className="flex space-x-2 p-5">
      <img
        className="h-14 w-14 rounded-full object-cover mt-4"
        alt="profile pic"
        src={ctx.icon ? ctx.icon : avatar}
      />
      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col" onSubmit={submitHandler}>
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
            {selectedImage &&
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
              })}
          </div>

          <div className="flex items-center">
            <div className=" flex flex-1 space-x-2 text-twitter">
              <PhotoIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150 " />
              <GifIcon className="h-5 w-5" />
              <PhotoIcon className="h-5 w-5" />
              <FaceSmileIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <MapIcon className="h-5 w-5" />
            </div>
            <div>
              <button
                onClick={onFetch}
                type="submit"
                disabled={!tweetContent}
                className="bg-twitter rounded-full px-5 py-2 font-bold text-white disabled:opacity-40"
              >
                Tweet
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default TweetBox;
