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

    const credential = GithubAuthProvider.credential(githubToken);
    const result = await signInWithCredential(firebaseAuth, credential);

    return result;
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
