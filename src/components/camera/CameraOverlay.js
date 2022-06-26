import { Camera } from "expo-camera";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

const CameraOverlay = ({setCameraOpen, setPhoto}) => {
    let camera;

    async function takePicture(){
        if( camera ) {
            let options = {
                quality: 1,
                base64: true,
                exif: false
            };
          const data = await camera.takePictureAsync(options);
          setPhoto(data)
          Alert.alert(data.uri);
        }
      }

    return(
        <View style={styles.container}>
            <Camera style={styles.camera} ref={ref => {camera = ref}}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={()=>{setCameraOpen(false)}}>
                        <Text style={styles.text}>Sulje</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={takePicture}>
                        <Text style={styles.text}>Ota kuva</Text>
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
        height: "100%",
    },
    buttonContainer:{
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center'
    },
    camera: {
        width: "100%",
        height: "80%",
    },
    button: {
        width: 200,
        height: 40,
        backgroundColor: 'white',
        alignSelf: 'center',
        margin: 10,
        backgroundColor: '#f99f38',
        borderRadius: 5,
    },
    text: {
        alignSelf: 'center',
        padding: 10,
        color: 'white'
    },
})

export default CameraOverlay