import React, { useCallback, useEffect, useState } from "react";
// import "./App.css";
import Feed from "./components/Feed/Feed";
import Widgets from "./components/Widgets/Widgets";
import SideBar from "./components/SideBar/SideBar";
import firebase from "./firebase";
import AuthGoogle from "./components/auth/AuthGoogle";
import { BrowserRouter, Route, Routes, Router } from "react-router-dom"; //use routes instead of switch
import { db } from "./firebase";
import UserContext from "./components/store/UserContext";
import { doc, FieldValue, getDoc } from "firebase/firestore";
import { orderBy, query, onSnapshot } from "firebase/firestore";
import { collection, where } from "firebase/firestore";
import { limit } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { useContext } from "react";
import ChatRoom from "./components/SideBar/chatRoom/ChatRoom";
import MessageContext from "./components/store/MessageContext";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
import { updateDoc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
interface myType {
  messageTimeStamp: FieldValue;
  messageContent: string;
  id: string;
}

const App = () => {
  const [user, setUser] = useState<{
    email: string | null;
    uid: string | null;
    photoURL: string | null;
    userIcon: string | null;
  }>({
    email: "",
    uid: "",
    photoURL: "",
    userIcon: "",
  });
  const [message, setMessage] = useState<{
    receiverEmail: string | null;
    receiverUid: string | null;
    userToReceiver: string | null;
    uploadedMessage: {
      email: string;
      messageContent: string;
      timestamp: string;
      uid: string;
      userIcon: string;
      receiver: string;
      id: string;
    }[];
  }>({
    receiverEmail: "",
    receiverUid: "",
    userToReceiver: "",
    uploadedMessage: [],
  });
  const [uploadedMessage, setUploadedMessage] = useState<myType[]>([]);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (_user) => {
      // console.log(_user, "auth");
      if (_user) {
        try {
          const doc_refs = await collection(db, "userIcon");
          const q = query(
            doc_refs,
            where("email", "==", _user.email),
            orderBy("timestamp", "desc"),
            limit(1)
          );
          const querySnapshot = await getDocs(q);
          onSnapshot(q, async (snapshot) => {
            // console.log(snapshot?.docs[0]?.data());
            _user
              ?.updateProfile({
                photoURL: snapshot?.docs[0]?.data()?.url,
              })
              .then(() => {
                // Profile image updated successfully
              })
              .catch((error) => {
                console.error("Error updating user profile:", error);
              });
          });
          let docData = {
            uid: _user.uid,
            email: _user.email,
            timestamp: serverTimestamp(),
            photoURL: _user.photoURL,
            uploadedmessage: [],
          };

          //create usercollection,
          await setDoc(doc(db, "data", `${_user.email}`), docData);
        } catch (error) {
          console.log("Unexpected error", error);
        }

        setUser({
          email: _user?.email,
          uid: _user?.uid,
          photoURL: _user?.photoURL,
          userIcon: _user?.photoURL,
        });

        console.log(_user?.photoURL);
      } else {
        setUser({
          email: "",
          uid: "",
          photoURL: "",
          userIcon: "",
        });
      }
    });
    return () => unsubscribe();
  }, [db]);

  // console.log(user.email);
  // console.log(user.photoURL, "user.photo/url");
  //
  // console.log(import.meta.env.REACT_APP_API_KEY);
  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App mx-auto lg:max-w-7xl grid grid-cols-10 gap-3 overflow-hidden">
          <BrowserRouter>
            {user.email && user.email !== "" && <SideBar />}
            <Routes>
              {user.email && user.email !== "" ? (
                <>
                  <Route
                    path="/"
                    element={
                      <>
                        <Feed />
                        <Widgets />
                      </>
                    }
                  />
                  <Route path="/chatroom" element={<ChatRoom />} />
                </>
              ) : (
                <Route
                  index
                  path="*"
                  element={
                    <AuthGoogle setUser={setUser} auth={firebase.auth()} />
                  }
                />
              )}
            </Routes>
          </BrowserRouter>
        </div>
      </UserContext.Provider>
    </MessageContext.Provider>
  );
};

export default App;
