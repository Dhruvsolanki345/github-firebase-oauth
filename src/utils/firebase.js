import firebaseConfig from "../../firebase.config";

export const initializeFirebase = () => {
  if (!firebase.apps.length) {
    return firebase.initializeApp(firebaseConfig);
  }
};
