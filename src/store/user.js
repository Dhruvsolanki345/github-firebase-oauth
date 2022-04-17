import { atom } from "recoil";

export const userState = atom({
  key: "user",
  default: null,
});

export const signInCallState = atom({
  key: "isSignInCall",
  default: false,
});
