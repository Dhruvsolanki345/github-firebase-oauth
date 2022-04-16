import { StatusBar } from "expo-status-bar";
import { RecoilRoot } from "recoil";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Home from "./src/screens/Home";

export default function App() {
  return (
    <SafeAreaProvider>
      <RecoilRoot>
        <StatusBar style="auto" />
        <Home />
      </RecoilRoot>
    </SafeAreaProvider>
  );
}
