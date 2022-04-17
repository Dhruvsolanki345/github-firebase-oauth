import { useEffect } from "react";
import { LogBox, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecoilState } from "recoil";
import { onAuthStateChanged } from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";

import Login from "./Login";
import Profile from "./Profile";

import { signInCallState, userState } from "../store/user";
import { firebaseAuth } from "../utils/firebase";
import { getItemFromStore } from "../utils/secureStore";
import { signIn } from "../utils/auth";
import githubConfig from "../../github.config";
import { getGithubToken, githubDiscovery, githubFields } from "../utils/github";

LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
]);

WebBrowser.maybeCompleteAuthSession();

export default function Home() {
  const [user, setUser] = useRecoilState(userState);
  const [isSignInCall, setIsSignInCall] = useRecoilState(signInCallState);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: githubConfig.id,
      scopes: githubFields,
      redirectUri: makeRedirectUri(),
    },
    githubDiscovery
  );

  useEffect(() => {
    const runAsync = async () => {
      const token = await getGithubToken(response);
      signIn(token);
      setIsSignInCall(false);
    };

    if (!response) return;

    runAsync();
  }, [response]);

  useEffect(() => {
    if (!isSignInCall) return;

    promptAsync();
  }, [isSignInCall]);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (auth) => {
      console.log({ auth });
      // setUser()

      if (auth) return;

      const githubToken = await getItemFromStore("github-token");

      if (!githubToken) return;

      signIn(githubToken);
    });
  }, []);

  if (!request) <ActivityIndicator size="large" />;

  return <SafeAreaView>{user ? <Profile /> : <Login />}</SafeAreaView>;
}
