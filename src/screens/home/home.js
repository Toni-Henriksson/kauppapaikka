import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from "react-native"
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../backend/firebase'
import Navbar from "../../components/navbar/navbar"
import Item from "../../components/item/Item";
import { getDatabase, ref, onValue } from "firebase/database";

const HomeScreen = () => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const [user, setUser] = useState('');

    // All items listed for sale
    const [items, setItems] = useState([]);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setUser(uid)
        } else {

        }
    });
    useEffect(() => {
        const db = getDatabase();
        if (db) {
            onValue(ref(db, 'posts/'), snapshot => {
                const data = snapshot.val();
                if (data) {
                    render(data)
                }
                else {
                    console.log("No data from DB!")
                }
            })
        }
    }, [])

    const render = (data) => {
        let arr = []
        Object.keys(data).forEach(x => {
            let post = {
                title: data[x].title,
                price: data[x].price,
                category: data[x].category,
                additionalInfo: data[x].additionalInfo,
                img: data[x]?.urls?.arr?.[0],
                img2: data[x]?.urls?.arr?.[1],
                img3: data[x]?.urls?.arr?.[2],
            };
            arr.push(post) 
        }) 
        setItems(arr)
    }

    return (
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
                    {
                        items.map(function (item, id) {
                            return (
                                <View key={id}>
                                    <Item data={item} />
                                </View>
                            )
                        })
                    }
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
})

export default HomeScreen