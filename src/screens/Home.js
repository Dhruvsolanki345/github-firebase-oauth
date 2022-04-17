import { useEffect, useState } from "react";
import { LogBox, ActivityIndicator } from "react-native";
import { useRecoilState } from "recoil";
import { onAuthStateChanged } from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";

import Login from "./Login";
import Profile from "./Profile";
import Loader from "../components/Loader";

import { signInCallState, userState } from "../store/user";
import { firebaseAuth } from "../utils/firebase";
import { getItemFromStore, setItemToStore } from "../utils/secureStore";
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

  const [isLoading, setIsLoading] = useState(true);

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
      setIsSignInCall(false);

      if (!token) return;
      setItemToStore("github-token", token);
      signIn(token);
      setIsLoading(true);
    };

    if (!response) return;

    runAsync();
  }, [response]);

  useEffect(() => {
    if (!isSignInCall) return;

    promptAsync();
  }, [isSignInCall]);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (userData) => {
      const userCopy = JSON.parse(JSON.stringify(userData));
      setUser(userCopy);
      setIsLoading(false);

      if (userData) return;

      const githubToken = await getItemFromStore("github-token");

      if (!githubToken) return;

      signIn(githubToken);
    });
  }, []);

  if (isLoading) return <Loader />;

  return user ? <Profile /> : <Login />;
}
