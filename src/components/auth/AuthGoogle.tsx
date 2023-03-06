import React, { useEffect } from "react";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import firebase from "firebase/compat/app";
function AuthGoogle(props) {
  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(props.auth);
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
  }, [props.auth]);
  return (
    <div>
      <div className={"firebase-auth-container"}></div>
    </div>
  );
}

export default AuthGoogle;
