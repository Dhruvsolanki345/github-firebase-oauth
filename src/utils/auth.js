import {
  GithubAuthProvider,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { getGithubToken } from "./github";
import { removeItemFromStore, setItemToStore } from "./secureStore";

export const signIn = async (token) => {
  try {
    if (!token) {
      const githubToken = await getGithubToken();
      if (githubToken) {
        await setItemToStore("github-token", githubToken);
        return signIn(githubToken);
      } else {
        return;
      }
    }
    const credential = GithubAuthProvider.credential(token);
    return signInWithCredential(credential);
  } catch (err) {
    console.log("Error when signing in -> ", err);
  }
};

export const signOutAsync = async () => {
  try {
    await removeItemFromStore(GithubStorageKey);
    await signOut();
  } catch (err) {
    console.log("Error when signing out -> ", err);
  }
};
