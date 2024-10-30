// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAxi0EpNBquu6nY718RRWGCdOZO2eCuYjI",
  authDomain: "my-first-project-b690b.firebaseapp.com",
  projectId: "my-first-project-b690b",
  storageBucket: "my-first-project-b690b.appspot.com",
  messagingSenderId: "562256193103",
  appId: "1:562256193103:web:a052da1dce88bf18b26c3a",
  measurementId: "G-G7HWMRVYH3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const signup_email = document.getElementById("signup_email");
const signup_password = document.getElementById("signup_password");
const signup_btn = document.getElementById("signup_btn");

const signin_email = document.getElementById("signin_email");
const signin_password = document.getElementById("signin_password");
const signin_btn = document.getElementById("signin_btn");

const user_email = document.getElementById("user_email");
const logout_btn = document.getElementById("logout_btn");

const auth_container = document.getElementById("auth_container");
const user_container = document.getElementById("user_container");

signup_btn.addEventListener("click", createUserAccount);
signin_btn.addEventListener("click", signIn);
logout_btn.addEventListener("click", logout);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("user is logged in ==>");
    auth_container.style.display = "none";
    user_container.style.display = "block";
    user_email.innerText = user.email;
    const uid = user.uid;
  } else {
    console.log("user is not logged in ==>");
    auth_container.style.display = "block";
    user_container.style.display = "none";
  }
});

function createUserAccount() {
  // console.log("email=>", signup_email.value);
  // console.log("password=>", signup_password.value);
  createUserWithEmailAndPassword(
    auth,
    signup_email.value,
    signup_password.value
  )
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log("User=>", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

function signIn() {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, signin_email, signin_password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("User=>", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

function logout() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}
