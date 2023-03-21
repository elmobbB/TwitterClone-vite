import React, { useContext, useState } from "react";
import Avatar from "react-avatar-edit";

import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db, getDb } from "../../../firebase";
import Modal from "../../UI/Modal";

import avatar from "./../../../img/avatar.svg";
import UserContext from "../../store/UserContext";
import "./Spinner.css";
import { orderBy, query, onSnapshot } from "firebase/firestore";
import { where } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
interface Props {
  onClose: () => void;
  // imgCrop: string | boolean;
  // storeImg: string | boolean;
}
interface myType {
  email: any;
  uid: any;
  id: string;
  url: string;
  imageName: string;
}
interface UserContextType {
  userIcon: string;
  setUserIcon: (icon: string) => void;
}
function SetIcon({ onClose }: Props) {
  const { user, setUser } = useContext(UserContext);
  // const { user, setUser } = useContext(UserContext);

  const [imgCrop, setImgCrop] = useState("");
  const [storeImg, setStoreImg] = useState(""); //the view
  // const [imageName, setImageName] = useState("");

  const [url, setUrl] = useState<
    {
      email: any;
      uid: any;
      id: string;
      url: string;
      imageName: string;
    }[]
  >([]);

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

  const randomId = Math.random().toString(36).substring(2, 9) + "";

  const updateicon = async (email: string, url: string) => {
    const querySnapshot = await getDocs(
      query(collection(db, "tweets"), where("email", "==", email))
    );
    querySnapshot.forEach((doc) => {
      updateDoc(doc.ref, {
        userIcon: url,
      });
    });
  };

  const saveImg = async () => {
    setLoading(true);
    setStoreImg(imgCrop); //render the image after saving
    //import image to storage and get url
    const storage = getStorage();
    const uploadRef = ref(storage, `images/${randomId}.png`);
    uploadString(uploadRef, imgCrop, "data_url").then((snapshot) => {
      getDownloadURL(uploadRef).then(async (url: any) => {
        // Store the file's URL in Firestore
        try {
          const docRef = await addDoc(collection(db, "userIcon"), {
            imageName: `${randomId}.png`,
            url: url,
            uid: user.uid,
            email: user.email,
            timestamp: serverTimestamp(),
          });
          if (docRef) {
            if (user.email && url) {
              // update all tweet of the user with the user icon if upload success
              updateicon(user.email, url);
              setUser({
                ...user,
                userIcon: url,
              });
            }
          }
        } catch (e) {
          console.log("error", e);
        }
      });
      setLoading(false);
      setSaveMessage("Save✅");
    });
  };
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
