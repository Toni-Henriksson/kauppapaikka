import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image } from "react-native";
const { width, height } = Dimensions.get('window')

const Navbar = () => {
    return(
        <>
            <View style={styles.NavBarContainer}>
                <TouchableOpacity style={styles.section}>
                    <Image style={{resizeMode: 'cover', width: 20, height: 20}} source={require('../../images/home.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.section}>
                    <Image style={{resizeMode: 'cover', width: 20, height: 20}} source={require('../../images/search.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sectionMiddle}>
                    <Image style={{resizeMode: 'cover', width: 20, height: 20}} source={require('../../images/plus.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.section}>
                    <Image style={{resizeMode: 'cover', width: 20, height: 20}} source={require('../../images/bell.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.section}>
                    <Image style={{resizeMode: 'cover', width: 20, height: 20}} source={require('../../images/shopping-cart.png')}></Image>
                </TouchableOpacity>
            </View>
        </>
    ) 
}
const styles = StyleSheet.create({
    NavBarContainer: {
      position: "absolute",
      bottom: 0,  
      flexDirection: "row",  
      height: height / 15,
      width: width,
      elevation: 2,
    },
    section: {
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: width / 5,
    },
    sectionMiddle: {
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
         width: width / 5,
         borderRadius: 10,
         backgroundColor: "lightgreen",
         elevation: 1,
    },
})

export default Navbar

