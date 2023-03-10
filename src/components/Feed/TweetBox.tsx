import React, { useContext, useRef, useState } from "react";
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

interface ButtonProps {
  onFetch: () => void;
}
function TweetBox({ onFetch }: ButtonProps) {
  const ctx = useContext(UserContext);
  const [tweetContent, setTweetContent] = useState("");
  //set image
  const [selectedImage, setSelectedImage] = useState([]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files;
    const selectedFileArray = Array.from(selectedFile);

    const imageArray = selectedFileArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImage(imageArray);
  };
  //////push image to firestore

  ////////////
  function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    setTweetContent("");
    setSelectedImage([]);

    try {
      const docRef = addDoc(collection(db, "tweets"), {
        tweetContent: tweetContent,
        email: ctx.email,
        image: selectedImage,
      });
    } catch (e) {
      console.log("error");
    }

    const randomId = Math.random().toString(36).substring(2, 9) + "";

    ///push image to fb storage
    // const storage = getStorage();

    // const uploadRef = ref(storage, `tweetImages/${randomId}.png`);

    // uploadString(uploadRef, selectedImage[0], "data_url").then((snapshot) => {
    //   console.log("Uploaded a data_url string!");
    //   console.log(snapshot);
    // });
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
