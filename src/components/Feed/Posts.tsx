// import React, { useState, useEffect } from "react";
// import {
//   ChatBubbleOvalLeftIcon,
//   ShareIcon,
//   HeartIcon,
//   ChartBarIcon,
// } from "@heroicons/react/24/outline";
// import Retweet from "./retweet/Retweet";
// import PostIcon from "./PostIcon";
// interface Props {
//   id: string;
//   name: string;
//   postDate: string;
//   tweetContent: string;
//   imgPath: string;
// }

// function Posts({ id, name, postDate, tweetContent, imgPath }: Props) {
//   const [numberOfLikes, setNumberOfLikes] = useState<number | null>(
//     +localStorage.getItem(`likes-${id}`) || 0
//   );
//   const [filled, setFilled] = useState<boolean>(
//     localStorage.getItem(`isLiked-${id}`) === "true" || false
//   );

//   let tweetId = "";
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     localStorage.setItem(`likes-${id}`, `${numberOfLikes}`);
//     localStorage.setItem(`isLiked-${id}`, `${filled}`);
//   }, [numberOfLikes, filled]);

//   const handleClick = async () => {
//     tweetId = id;
//     console.log(tweetId);
//     // setFilled(!filled);
//     // setNumberOfLikes(numberOfLikes === 0 ? 1 : 0);

//     if (!filled) {
//       setNumberOfLikes((prevNumberOfLikes) => {
//         if (prevNumberOfLikes === null) {
//           return null;
//         }
//         return prevNumberOfLikes + 1;
//       });

//       setFilled(true);
//     } else {
//       setNumberOfLikes((prevNumberOfLikes) => {
//         if (prevNumberOfLikes === null || prevNumberOfLikes === 0) {
//           return null;
//         }
//         return prevNumberOfLikes - 1;
//       });
//       setFilled(false);
//     }
//   };

//   const showModalHandler = () => {
//     setShowModal(true);
//   };

//   const hideModalHandler = () => {
//     setShowModal(false);
//   };
//   return (
//     <li className="flex space-x-2 p-5 border">
//       <img
//         className="h-14 w-14 rounded-full object-cover mt-4"
//         alt="cookie monster"
//         src="data:image/jpeg;base64,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"
//       />
//       <div className="w-11/12 ">
//         <div className="flex w-11/12 ">
//           <h2 className="l pr-3 font-bold">{name}</h2>
//           <h2 className="text-gray-500 pr-2">@{id}</h2>
//           <h2 className="text-gray-500">{postDate}</h2>
//         </div>
//         <div className="mb-4 w-11/12  ">{tweetContent}</div>
//         <div className="mb-4">
//           {imgPath && (
//             <img
//               className="object-cover sm:object-scale-down"
//               alt="elon musk"
//               src={imgPath}
//             />
//           )}
//         </div>
//         <div className="flex flex-1 sm:space-x-2 lg:space-x-6 md:space-x-2  w-10/12  ">
//           <PostIcon Icon={ChatBubbleOvalLeftIcon} title="3777" />
//           <button
//             onClick={() => {
//               // retweetHandler();
//               showModalHandler();
//             }}
//           >
//             <PostIcon Icon={ShareIcon} title="10.9K" />
//           </button>
//           {showModal && <Retweet id={id} onClose={hideModalHandler} />}
//           <div
//             onClick={handleClick}
//             className="flex max-w-fit items-center space-x-2 px-4 py-3 rounded-full  hover:bg-gray-100 transition-all duration-200 group"
//           >
//             {filled ? (
//               <HeartIcon className="h-6 w-6 fill-red-400" />
//             ) : (
//               <HeartIcon className="h-6 w-6" />
//             )}
//             <p className=" group-hover:text-twitter  text-base ">
//               {numberOfLikes}
//             </p>
//           </div>
//           {/* <PostIcon Icon={ChartBarIcon} title="9.1M" /> */}
//         </div>
//       </div>
//     </li>
//   );
// }

// export default Posts;

import React from "react";

function Posts() {
  return <div></div>;
}

export default Posts;
