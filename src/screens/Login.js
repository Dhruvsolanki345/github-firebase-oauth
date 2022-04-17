import {
  StyleSheet,
  Text,
  Image,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

import GradientBtn from "../components/GradientBtn";

import { useSetRecoilState } from "recoil";
import { signInCallState } from "../store/user";
import Images from "../../assets/Images";

export default function Login() {
  const setIsSignInCall = useSetRecoilState(signInCallState);

  const { width, height } = useWindowDimensions();

  const handleSignIn = () => {
    setIsSignInCall(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={Images.login1}
        resizeMode="contain"
        style={{ width: width * 0.9, height: height * 0.65, borderRadius: 15 }}
      />
      <Text style={styles.header}>
        Welcome to Firebase OAuth Application With GitHub
      </Text>

      <GradientBtn
        onPress={handleSignIn}
        containerStyle={{ width: width * 0.8 }}
        title="Login with GitHub"
        Icon={<AntDesign name="github" size={30} style={{marginLeft: 15}} color="#fff" />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#436aac",
    textAlign: "center",
    lineHeight: 32,
    marginBottom: 40,
  },
});
