import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {getDatabase, set, ref } from 'firebase/database'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './firebase'


// IF ALL THIS IS NOT WORKING BE SURE TO CHECK FIREBASE VERSION
export const register = async(email, password, fullname) => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    try{
        const user = await createUserWithEmailAndPassword(auth, email, password);
        writeToDB(user.user.uid, email, fullname);
    }catch(error){
        console.log(error.message);
    }
}

export const login = async (email, password) => {
    const auth = getAuth(app);
    try{
        const user = await signInWithEmailAndPassword(auth, email, password);
    }catch(error){
        console.log(error.message);
    }
}; 
export const logout = async () => {
    const auth = getAuth(app);
    try {
        await signOut(auth);
    } catch (error) {
        console.log("Error loggin out: " + error)
    }
};

// Writes all information from register to database
export const writeToDB = async (userId, email, fullname) => {
    const db = getDatabase();
    try{
        set(ref(db, 'users/' + userId), {
            email: email,
            fullname: fullname,
          });
        set(ref(db, 'userrouting/' + fullname), {
            uid: userId,
            email: email,
          });
    }catch(error){
        Alert.alert(error.message);
    }
}; 

