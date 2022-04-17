import {
  GithubAuthProvider,
  signInWithCredential,
  signOut,
} from "firebase/auth";

import { removeItemFromStore } from "./secureStore";
import { firebaseAuth } from "./firebase";

export const signIn = async (githubToken) => {
  try {
    if (!githubToken) return;

    const credential = GithubAuthProvider.credential(firebaseAuth, githubToken);
    // console.log({credential, githubToken})
    return signInWithCredential(credential);
  } catch (err) {
    console.log("Error when signing in -> ", err);
  }
};

export const signOutAsync = async () => {
  try {
    await removeItemFromStore("github-token");

    await signOut(firebaseAuth);
  } catch (err) {
    console.log("Error when signing out -> ", err);
  }
};
