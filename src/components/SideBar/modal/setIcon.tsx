import React, { useContext, useState, useEffect, useCallback } from "react";
import Avatar from "react-avatar-edit";

import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db, getDb } from "../../../firebase";
import Modal from "../../UI/Modal";

import avatar from "./../../../img/avatar.svg";
import UserContext from "../../store/UserContext";
import UserImageConText from "../../store/UserImageContext";
import "./Spinner.css";
interface Props {
  onClose: () => void;
  imgCrop: string | boolean;
  storeImg: string | boolean;
  passImageUrl: (url: string) => void;
}
interface myType {
  email: any;
  uid: any;
  id: string;
  url: string;
  imageName: string;
}

function SetIcon({ onClose, passImageUrl }: Props) {
  const ctx = useContext(UserContext);
  const { imageUrl, setImageUrl } = useContext(UserImageConText);

  const [imgCrop, setImgCrop] = useState("");
  const [storeImg, setStoreImg] = useState(""); //the view
  // const [imageName, setImageName] = useState("");

  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const [saveMessage, setSaveMessage] = useState("Save");
  const onCrop = (view: any) => {
    console.log("on crop");
    setImgCrop(view);
  };
  const onClose2 = () => {
    console.log("on close");
    setImgCrop(""); //null?
  };

  ////////////////should not be an array of objects, cuz i only need to render one single icon picture
  const fetchIconImage = useCallback(async () => {
    try {
      const doc_refs = await getDocs(collection(getDb(), "userIcon"));

      const urls: myType[] = [];
      doc_refs.forEach((doc) => {
        urls.unshift({
          url: doc.data().url,
          imageName: doc.data().imageName,
          email: doc.data().email,
          uid: doc.data().uid,
          id: doc.id,
        });
      });
      // setUrl(urls);
      console.log(urls, "ds");
    } catch (error: any) {
      console.log(error.message);
    }
  }, []); //

  useEffect(() => {
    fetchIconImage();
  }, []);
  const randomId = Math.random().toString(36).substring(2, 9) + "";
  const saveImg = async () => {
    setLoading(true);
    //import image to storage and get url
    const storage = getStorage();

    const uploadRef = ref(storage, `images/${randomId}.png`);

    uploadString(uploadRef, imgCrop, "data_url").then((snapshot) => {
      getDownloadURL(uploadRef).then((url: any) => {
        setUrl(url);
        setImageUrl(url);
        localStorage.setItem("myUrl", url);
        // Store the file's URL in Firestore
        try {
          console.log("add doc , push to data base");
          const docRef = addDoc(collection(db, "userIcon"), {
            imageName: `${randomId}.png`,
            url: url,
            uid: ctx.uid,
            email: ctx.email,
          });
        } catch (e) {
          console.log("error");
        }
      });

      setLoading(false);
      setSaveMessage("Save???");
    });
  };

  passImageUrl(url);
  return (
    <Modal className="p-10" onClose={onClose}>
      {loading && (
        <div className="mb-3 inset-0 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        </div>
      )}
      {!loading && (
        <div className="profile-img text-center p-4">
          <div className="div flex justify-center items-center">
            {!storeImg && (
              <Avatar
                width={400}
                height={300}
                onFileLoad={(file) => {
                  // console.log(file);
                }}
                onCrop={onCrop}
                onClose={onClose2}
              />
            )}

            <img
              className=" first-letter:w-60 h-60 rounded-full  object-cover"
              src={storeImg ? storeImg : ""}
            />
          </div>
          <button className="text-2xl font-semibold textColor">
            Update Profile
          </button>
          <div className="text-center">
            <button
              disabled={!imgCrop || saveMessage != "Save"}
              onClick={saveImg}
              type="button"
              className="text-white lg:pr-20 lg:pl-20  disabled:opacity-40 bg-twitter hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-700  "
            >
              {saveMessage}
            </button>
          </div>
        </div>
      )}
      <div className="text-center">
        <button
          onClick={onClose}
          type="button"
          className="text-white lg:pr-20 lg:pl-20  bg-twitter hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-700  "
        >
          Close
        </button>
      </div>
    </Modal>
  );
}

export default SetIcon;
