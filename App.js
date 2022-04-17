import { StatusBar } from "expo-status-bar";
import { RecoilRoot } from "recoil";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import Home from "./src/screens/Home";

export default function App() {
  return (
    <SafeAreaProvider>
      <RecoilRoot>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Home />
        </NavigationContainer>
      </RecoilRoot>
    </SafeAreaProvider>
  );
}
