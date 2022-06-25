import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import ModalPopUp from "../../components/modal/Modal";
import SelectDropdown from "react-native-select-dropdown";
import Style from "../../global/Style";

const AddItemPopUp = ({visible, setVisible}) => {
    const countries = ["Elektroniikka", "Rakentaminen", "Vaatetus", "Muut"];
    const [error, setError] = useState(false);

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
            Alert.alert(title + price + itemInformation)
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


    return(
        <ModalPopUp visible={visible}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Kuvat</Text>
        <View style={styles.modalSectionSmall}>
            <TouchableOpacity style={styles.picContainer}>
                <Text>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.picContainer}><Text>+</Text></TouchableOpacity>
            <TouchableOpacity style={styles.picContainer}><Text>+</Text></TouchableOpacity>
        </View>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Tuotteen perustiedot</Text>
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
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
                buttonStyle={{borderWidth: 1, borderRadius: 5, width: "80%", height: 40, alignSelf: 'center', marginTop: 10,}}
            />
        </View>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Lisätiedot</Text>
        <View style={styles.modalSectionSmall}>
            <TextInput style={styles.ModalMultiInput} multiline={true} numberOfLines={10} placeholder="Ilmoitusteksti..." onChangeText={info => setItemInformation(info)}> </TextInput>
        </View>
        {
            error ? 
            <Text style={{color: 'red', fontWeight: 'bold', marginTop: 10}}>Oops... Jokin kenttä jäi täyttämättä lmao</Text>
            :
            null
        }
        <View style={styles.modalControls}>
            <TouchableOpacity style={styles.modalBtn} onPress={()=>{handleSubmit()}}>
                 <Text style={{alignSelf: 'center', padding: 5}}>Lähetä</Text> 
            </TouchableOpacity>
        </View>
    </ModalPopUp>
    )
}

const styles = StyleSheet.create({
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

export default AddItemPopUp