import { useEffect } from "react";
import { LogBox } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecoilState } from "recoil";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Login from "./Login";
import Profile from "./Profile";

import { userState } from "../store/user";
import { initializeFirebase } from "../utils/firebase";
import { getItemFromStore } from "../utils/secureStore";
import { signIn } from "../utils/auth";

LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
]);

export default function Home() {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    initializeFirebase();
    const auth = getAuth();

    onAuthStateChanged(auth, async (auth) => {
      console.log({ auth });
      // setUser()

      if (auth) return;

      const githubToken = await getItemFromStore("github-token");

      if (!githubToken) return;

      signIn(githubToken);
    });
  }, []);

  return <SafeAreaView>{user ? <Profile /> : <Login />}</SafeAreaView>;
}
