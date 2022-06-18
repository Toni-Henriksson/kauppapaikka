import * as firebase from 'firebase';
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth';

const app = firebase.initializeApp({
    apiKey: "AIzaSyBOwCaHUd9zMLJU8bAM1FmoAFva45gwA4Q",
    authDomain: "kauppapaikka-35ca2.firebaseapp.com",
    projectId: "kauppapaikka-35ca2",
    storageBucket: "gs://kauppapaikka-35ca2.appspot.com",
    messagingSenderId: "379640171639",
    appId: "1:493781472871:android:905354c9bb53151f96a6c2",
    databaseURL: "https://kauppapaikka-35ca2-default-rtdb.europe-west1.firebasedatabase.app/"
});

export default app;
export const auth = getAuth(app);
export const database = getDatabase(app);