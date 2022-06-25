import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from "react-native"
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../backend/firebase'
import {logout} from '../../backend/firebase-utility'
import Style from "../../global/Style"
import Navbar from "../../components/navbar/navbar"
import Item from "../../components/item/Item";
import ModalPopUp from "../../components/modal/Modal";
import SelectDropdown from 'react-native-select-dropdown'

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
    return(
        <View style={styles.container}>
            <View style={styles.controlsContainer}>
                <TextInput style={styles.controlInput} placeholder="Hae kauppapaikasta"></TextInput>
                <View style={styles.controlsButtonsContainer}>
                    <TouchableOpacity style={styles.controlButton}>
                        <Text>Alue</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controlButton}>
                        <Text>Osastot</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controlButton}>
                        <Text>Hakuehdot</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.itemscontainer}>
                <ScrollView style={styles.scrollContainer}>
                  <Item/>
                  <Item/>
                  <Item/>
                  <Item/>
                </ScrollView>
            </View>
            <Navbar></Navbar>
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
       },
    itemscontainer: {
        width: "90%",
        height: '60%',
        marginTop: 30,
    },
    scrollContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
    },
    controlsContainer: {
        width: "90%",
        height: "20%",
        backgroundColor: "white",
        borderRadius: 15,
        elevation: 4,
        justifyContent: 'center',
        padding: 20,
    },
    controlsButtonsContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },

    controlButton: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#C0C0C0",
        height: 35,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    controlInput: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#C0C0C0",
        height: 50,
        padding: 10,
        width: '100%'
    },
    modalSection:{
        width: '100%',
        height: '30%',
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderColor: "#C0C0C0",
    },
    modalSectionSmall:{
        width: '100%',
        height: '20%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: "#C0C0C0",
    },
    picContainer: {
        width: '30.5%',
        height: '90%',
        backgroundColor: "#F0F0F0",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#C0C0C0",
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalControls:{
        position: 'absolute',
        bottom: 10,
        height: '15%',
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalBtn: {
        width: '80%',
        height: 35,
        backgroundColor: '#f99f38',
        borderRadius: 25,
    },  
    ModalMultiInput: {
        backgroundColor: "#F0F0F0",
        height: "90%",
        width: "100%",
        textAlignVertical: 'top',
        padding: 10,
    },
})

export default HomeScreen