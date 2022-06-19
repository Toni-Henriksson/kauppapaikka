import { Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native"

export const MainButton = ({text}) => {
    return(
        <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btntext}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
     alignSelf: 'center',
     backgroundColor: '#f99f38',
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
