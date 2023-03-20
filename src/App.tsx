import React, { useCallback, useEffect, useState } from "react";
// import "./App.css";
import Feed from "./components/Feed/Feed";
import Widgets from "./components/Widgets/Widgets";
import SideBar from "./components/SideBar/SideBar";
import firebase from "./firebase";
import AuthGoogle from "./components/auth/AuthGoogle";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { db } from "./firebase";
import UserContext from "./components/store/UserContext";
import { doc, getDoc } from "firebase/firestore";
import { orderBy, query, onSnapshot } from "firebase/firestore";
import { collection, where } from "firebase/firestore";
import { limit } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import avatar from "./img/avatar.svg";
// const tweets = [
//   {
//     id: "Mr.Tweet",
//     name: "Elon Musk",
//     postDate: "postDate",
//     tweetContent:
//       " Elon Musk wants to send people to mars I think we can all agree that he is the most creative serial killer of all time.",
//     imgPath:
//       "data:image/jpeg;base64,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",
//   },
// ];

const App = () => {
  // const [icon, setIcon] = useState();
  const [user, setUser] = useState<{
    email: string | null;
    uid: string;
    photoURL: string | null;
  }>({
    email: "",
    uid: "",
    photoURL: "",
  });

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (_user) => {
      if (_user) {
        try {
          const doc_refs = collection(db, "userIcon");
          const q = query(
            doc_refs,
            where("email", "==", _user.email),
            orderBy("timestamp", "desc"),
            limit(1)
          );
          const querySnapshot = await getDocs(q);
          onSnapshot(q, (snapshot) => {
            console.log(snapshot?.docs[0].data());
            _user
              ?.updateProfile({
                photoURL: snapshot ? snapshot.docs[0].data().url : avatar,
              })
              .then(() => {
                // Profile image updated successfully
              })
              .catch((error) => {
                console.error("Error updating user profile:", error);
              });
          });
        } catch (error) {
          console.log("Unexpected error", error);
        }

        setUser({
          email: _user?.email,
          uid: _user?.uid,
          // nickname: user?.displayName,
          photoURL: _user?.photoURL,
        });

        console.log(_user?.photoURL);
      } else {
        setUser({
          email: "",
          uid: "",
          photoURL: "",
        });
      }
    });
    return () => unsubscribe();
  }, []);

  console.log(user.email);
  console.log(user.photoURL, "user.photo/url");

  // console.log(user.photoURL, "user photourl");
  return (
    <div>
      <BrowserRouter>
        {/* <Routes>
          <Route
            path="/authenticated"
            element={
              <div className="App mx-auto lg:max-w-7xl grid grid-cols-10 gap-3 overflow-hidden">
                <UserContext.Provider value={user}>
                  <SideBar />
                  <Feed />
                  <Widgets />
                </UserContext.Provider>
              </div>
            }
          />
        </Routes> */}
        <Routes>
          {user.email && user.email !== "" ? (
            <Route
              path="/"
              element={
                // <ImageContextProvider>
                <UserContext.Provider value={user}>
                  <div className="App mx-auto lg:max-w-7xl grid grid-cols-10 gap-3 overflow-hidden">
                    <SideBar />
                    <Feed />
                    {/* <Widgets /> */}
                  </div>
                </UserContext.Provider>
                // </ImageContextProvider>
              }
            />
          ) : (
            <Route
              index
              path="/"
              element={<AuthGoogle setUser={setUser} auth={firebase.auth()} />}
            />
          )}
        </Routes>
      </BrowserRouter>
      {/* <AuthGoogle auth={firebase.auth()} /> */}
    </div>
  );
};

export default App;
