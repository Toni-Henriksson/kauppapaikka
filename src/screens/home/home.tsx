import React, { useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../backend/firebase'
import {logout} from '../../backend/firebase-utility'

const HomeScreen = () => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const [user, setUser] = useState('');

    onAuthStateChanged(auth, (currentUser : any) => {
        setUser(currentUser);
    })
    return(
        <View>
            <Text>HOME screen</Text>
            {
                user?
                <Text>Kirjautunut</Text>
                : 
                <Text>Ei kirjautunut</Text>
            }
            <TouchableOpacity onPress={()=>{setUser('')}}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}
export default HomeScreen