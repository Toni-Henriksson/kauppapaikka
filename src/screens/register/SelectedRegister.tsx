import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput } from "react-native"
import { MainButton } from "../../components/buttons/Main";
import globalstyles from '../../global/Style'
const { width, height } = Dimensions.get('window')

const SelectedRegister = ({navigation}: {navigation: any}) => {
    function handleLogin(page : string){
        navigation.navigate(page)
    } 

    return(
        <View style={styles.container}>
            <View  style={styles.wrapper}>
                <Text>Luo Kauppapaikka-käyttäjätili</Text>
                <TextInput placeholder="Etunimi"></TextInput>
                <TextInput placeholder="Sukunimi"></TextInput>
                <TextInput placeholder="Sähköposti"></TextInput>
                <TextInput placeholder="Salasana"></TextInput>
                <MainButton text={"Rekisteröidy"} onPress={()=>{ handleLogin('Home')}}></MainButton>
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
    wrapper: {

    },
})

export default SelectedRegister