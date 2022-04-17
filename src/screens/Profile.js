import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecoilValue } from "recoil";
import { MaterialIcons, FontAwesome, AntDesign } from "@expo/vector-icons";

import { userState } from "../store/user";
import { signOutAsync } from "../utils/auth";
import { StatusBar } from "expo-status-bar";

export default function Profile() {
  const user = useRecoilValue(userState);

  console.log("photo", user.photoURL);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#436aac" />
      <View style={styles.header}>
        <Text style={styles.profileTxt}>Profile</Text>
        <TouchableOpacity onPress={signOutAsync}>
          <AntDesign name="logout" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.layer}>
        <Image
          source={{ uri: user.photoURL }}
          resizeMode="contain"
          style={styles.profileImg}
        />

        <View style={styles.card}>
          <FontAwesome
            name="user"
            size={30}
            color="#436aac"
            style={styles.cardIcon}
          />
          <Text style={styles.cardTxt}>{user.displayName}</Text>
        </View>

        <View style={styles.card}>
          <FontAwesome
            name="mobile-phone"
            size={30}
            color="#436aac"
            style={styles.cardIcon}
          />
          <Text
            style={[
              styles.cardTxt,
              !user.providerData.phoneNumber && { color: "#aaa" },
            ]}
          >
            {user.providerData.phoneNumber ?? "Not Present"}
          </Text>
        </View>

        <View style={styles.card}>
          <MaterialIcons
            name="email"
            size={30}
            color="#436aac"
            style={styles.cardIcon}
          />
          <Text style={styles.cardTxt}>{user.email}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#436aac",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginHorizontal: 20,
  },
  profileTxt: {
    fontSize: 22,
    color: "#fff",
  },
  layer: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 220,
    borderTopRightRadius: 120,
    borderTopLeftRadius: 120,
  },
  profileImg: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: "center",
    marginTop: -100,
    marginBottom: 40,
  },
  card: {
    backgroundColor: "#fff",
    marginVertical: 20,
    marginHorizontal: 25,
    padding: 15,
    borderRadius: 10,
    elevation: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  cardIcon: {
    minWidth: 30,
  },
  cardTxt: {
    fontSize: 18,
    marginLeft: 25,
  },
});
