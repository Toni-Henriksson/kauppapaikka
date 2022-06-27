import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert } from "react-native";
import ModalPopUp from "../../components/modal/Modal";
import SelectDropdown from "react-native-select-dropdown";
import Style from "../../global/Style";
import { Camera } from "expo-camera";
import CameraOverlay from "../camera/CameraOverlay";
import { getStorage, uploadBytes, ref } from 'firebase/storage';
import { getAuth } from "firebase/auth";

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const AddItemPopUp = ({visible, setVisible}) => {
    // MISC 
    const countries = ["Elektroniikka", "Rakentaminen", "Vaatetus", "Muut"];
    const [error, setError] = useState(false);

    // Camera & Photos
    const [cameraOpen, setCameraOpen] = useState(false);
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [btnId, setBtnId] = useState(0);
    const [photo, setPhoto] = useState();
    const [photo1, setPhoto1] = useState();
    const [photo2, setPhoto2] = useState();

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === "granted");
        })();
    }, []);

    if (hasCameraPermission === null) {
        return <View />;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    //User filled information
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [itemInformation, setItemInformation] = useState('');

    const handleSubmit = () => {
        const uid = getAuth().currentUser.uid;
        if(category != ''){
            setVisible(!visible)
            clearFormInformation()
        }else{
            setError(true)
        } 

        let photoBundle = [photo, photo1, photo2]
        // TODO: Check if photodata is valid and we get the uid, then upload. Might cause bugs later if not done.
        //uploadToFirebase(photo1, uid)
        uploadToFirebase(photo1, uid)
    }
    
    const uploadToFirebase = async (images, userID) => {
        const storage = getStorage();
        let fileName = "image.jpg"
        let itemID = uuidv4();
        const storageRef2 = ref(storage, `${userID}/${itemID}/${fileName}`);
        const img = await fetch(images.uri);
        const bytes = await img.blob();
        await uploadBytes(storageRef2, bytes)  
    }; 

    const clearFormInformation = () => {
        setCategory('')
        setTitle('')
        setPrice(0)
        setItemInformation('')
        setPhoto(undefined)
        setPhoto1(undefined)
        setPhoto2(undefined)
        setError(false)
    }

    const openCam = (btnId) => {
        setBtnId(btnId)
        setCameraOpen(true)
    }
    return (
        <ModalPopUp visible={visible}>
            {
                cameraOpen ?
                    <CameraOverlay cameraOpen={cameraOpen} setCameraOpen={setCameraOpen} setPhoto={setPhoto} setPhoto1={setPhoto1} setPhoto2={setPhoto2} btnId={btnId}></CameraOverlay>
                    :
                    <View style={styles.modalFormContainer}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Kuvat</Text>
                        <View style={styles.modalSectionSmall}>
                            <TouchableOpacity style={styles.picContainer} onPress={()=>{openCam('1')}}>
                                {
                                    photo ? 
                                    <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }}></Image>
                                    :
                                    <Text>+</Text>
                                }
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.picContainer} onPress={()=>{openCam('2')}}>
                                {
                                    photo1 ? 
                                    <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo1.base64 }}></Image>
                                    :
                                    <Text>+</Text>
                                }
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.picContainer} onPress={()=>{openCam('3')}}>
                                {
                                    photo2 ? 
                                    <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo2.base64 }}></Image>
                                    :
                                    <Text>+</Text>
                                }
                            </TouchableOpacity>

                        </View>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Tuotteen perustiedot</Text>
                        <View style={styles.modalSection}>
                            <TextInput style={Style.input} placeholder={"Otsikko"} onChangeText={title => setTitle(title)}></TextInput>
                            <TextInput style={Style.input} placeholder={"Hinta"} onChangeText={price => setPrice(price)}></TextInput>
                            <SelectDropdown
                                data={countries}
                                defaultButtonText={"Kategoria"}
                                onSelect={(selectedItem, index) => {
                                    let selection = selectedItem;
                                    setCategory(selection);
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                                buttonStyle={{ borderWidth: 1, borderRadius: 5, width: "80%", height: 40, alignSelf: 'center', marginTop: 10, }}
                            />
                        </View>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Lisätiedot</Text>
                        <View style={styles.modalSectionSmall}>
                            <TextInput style={styles.ModalMultiInput} multiline={true} numberOfLines={10} placeholder="Ilmoitusteksti..." onChangeText={info => setItemInformation(info)}> </TextInput>
                        </View>
                        {
                            error ?
                                <Text style={{ color: 'red', fontWeight: 'bold', marginTop: 10 }}>Oops... Jokin kenttä jäi täyttämättä lmao</Text>
                                :
                                null
                        }
                        <View style={styles.modalControls}>
                            <TouchableOpacity style={styles.modalBtn} onPress={() => { handleSubmit() }}>
                                <Text style={{ alignSelf: 'center', color: 'white', padding: 6 }}>Lähetä</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            }
        </ModalPopUp>
    )
}

const styles = StyleSheet.create({
    modalFormContainer:{
        flex: 1,
        alignContent: 'center',
        alignItems: 'center'
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
        borderRadius: 5,
    },  
    ModalMultiInput: {
        backgroundColor: "#F0F0F0",
        height: "90%",
        width: "100%",
        textAlignVertical: 'top',
        padding: 10,
    },
    preview: {
        alignSelf: 'stretch',
        flex: 1,
    }
})

export default AddItemPopUp