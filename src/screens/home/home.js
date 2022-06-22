import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native"
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../backend/firebase'
import {logout} from '../../backend/firebase-utility'
import Style from "../../global/Style"
import Navbar from "../../components/navbar/navbar"

const HomeScreen = () => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const [user, setUser] = useState();

    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          setUser(uid)
        } else {

        }
    });
    const handlelogout = () => {
        logout()
        setUser('no user')
    }
    
    return(
        <View style={styles.container}>
            <Navbar></Navbar>
            <Text style={Style.title}>HOME screen</Text>
            {
                user?
                <Text>Logged in user: {user}</Text>
                :
                <Text>No user logged in</Text>
            }
            <TouchableOpacity style={styles.btn} onPress={()=>{handlelogout}}>
                <Text style={styles.btntext}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        alignSelf: 'center',
        backgroundColor: '#f99f38',
        width: 350,
        height: 38,
        borderRadius: 25,
        margin: 5,
        elevation: 2,
       },
       btntext: {
        textAlign: 'center',
        padding: 6,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
       }
})
export default HomeScreen