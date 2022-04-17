import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import loaderJson from "../../assets/lottie/loading.json";

export default function LoaderPost() {
  return (
    <View style={styles.container}>
      <LottieView source={loaderJson} autoPlay />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#43b7b8",
  },
});
