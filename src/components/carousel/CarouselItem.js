import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')


const CarouselItem = ({ item }) => {
    return (
        <View style={styles.cardView}>
            <Image style={styles.image} source={{ uri: item.url }} />
            <View style={styles.textView}>
                <Text style={styles.itemTitle}> {item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardView: {
        flex: 1,
        width: width - 20,
        height: height / 2,
        backgroundColor: '#F0F0F0',
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },

    textView: {
        position: 'absolute',
        bottom: 10,
        width: '95%',
        height: '20%',
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 2,
        padding: 5,
        margin: 10,
    },
    image: {
        width: width - 20,
        height: height / 2,
        borderRadius: 10
    },
    itemTitle: {
        color: 'black',
        fontSize: 22,
        marginBottom: 5,
        fontWeight: "bold",
        alignSelf: 'center',
    },
    itemDescription: {
        color: 'black',
        fontSize: 14,
        alignSelf: 'center',
    }
})

export default CarouselItem