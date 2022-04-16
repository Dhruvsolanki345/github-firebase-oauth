import * as SecureStore from "expo-secure-store";

const BASE_KEY = "github-firebase-oauth/";

export const setItemToStore = async (key, value) => {
  try {
    const fullKey = BASE_KEY + key;
    await SecureStore.setItemAsync(fullKey, value);
  } catch (err) {
    console.log("Error when setting value from expo secure store -> ", err);
  }
};

export const getItemToStore = async (key) => {
  try {
    const fullKey = BASE_KEY + key;
    result = await SecureStore.getItemAsync(fullKey);
    return result;
  } catch (err) {
    console.log("Error when getting value from expo secure store -> ", err);
  }
  
};
