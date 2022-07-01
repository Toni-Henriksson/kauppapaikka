import { getDatabase, set, ref, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Generates data bundle from user listed item for sale. 
// Sends generated data bundle to backend service (firebase)
export const GenerateListing = async (imgUrls, dataBundle) => {
    try {
        const db = getDatabase();
        let urlArr = []
        let postId = '';
        let uid = '';
        const auth = getAuth();

        // Basic info is saved to posts, urls is just a dummy field at this point to prevent errors
        push(ref(db, 'posts/'), {
            title: dataBundle[0].title,
            price: dataBundle[0].price,
            category: dataBundle[0].category,
            additionalInfo: dataBundle[0].additionalInfo,
            urls: [1, 2, 3],
        }).then((snap) => {
            // Loop through pictures user took from the item and place url's to array
            let key = snap.key;
            let uidfetch = auth.currentUser.uid;
            postId = key;
            uid = uidfetch

            for (let i = 0; i < imgUrls.length; i++) {
                urlArr.push(imgUrls[i])
            }
            // Finally accessing the same post made in previous steps, and pushing new column to it.(image urls)
        }).finally(() => {
            let arr = [urlArr[0], urlArr[1], urlArr[2]]
            set(ref(db, 'posts/' + postId + '/urls'), {
                arr
            });
            // Save post specific ID to keep track of all the different users posts. Saving this to users own database.
            push(ref(db, 'users/' + uid + "/usersPosts"), {
                postId
            });
        });
    }
    catch (error) {
        console.log("ERROR: " + error.message);
    }
}
