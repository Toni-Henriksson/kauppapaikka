import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert } from "react-native"
import { MainButton } from "../../components/buttons/Main";
import globalstyles from '../../global/Style'
const { width, height } = Dimensions.get('window')

const Register = ({navigation}: {navigation: any}) => {
    function handleClick(page : string) {
        navigation.navigate(page)
    }

    return(
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={globalstyles.title}>Kauppapaikka</Text>
            </View>
            <View style={styles.bottom}>
                <Text style={{fontWeight: 'bold', alignSelf: 'center', fontSize: 25, marginBottom: 20}}>Luo kauppapaikka-käyttäjätili</Text>

                <TouchableOpacity style={styles.btn} onPress={()=>handleClick('Home')}>
                    <Text style={styles.btntext}>Luo Gmaililla</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn}  onPress={()=>handleClick('SelectedRegister')}>
                    <Text style={styles.btntext}>Luo Sähköpostilla</Text>
                </TouchableOpacity>

                <Text style={{alignSelf: 'center', marginTop: 10, fontSize: 10}}>Rekisteröitymällä hyväksyt Palveluehdot ja Yksityisyydensuojan.</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
    },
    top:{
        marginTop: height / 10,
        height: height * 0.65,
        justifyContent: 'center',
    },
    bottom: {
        height: height * 0.3,
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

export default Register