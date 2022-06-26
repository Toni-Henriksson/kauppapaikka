import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from "react-native";
import ModalPopUp from "../../components/modal/Modal";
import SelectDropdown from "react-native-select-dropdown";
import Style from "../../global/Style";
import { Camera } from "expo-camera";
import CameraOverlay from "../camera/CameraOverlay";

const AddItemPopUp = ({visible, setVisible}) => {
    const countries = ["Elektroniikka", "Rakentaminen", "Vaatetus", "Muut"];
    const [error, setError] = useState(false);
    const [cameraOpen, setCameraOpen] = useState(true);

    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [photo, setPhoto] = useState();

    //const [type, setType] = useState(CameraType.back);
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
        if(category != ''){
            setVisible(!visible)
            clearFormInformation()
        }else{
            setError(true)
        }
    }
    const clearFormInformation = () => {
        setCategory('')
        setTitle('')
        setPrice(0)
        setItemInformation('')
        setError(false)
    }

    return (
        <ModalPopUp visible={visible}>
            {
                cameraOpen ?
                    <CameraOverlay cameraOpen={cameraOpen} setCameraOpen={setCameraOpen} setPhoto={setPhoto}></CameraOverlay>
                    :
                    <View style={styles.modalFormContainer}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Kuvat</Text>
                        <View style={styles.modalSectionSmall}>
                            <TouchableOpacity style={styles.picContainer} onPress={()=>{setCameraOpen(true)}}>
                                {
                                    photo ? 
                                    <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }}></Image>
                                    :
                                    <Text>+</Text>
                                }
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.picContainer} onPress={()=>{setCameraOpen(true)}}><Text>+</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.picContainer} onPress={()=>{setCameraOpen(true)}}><Text>+</Text></TouchableOpacity>
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
                                <Text style={{ alignSelf: 'center', padding: 5 }}>Lähetä</Text>
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
        borderRadius: 25,
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