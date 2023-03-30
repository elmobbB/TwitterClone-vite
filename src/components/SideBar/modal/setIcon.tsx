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
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import Modal from "../../UI/Modal";

import UserContext from "../../store/UserContext";
import "./Spinner.css";
// interface Props {
//   onClose: () => void;
//   // imgCrop: string | boolean;
//   // storeImg: string | boolean;
// }

function SetIcon() {
  const { user, setUser } = useContext(UserContext);

  const [imgCrop, setImgCrop] = useState("");
  const [storeImg, setStoreImg] = useState(""); //the view

  const [loading, setLoading] = useState(false);

  const [saveMessage, setSaveMessage] = useState("Save");
  // const onCrop = (view: any) => {
  //   console.log("on crop");
  //   setImgCrop(view);
  // };
  // const onClose2 = () => {
  //   console.log("on close");
  //   setImgCrop(""); //null?
  // };

  // const randomId = Math.random().toString(36).substring(2, 9) + "";

  // //udpate all feed icon to the latest one
  // const updateicon = async (email: string, url: string) => {
  //   const querySnapshot = await getDocs(
  //     query(collection(db, "tweets"), where("email", "==", email))
  //   );
  //   querySnapshot.forEach((doc) => {
  //     updateDoc(doc.ref, {
  //       userIcon: url,
  //     });
  //   });
  //   //uupdate all icon in messages
  //   const querymessageSnapshot = await getDocs(
  //     query(collection(db, "messages"), where("email", "==", email))
  //   );
  //   querymessageSnapshot.forEach((doc) => {
  //     updateDoc(doc.ref, {
  //       userIcon: url,
  //     });
  //     console.log("upload");
  //   });
  // };
  console.log("fs");
  // const saveImg = async () => {
  //   setLoading(true);
  //   setStoreImg(imgCrop); //render the image after saving
  //   //import image to storage and get url
  //   const storage = getStorage();
  //   const uploadRef = ref(storage, `images/${randomId}.png`);
  //   uploadString(uploadRef, imgCrop, "data_url").then((snapshot) => {
  //     getDownloadURL(uploadRef).then(async (url: any) => {
  //       // Store the file's URL in Firestore
  //       try {
  //         const docRef = await addDoc(collection(db, "userIcon"), {
  //           imageName: `${randomId}.png`,
  //           url: url,
  //           uid: user.uid,
  //           email: user.email,
  //           timestamp: serverTimestamp(),
  //         });
  //         if (docRef) {
  //           if (user.email && url) {
  //             // update all tweet of the user with the user icon if upload success
  //             updateicon(user.email, url);
  //             setUser({
  //               ...user,
  //               userIcon: url,
  //             });
  //           }
  //         }
  //       } catch (e) {
  //         console.log("error", e);
  //       }
  //     });
  //     setLoading(false);
  //     setSaveMessage("Save✅");
  //   });
  // };
  return (
    // <Modal className="p-10" onClose={onClose}>
    //   {loading && (
    //     <div className="mb-3 inset-0 flex items-center justify-center">
    //       <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
    //     </div>
    //   )}
    //   {!loading && (
    //     <div className="text-center p-4">
    //       <div className="div flex justify-center items-center">
    //         {!storeImg && (
    //           <Avatar
    //             width={400}
    //             height={300}
    //             onFileLoad={(file) => {
    //               // console.log(file);
    //             }}
    //             onCrop={onCrop}
    //             onClose={onClose2}
    //           />
    //         )}

    //         <img
    //           className=" first-letter:w-60 h-60 rounded-full  object-cover"
    //           src={storeImg ? storeImg : ""}
    //         />
    //       </div>
    //       <button className="text-2xl font-semibold textColor">
    //         Update Profile
    //       </button>
    //       <div className="text-center">
    //         <button
    //           disabled={!imgCrop || saveMessage != "Save"}
    //           onClick={saveImg}
    //           type="button"
    //           className="text-white lg:pr-20 lg:pl-20  disabled:opacity-40 bg-twitter hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-700  "
    //         >
    //           {saveMessage}
    //         </button>
    //       </div>
    //     </div>
    //   )}
    //   <div className="text-center">
    //     <button
    //       onClick={onClose}
    //       type="button"
    //       className="text-white lg:pr-20 lg:pl-20  bg-twitter hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-700  "
    //     >
    //       Close
    //     </button>
    //   </div>
    // </Modal>
    <div></div>
  );
}

export default SetIcon;
