import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import { MainButton } from "../../components/buttons/Main";
import globalstyles from '../../global/Style'
const { width, height } = Dimensions.get('window')

const Register = ({navigation}: {navigation: any}) => {
    function handleLogin(page : string){
        alert(page)
        navigation.navigate(page)
    } 
    return(
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={globalstyles.title}>Kauppapaikka</Text>
            </View>
            <View style={styles.bottom}>
                <Text style={{fontWeight: 'bold', alignSelf: 'center', fontSize: 25, marginBottom: 20}}>Luo kauppapaikka-käyttäjätili</Text>
                <MainButton text={"Luo gmaililla"} onPress={()=>{}}></MainButton>
                <MainButton text={"Luo sähköpostilla"} onPress={()=>{handleLogin('SelectedRegister')}}></MainButton>
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
})

export default Register