import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import { MainButton } from "../../components/buttons/Main";
import globalstyles from '../../global/Style'
const { width, height } = Dimensions.get('window')

const Register = () => {
    return(
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={globalstyles.title}>Kauppapaikka</Text>
            </View>
            <View style={styles.bottom}>
                <Text>Register screen</Text>
                <MainButton text={"Luo gmaililla"}></MainButton>
                <MainButton text={"Luo sähköpostilla"}></MainButton>
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
        height: height * 0.7,
    },
    bottom: {
        height: height * 0.2,
    },
})

export default Register