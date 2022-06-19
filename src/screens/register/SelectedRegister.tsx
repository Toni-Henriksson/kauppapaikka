import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput } from "react-native"
import { MainButton } from "../../components/buttons/Main";
import globalstyles from '../../global/Style'
const { width, height } = Dimensions.get('window')

const SelectedRegister = ({navigation}: {navigation: any}) => {
    function handleClick() {
        navigation.navigate('Home')
    }
    return(
        <View style={styles.container}>
            <View  style={styles.wrapper}>
                <Text style={globalstyles.title}>Kauppapaikka-käyttäjätili</Text>
                <TextInput style={globalstyles.input} placeholder="Etunimi"></TextInput>
                <TextInput style={globalstyles.input} placeholder="Sukunimi"></TextInput>
                <TextInput style={globalstyles.input} placeholder="Sähköposti"></TextInput>
                <TextInput style={globalstyles.input} placeholder="Salasana"></TextInput>
                <MainButton text={"Rekisteröidy"}></MainButton>
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
        padding: 50
    },
})

export default SelectedRegister