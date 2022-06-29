import { connectStorageEmulator } from "firebase/storage"
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Image } from "react-native"

const Item = ({data}) => {
    return(
        <>
        <View style={styles.itemContainer}>
            <View style = {styles.leftContainer}>
                <Image style={{resizeMode: 'cover', width: "100%", height: "100%"}} source={require('../../images/naytonohjain.jpg')}></Image>
            </View>
            <View style = {styles.rightContainer}>
                <Text style={{fontWeight: 'bold'}}>{data[0].title}</Text>
                <Text>Käytetty</Text>
                <Text style={{fontWeight: 'bold'}}>{data[0].price}€</Text>
                <Text>Vantaa | 18 kesäkuuta 11:08</Text>
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        width: 350,
        height: 160,
        flexDirection: 'row',
        borderRadius: 15,
        borderWidth:1,
        borderColor: "#C0C0C0",
        marginBottom: 10,
        overflow: "hidden",
    },
    leftContainer:{
        width: "40%",
    },
    rightContainer:{
        width: "60%",
        padding: 10,
    },
})
export default Item