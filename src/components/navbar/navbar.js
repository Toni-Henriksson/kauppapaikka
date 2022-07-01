import { useState } from "react";
import { View, Dimensions, StyleSheet, TouchableOpacity, Image } from "react-native";
import AddItemPopUp from "../ModalComponents/AddItemPopUp";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get('window')

const Navbar = () => {
    // Add item for sale functionality
    const [visible, setVisible] = useState(false);
    const AddItem = () => {
        setVisible(true)
    }
    const navigation = useNavigation();
    const handleNav = (params) => {
        navigation.navigate(params)
    }

    return(
        <>
        <AddItemPopUp visible={visible} setVisible={setVisible}></AddItemPopUp>
            <View style={styles.NavBarContainer}>
                <TouchableOpacity style={styles.section}>
                    <Image style={{resizeMode: 'cover', width: 20, height: 20}} source={require('../../images/home.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.section} onPress={()=>{handleNav('Profile')}}>
                    <Image style={{resizeMode: 'cover', width: 20, height: 20}} source={require('../../images/user-edgy.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sectionMiddle} onPress={()=>{AddItem()}}>
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
      borderRadius: 5,
      backgroundColor: "lightgreen",
      elevation: 2,
    },
})

export default Navbar

