import { connectStorageEmulator } from "firebase/storage"
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Image } from "react-native"

const Item = ({ data }) => {
    return (
        <>
            <View style={styles.itemContainer}>
                <View style={styles.leftContainer}>
                    <Image style={{ resizeMode: 'cover', width: "100%", height: "100%" }} source={{ uri: data.img }}></Image>
                </View>
                <View style={styles.rightContainer}>
                    <View style={{ height: '33%' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{data.title}</Text>
                    </View>
                    <View style={{ height: '33%' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{data.price}€</Text>
                    </View>
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
        borderWidth: 1,
        borderColor: "#C0C0C0",
        marginBottom: 10,
        overflow: "hidden",
    },
    leftContainer: {
        width: "40%",
    },
    rightContainer: {
        width: "60%",
        padding: 10,
    },
})
export default Item