import React, { useState, useEffect, Children } from "react"
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from "react-native"
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../backend/firebase'
import Navbar from "../../components/navbar/navbar"
import Item from "../../components/item/Item";
import { getDatabase, ref, get, child, DataSnapshot, getChildren } from "firebase/database";
import { getMomentsAsync } from "expo-media-library"

const HomeScreen = () => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const [user, setUser] = useState();

    // Fetched posts from db
    const [posts, setPosts] = useState([]);
    // Modified object to suit my needs betteer
    const [items, setItems] = useState()

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setUser(uid)
        } else {

        }
    });
    useEffect(() => {
        getPosts();
    }, [])

    function getPosts() {
        const db = getDatabase();
        const dbRef = ref(db);
        let arr = []
        get(child(dbRef, "posts/"))
            .then((snapshot) => {
                let data;
                data = snapshot.val()
                setPosts(data)
        })
        if(posts){
            renderPosts(posts)
        }    
    }
    function renderPosts(data) {
        // Get post object from db
        let posts = []
        Object.keys(data).map(x => {
            let imageurls = data[x].imageUrls
            let urls = []
            let itemData = [data[x].title,
                        data[x].price, 
                        data[x].category, 
                        data[x].additionalInfo]
            // Get image urls of post object 
            Object.values(imageurls).map(z => {
                urls.push(z.key)
            }) 

            let post = [{
                title: data[x].title,
                price: data[x].price,
                category: data[x].category,
                additionalInfo: data[x].additionalInfo,
                img1: urls[0],
                img2: urls[1],
                img3: urls[2],
            }]
            posts.push(post)
        })
        setItems(posts)
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
                        items.map(function(item, id){
                            return(
                                <Item data={item}/>
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