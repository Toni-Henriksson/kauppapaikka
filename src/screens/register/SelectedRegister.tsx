import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput, Alert } from "react-native"
import globalstyles from '../../global/Style'
const { width, height } = Dimensions.get('window')
import { register } from "../../backend/firebase-utility";

const SelectedRegister = ({navigation}: {navigation: any}) => {
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    function handleClick(mail : string, password: string) {
        let fullname = firstName + " " + lastName;
        register(mail, password, fullname);
        navigation.navigate('Home');
    }

    return(
        <View style={styles.container}>
            <View  style={styles.wrapper}>
                <Text style={globalstyles.title}>Kauppapaikka-käyttäjätili</Text>
                <TextInput style={globalstyles.input} placeholder="Etunimi" onChangeText={firstname => setFirstname(firstname)}></TextInput>
                <TextInput style={globalstyles.input} placeholder="Sukunimi" onChangeText={lastname => setLastname(lastname)}></TextInput>
                <TextInput style={globalstyles.input} placeholder="Sähköposti" onChangeText={mail => setMail(mail)}></TextInput>
                <TextInput style={globalstyles.input} placeholder="Salasana" onChangeText={pass => setPassword(pass)}></TextInput>
                <TouchableOpacity style={styles.btn} onPress={()=>handleClick(mail, password)}>
                    <Text style={styles.btntext}>Rekisteröidy</Text>
                </TouchableOpacity>
            </View>
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
    wrapper: {
        padding: 10
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

export default SelectedRegister