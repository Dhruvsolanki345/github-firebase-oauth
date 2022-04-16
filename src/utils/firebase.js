import * as firebase from "firebase/app";

import firebaseConfig from "../../firebase.config";

export const initializeFirebase = () => {
  if (!firebase.getApps().length) {
    return firebase.initializeApp(firebaseConfig);
  }
};
