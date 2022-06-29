import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { GenerateListing } from './GenerateListing';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const UploadData = async (image, dataBundle, userID) => {
    const tempArr = []
    for(let i = 0; i < image.length; i++){
        let storage = getStorage();
        let fileName = "ListedItemImage-" + uuidv4();
        let itemID = uuidv4();
        let imageRef = ref(storage, `${userID}/${itemID}/${fileName}`);
        let img = await fetch(image[i].uri);
        let bytes = await img.blob();

        await uploadBytesResumable(imageRef, bytes)
        .then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                tempArr.push(url)
                if(tempArr.length === image.length){
                    GenerateListing(tempArr, dataBundle)
                }
            });
        }).catch((error) => {
            console.log('Upload failed', error);
        });
    }
}