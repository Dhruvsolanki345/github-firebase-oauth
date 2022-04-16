import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";

import firebaseConfig from "../../firebase.config";

// if (!firebase.getApps().length) {
export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);
// }
