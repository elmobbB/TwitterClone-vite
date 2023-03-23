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
            userIcon: authResult.user.photoUrl,
          });
          return false;
        },
      },
      privacyPolicyUrl: "<your-privacy-policy-url>",
    });
  }, [auth]);
  return (
    <div className="col-span-5  lg:col-span-7 lg:ml-72  mt-48 ">
      <div className={"firebase-auth-container"}></div>
    </div>
  );
}

export default AuthGoogle;
