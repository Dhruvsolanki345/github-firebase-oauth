import { StyleSheet, Text, View } from "react-native";
import React from "react";

import GradientBtn from "../components/GradientBtn";

import { useSetRecoilState } from "recoil";
import { signInCallState } from "../store/user";

export default function Login() {
  const setIsSignInCall = useSetRecoilState(signInCallState);

  const handleSignIn = () => {
    setIsSignInCall(true);
  };

  return (
    <View>
      <Text>Login</Text>
      <GradientBtn onPress={handleSignIn} title="Login with github" />
    </View>
  );
}

const styles = StyleSheet.create({});
