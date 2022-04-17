import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import loaderJson from "../../assets/lottie/loading.json";

export default function Loader(props) {
  const { backgroundColor = "#43b7b8" } = props;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <LottieView source={loaderJson} autoPlay />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
