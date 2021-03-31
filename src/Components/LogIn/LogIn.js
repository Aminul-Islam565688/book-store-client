import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App.js";
import { firebaseConfig } from "./firebase.config";

firebase.initializeApp(firebaseConfig);

const LogIn = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const [user, setUser] = useState({
    name: "",
    email: "",
    photo: "",
  });
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const handleSocialLogIn = (social) => {
    firebase
      .auth()
      .signInWithPopup(social)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return (
    <div>
      <h1>This is LogIn Components</h1>
      <button onClick={() => handleSocialLogIn(googleProvider)}>
        Log In With Google
      </button>
    </div>
  );
};

export default LogIn;
