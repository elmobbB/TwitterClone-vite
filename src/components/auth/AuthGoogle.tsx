import React, { useEffect } from "react";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import firebase from "firebase/compat/app";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
interface Props {
  auth: any;
}
function AuthGoogle({ auth }: Props) {
  // try {
  //   //create an user collection
  //   const docRef = addDoc(collection(db, "users"), {
  //     uid: user.uid,
  //     email: user.email,
  //   });
  // } catch (e) {
  //   console.log("error");
  // }
  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    ui.start(".firebase-auth-container", {
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false,
        },
      ],
      signInSuccessUrl: "/authenticated",
      privacyPolicyUrl: "<your-privacy-policy-url>",
    });
  }, [auth]);
  return (
    <div>
      <div className={"firebase-auth-container"}></div>
    </div>
  );
}

export default AuthGoogle;
