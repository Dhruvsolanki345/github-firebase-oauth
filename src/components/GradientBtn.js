import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function GradientBtn(props) {
  const {
    onPress,
    title,
    Icon,
    gradientStyle,
    textStyle,
    containerStyle,
    start = { x: 0, y: 0 },
    end = { x: 1, y: 0 },
    colors = ["#8929ad", "#436aac", "#43b7b8"],
    ...textProps
  } = props;

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
    >
      <LinearGradient
        start={start}
        end={end}
        colors={colors}
        style={[styles.gradient, gradientStyle]}
      >
        <Text style={[styles.text, textStyle]} {...textProps}>
          {title}
        </Text>
        {Icon}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 58,
    borderRadius: 24,
    paddingHorizontal: 38,
    paddingVertical: 8,
    elevation: 6,
    marginVertical: 8
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
