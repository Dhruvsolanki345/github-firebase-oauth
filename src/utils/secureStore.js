import * as SecureStore from "expo-secure-store";

const BASE_KEY = "GITHUB-FIREBASE-OAUTH_";

export const setItemToStore = async (key, value) => {
  try {
    const fullKey = BASE_KEY + key;
    await SecureStore.setItemAsync(fullKey, value);
  } catch (err) {
    console.log("Error when setting value from expo secure store -> ", err);
  }
};

export const getItemFromStore = async (key) => {
  try {
    const fullKey = BASE_KEY + key;
    const result = await SecureStore.getItemAsync(fullKey);
    return result;
  } catch (err) {
    console.log("Error when getting value from expo secure store -> ", err);
  }
};

export const removeItemFromStore = async (key) => {
  try {
    const fullKey = BASE_KEY + key;
    result = await SecureStore.deleteItemAsync(fullKey);
  } catch (err) {
    console.log("Error when reomving value from expo secure store -> ", err);
  }
};
