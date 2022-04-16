import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecoilState } from "recoil";
import firebase from "firebase";

import Login from "./Login";
import Profile from "./Profile";

import { userState } from "../store/user";
import { initializeFirebase } from "../utils/firebase";
import { getItemToStore } from "../utils/secureStore";

export default function Home() {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    initializeFirebase();

    firebase.auth().onAuthStateChanged(async (auth) => {
      console.log({ auth });
      // setUser()

      if (!auth) return;

      const githubToken = getItemToStore("github-token");

      if (githubToken) console.log({ githubToken });
    });
  }, []);

  return <SafeAreaView>{user ? <Profile /> : <Login />}</SafeAreaView>;
}
