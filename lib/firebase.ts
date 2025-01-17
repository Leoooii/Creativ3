// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { getStorage } from "@firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrOUQDf-dapVyYTlE-zQk3BjtmpwArCBo",
  authDomain: "cretiv.firebaseapp.com",
  projectId: "cretiv",
  messagingSenderId: "417028783586",
  appId: "1:417028783586:web:f59b01a5b7fe06e2be4dbb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signIn = () =>
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      console.log(user.email, "vs", process.env.NEXT_PUBLIC_ADMIN_EMAIL);
      if (user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        return user;
      } else return;
    })
    .catch((error) => {
      alert(error.message);
      // const errorCode = error.code
      // const errorMessage = error.message
      //
      // const email = error.customData.email
      //
      // const credential = GoogleAuthProvider.credentialFromError(error)
    });

export const signOut = () => auth.signOut();
export const storage = getStorage(app);
