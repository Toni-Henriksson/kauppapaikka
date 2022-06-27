import { getStorage, uploadBytes, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Alert } from "react-native";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const UploadImg = async (image, userID) => {
    const storage = getStorage();
    let fileName = "image.jpg" + uuidv4();
    let itemID = uuidv4();
    const imageRef = ref(storage, `${userID}/${itemID}/${fileName}`);
    const img = await fetch(image.uri);
    const bytes = await img.blob();

    await uploadBytesResumable(imageRef, bytes)
        .then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                return url
            });
        }).catch((error) => {
            Alert.alert('Upload failed', error);
            // ...
    });
}