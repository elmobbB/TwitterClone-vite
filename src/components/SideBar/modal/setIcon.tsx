import React, { useState } from "react";
import { getStorage, ref, uploadString } from "firebase/storage";
import Avatar from "react-avatar-edit";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

import { BookmarkIcon } from "@heroicons/react/24/outline";

import Modal from "../../UI/Modal";
import { profile } from "console";
import { storageRef, storage } from "../../../firebase";

import avatar from "./../../../img/avatar.svg";
interface Props {
  onClose: () => void;
  imgCrop: string | boolean;
  storeImg: string | boolean;
  onPassImage: (image: any) => void;
}

function SetIcon({ onClose, onPassImage }: Props) {
  const [imgCrop, setImgCrop] = useState("");
  const [storeImg, setStoreImg] = useState<
    {
      imgCrop: string;
      storeImg: string;
    }[]
  >([]);
  const [saveMessage, setSaveMessage] = useState("Save");
  const onCrop = (view) => {
    console.log("on crop");
    setImgCrop(view);
  };
  const onClose2 = () => {
    console.log("on close");
    setImgCrop(""); //null?
  };

  const saveImg = () => {
    const uploadRef = ref(storage, "upload.png");
    uploadString(uploadRef, imgCrop, "data_url").then((snapshot) => {
      console.log("Uploaded a data_url string!");
      console.log(snapshot);
    });
    // storageRef.putString(imgCrop, "data_url").then((snapshot) => {
    //   console.log("Uploaded a data_url string!");
    // });
    setStoreImg([...storeImg, { imgCrop }]);
    setSaveMessage("Save✅");
  };

  onPassImage(storeImg);

  // console.log(imgCrop);
  // console.log(storeImg);
  const profileImgShow = storeImg.map((item) => item.imgCrop);

  return (
    <Modal className="p-10" onClose={onClose}>
      <div className="profile-img text-center p-4">
        <div className="div flex justify-center items-center">
          {profileImgShow.length <= 0 && (
            <Avatar
              width={400}
              height={300}
              onFileLoad={(file) => {
                console.log(file);
              }}
              onCrop={onCrop}
              onClose={onClose2}
            />
          )}

          <img
            className=" first-letter:w-60 h-60 rounded-full  object-cover"
            src={profileImgShow.length ? profileImgShow : ""}
          />
        </div>
        <button className="text-2xl font-semibold textColor">
          Update Profile
        </button>
        <div className="text-center">
          <button
            disabled={!imgCrop}
            onClick={saveImg}
            type="button"
            className="text-white lg:pr-20 lg:pl-20  disabled:opacity-40 bg-twitter hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-700  "
          >
            {saveMessage}
          </button>
        </div>
      </div>

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

// function SetIcon() {
//   const [dialogs, setdialogs] = useState(false);
//   const [imgCrop, setImgCrop] = useState(false);
//   // const [storeImg, setStoreImg] = useState([]);

//   const onCrop = (view) => {
//     setImgCrop(view);
//   };
//   const onClose2 = () => {
//     setImgCrop(null);
//   };

//   // const saveImg = () => {
//   //   setStoreImg([...storeImg, { imgCrop }]);
//   //   setdialogs(false);
//   // };

//   // const profileImgShow = storeImg.map((item) => item.imgCrop);
//   return (
//     <div>
//       <div className="profile-img text-center p-4">
//         <div className="div">
//           <img
//             className=" first-letter:w-60 h-60 rounded-full  object-cover"
//             src={avatar}
//             // src={profileImgShow.length ? profile : avatar}
//             alt="avatar"
//             onClick={() => {
//               setdialogs(true);
//             }}
//           />
//           <Dialog
//             visible={dialogs}
//             onHide={() => {
//               setdialogs(false);
//             }}
//           >
//             <div className="confirmation-content flex flex-column align-items-">
//               <div className="flex  flex-column align-items-center mt-5 w-12">
//                 <div className="flex justify-content-around w-12 mt-4">
//                   <Avatar
//                     width={400}
//                     height={300}
//                     onClose={onClose2}
//                     onCrop={onCrop}
//                   />
//                   {/* <Button onClick={saveImg} label="Save" icon={BookmarkIcon} /> */}
//                   <Button label="Save" icon={BookmarkIcon} />
//                 </div>
//               </div>
//             </div>
//           </Dialog>
//         </div>
//       </div>
//     </div>
//   );
// }

export default SetIcon;
