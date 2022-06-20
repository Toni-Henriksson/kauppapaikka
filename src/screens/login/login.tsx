import React from "react"
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput } from "react-native"
import { login } from '../../backend/firebase-utility';
import Style from "../../global/Style";
import { getAuth } from "firebase/auth";

const Login = ({navigation}: {navigation: any}) => {
    //login(loginEmail, loginPassword);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, SetLoginPassword] = useState("");
    function handleClick(mail : string, password: string) {
        //let user = getAuth();
        login(mail, password)
        navigation.navigate('Home')
    }

    return(
        <View style={styles.container}>
            <Text style={Style.title}>Login screen</Text>
            <TextInput style={Style.input} placeholder="Sähköposti" onChangeText={pass => setLoginEmail(pass)}></TextInput>
            <TextInput style={Style.input} placeholder="Salasana" onChangeText={pass => SetLoginPassword(pass)}></TextInput>
            <TouchableOpacity style={styles.btn}  onPress={()=>handleClick(loginEmail, loginPassword)}>
                <Text style={styles.btntext}>Kirjaudu sisään</Text>
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
export default Login