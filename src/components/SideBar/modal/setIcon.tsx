import React, { useContext, useState, useEffect, useCallback } from "react";
import Avatar from "react-avatar-edit";

import {
  getStorage,
  ref,
  uploadString,
  uploadBytes,
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
  // imageName: string;
  imageUrl: string;
}

function SetIcon({ onClose, passImageUrl }: Props) {
  const ctx = useContext(UserContext);
  const { imageUrl, setImageUrl } = useContext(UserImageConText);

  const [imgCrop, setImgCrop] = useState("");
  const [storeImg, setStoreImg] = useState(""); //the view
  const [imageName, setImageName] = useState("");
  const [loading, setLoading] = useState(false);
  // const [storeImg, setStoreImg] = useState<
  //   {
  //     imgCrop: string;
  //     storeImg: string;
  //   }[]
  // >([]);
  const [saveMessage, setSaveMessage] = useState("Save");
  const onCrop = (view) => {
    console.log("on crop");
    setImgCrop(view);
  };
  const onClose2 = () => {
    console.log("on close");
    setImgCrop(""); //null?
  };

  const randomId = Math.random().toString(36).substring(2, 9) + "";
  const saveImg = async () => {
    setLoading(true);
    //import image to storage
    const storage = getStorage();

    const uploadRef = ref(storage, `images/${randomId}.png`);

    console.log(randomId);
    try {
      uploadString(uploadRef, imgCrop, "data_url").then((snapshot) => {
        console.log("Uploaded a data_url string!");
        console.log(snapshot);
        setStoreImg(imgCrop);
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    try {
      //push image info to cloud storage, including uid, email, imageUrl
      setImageName(`${randomId}.png`);
      const docRef = await addDoc(collection(db, "userIcon"), {
        imageName: `${randomId}.png`,
        uid: ctx.uid,
        email: ctx.email,
      });
      console.log(`${randomId}.png`, " ✌🏽");

      //get imageUrl
      const storage = getStorage();
      const singleRef = ref(storage, `images/${randomId}.png`);
      console.log(singleRef, "singleRef", "imageName: ", `${randomId}.png`);
      getDownloadURL(singleRef).then((url) => {
        console.log("got single:🎃 ", url);
        localStorage.setItem("myImage", url);
        setImageUrl(url);
      });
    } catch (e) {
      console.log("error");
    }

    // setStoreImg([...storeImg, { imgCrop }]);
    setLoading(false);
    setSaveMessage("Save✅");

    console.log("save");

    console.log("fetch 😺");
    console.log(imageName, "imagename");
  };

  //get icon from firebase'

  // useEffect(() => {
  //   const storage = getStorage();
  //   const image = `images/${storeImg}`;
  //   const singleRef = ref(storage, image);
  //   getDownloadURL(singleRef).then((url) => {
  //     console.log("single: ", url);
  //     setImageUrl(url);
  //   });
  //   ////list all blob/file
  //   // const listRef = ref(storage, "images/");
  //   // listAll(listRef)
  //   //   .then((res) => {
  //   //     res.items.forEach((itemRef) => {
  //   //       getDownloadURL(itemRef).then((url) => {
  //   //         // setImage((prev) => [...prev, url]);
  //   //         setImage(url);
  //   //       });
  //   //     });
  //   //   })
  //   //   .catch((error) => {
  //   //     alert(error);
  //   //   });
  // }, []);

  // useEffect(() => {
  //   //get imageUrl
  //   const storage = getStorage();

  //   // const singleRef = ref(storage, "images/7ef29md.png");
  //   const singleRef = ref(storage, `images${imageName}`);
  //   getDownloadURL(singleRef).then((url) => {
  //     console.log("single:🎃 ", url);
  //     setImageUrl(url);
  //   });
  // }, []);

  // const fetchimage = useCallback(async () => {
  //   console.log("when run? 😺");
  //   try {
  //     const doc_refs = await getDocs(collection(getDb(), "userIcon"));

  //     const loadedIcon: myType[] = [];

  //     doc_refs.forEach((userIcon) => {
  //       loadedIcon.push({
  //         imageUrl: imageUrl,
  //         imageName: userIcon.data().imageName,
  //         email: userIcon.data().email,
  //         uid: userIcon.data().uid,
  //         id: userIcon.id,
  //       });
  //     });
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.log(error.message);
  //     } else {
  //       console.log("Unexpected error", error);
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchimage();
  // }, [fetchimage]);

  return (
    <Modal className="p-10" onClose={onClose}>
      {loading && (
        <div className="mb-30 inset-0 flex items-center justify-center">
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
