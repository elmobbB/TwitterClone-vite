import React, { useCallback, useEffect, useContext } from "react";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import firebase from "../../firebase";

interface Props {
  //user, use ctx
  setUser: React.Dispatch<React.SetStateAction<any>>;
  auth: any;
}
function AuthGoogle({ auth, setUser }: Props) {
  // const ctx = useContext(UserContext);
  const createUserCollection = useCallback(async () => {}, []);

  useEffect(() => {
    createUserCollection();
  }, []);
  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    ui.start(".firebase-auth-container", {
      // //create user collection after signin
      // callbacks: {
      //   signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      //     const user = authResult.user;
      //     if (user) {
      //       const userUid = user.uid;
      //       const email = user.email;
      //       const displayName = user.displayName;
      //       const photoURL = user.photoURL;
      //       setUser(userUid, email, displayName, photoURL);
      //     }
      //     return user != null;
      //   },
      // },
      /////
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false,
        },
      ],
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          console.log(authResult);
          setUser({
            email: authResult.user.email,
            uid: authResult.user.uid,
          });
          return false;
        },
      },
      // signInSuccessUrl: "/",
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
