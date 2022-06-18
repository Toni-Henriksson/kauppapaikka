import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import globalstyles from '../../global/Style'
import Carousel from "../../components/carousel/Carousel"
import { dummyData } from "../../components/carousel/Data"
const { width, height } = Dimensions.get('window')

const LoginScreen = () => {
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={globalstyles.title}>Kauppapaikka</Text>
                <Text style={globalstyles.p}>Osta ja myy käytettyä tavaraa turvallisesti</Text>
            </View>
            <View style={styles.carousell}>
                <Carousel data = {dummyData}/>
            </View>
            <View style= {styles.controls}>
                <TouchableOpacity style={styles.registerbtn}>
                    <Text style={styles.btntext}>Luo käyttäjätili</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginbtn}>
                    <Text style={{color: 'black', fontWeight: 'bold', textAlign: 'center', padding: 6, fontSize: 15}}>Kirjaudu sisään</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
   container: {
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
   },
   header: {
    alignItems: 'center',
    height: '10%',
    marginTop: 60
   },
   carousell: {
    height: '70%',
    paddingTop: height / 10
   },
   controls: {
    height: '10%'
   },
   registerbtn: {
    backgroundColor: '#fc9003',
    width: 350,
    height: 38,
    borderRadius: 25,
    margin: 5,
    elevation: 2,
   },
   loginbtn: {
    backgroundColor: '#F0F0F0',
    borderColor: 'black',
    borderWidth: 1,
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
export default LoginScreen