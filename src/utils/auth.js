import {
  GithubAuthProvider,
  signInWithCredential,
  signOut,
} from "firebase/auth";

import { getGithubToken } from "./github";
import { removeItemFromStore, setItemToStore } from "./secureStore";
import { firebaseAuth } from "./firebase";

export const signIn = async (githubToken) => {
  try {
    if (typeof githubToken !== "string") {
      const githubToken = await getGithubToken();
      if (githubToken) {
        await setItemToStore("github-token", githubToken);
        return signIn(githubToken);
      } else {
        return;
      }
    }

    const credential = GithubAuthProvider.credential(firebaseAuth, githubToken);
    // console.log({credential, githubToken})
    return signInWithCredential(credential);
  } catch (err) {
    console.log("Error when signing in -> ", err);
  }
};

export const signOutAsync = async () => {
  try {
    await removeItemFromStore(GithubStorageKey);

    await signOut(firebaseAuth);
  } catch (err) {
    console.log("Error when signing out -> ", err);
  }
};
