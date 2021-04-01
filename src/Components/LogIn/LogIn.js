import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App.js";
import facebook from "../../icons/Group 2.png";
import google from "../../icons/Group 573.png";
import { firebaseConfig } from "./firebase.config";
import "./LogIn.css";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const LogIn = () => {
  // const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  // let history = useHistory();
  // let location = useLocation();
  // let { from } = location.state || { from: { pathname: "/" } };

  // const [user, setUser] = useState({
  //   name: "",
  //   email: "",
  //   photo: "",
  // });
  // const googleProvider = new firebase.auth.GoogleAuthProvider();
  // const handleSocialLogIn = (social) => {
  //   firebase
  //     .auth()
  //     .signInWithPopup(social)
  //     .then((res) => {
  //       const { displayName, photoURL, email } = res.user;
  //       const signedInUser = {
  //         isSignedIn: true,
  //         name: displayName,
  //         email: email,
  //         photo: photoURL,
  //       };
  //       setUser(signedInUser);
  //       storeAuthToken();
  //       setLoggedInUser(signedInUser);
  //       history.replace(from);
  //     })
  //     .catch((error) => {
  //       const errorMessage = error.message;
  //       console.log(errorMessage);
  //     });
  // };

  // const storeAuthToken = () => {
  //   firebase
  //     .auth()
  //     .currentUser.getIdToken(/* forceRefresh */ true)
  //     .then(function (idToken) {
  //       sessionStorage.setItem("token", idToken);
  //     })
  //     .catch(function (error) {
  //       // Handle error
  //     });
  // };

  // this is what before i did

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [newUser, setNewUser] = useState(false);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
  });

  const handleChange = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passWordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passWordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          updateUserInfo(user.email);
          history.replace(from);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          console.log(user.name);
          history.replace(from);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  };

  const updateUserInfo = (name) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(function () {
        console.log("User Name Updated Successfully");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const handleSocialSignIn = (e) => {
    firebase
      .auth()
      .signInWithPopup(e)
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
      .catch((err) => {
        const errorMessage = err.message;
        console.log(errorMessage);
      });
  };
  return (
    <div>
      {/* <button onClick={() => handleSocialLogIn(googleProvider)}>
        Log In With Google
      </button> */}
      <div>
        <form className="login-form" onSubmit={handleSubmit}>
          {newUser ? (
            <h6 className="logIn-signIn">Create New User</h6>
          ) : (
            <h6 className="logIn-signIn">Log In</h6>
          )}
          {newUser && (
            <input
              onBlur={handleChange}
              className="main-input"
              type="text"
              name="name"
              placeholder="Name"
              id=""
            />
          )}
          <input
            onBlur={handleChange}
            className="main-input"
            type="email"
            name="email"
            placeholder="Email"
            id=""
          />

          <input
            onBlur={handleChange}
            className="main-input"
            type="password"
            name="password"
            placeholder="Password"
            id=""
          />

          {newUser && (
            <input
              onBlur={handleChange}
              className="main-input"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              id=""
            />
          )}

          {newUser || (
            <div className="remember-forget-password">
              <input type="checkbox" name="rememberMe" id="" />
              <label htmlFor="rememberMe">Remember Me</label>
              <a className="forget-password" href="#">
                Forget Password
              </a>
            </div>
          )}

          <input
            className="submit-input"
            type="submit"
            value={newUser ? "Create an Account" : "Login"}
          />
          <span className="have-account">
            <h5>Don't Have an Account?</h5>
            <a
              onClick={() => setNewUser(!newUser)}
              className="create-account"
              href="#"
            >
              {newUser ? <h5>Log In</h5> : <h5>Create an Account</h5>}
            </a>
          </span>
        </form>
        <span className="this">Or</span>
        <div className="social-main">
          <div
            onClick={() => handleSocialSignIn(facebookProvider)}
            className="loginWith-social facebook"
          >
            <img src={facebook} alt="" />
            <h5>Log In With Facebook</h5>
          </div>
          <div
            onClick={() => handleSocialSignIn(googleProvider)}
            className="loginWith-social google"
          >
            <img src={google} alt="" />
            <h5>Log In With Google</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
