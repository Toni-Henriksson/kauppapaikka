import { Camera } from "expo-camera";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CameraOverlay = ({setCameraOpen}) => {
    return(
        <View style={styles.container}>
            <Camera style={styles.camera}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={()=>{setCameraOpen(false)}}>
                        <Text style={styles.text}> Moi </Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height: "100%"
    },
    camera: {
        width: "100%",
        height: "80%"
    }
})

export default CameraOverlay