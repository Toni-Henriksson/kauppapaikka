import { getDatabase, set, ref,push} from 'firebase/database';

export const GenerateListing = async(imgUrls, dataBundle) => {
    try{
        const db = getDatabase();
        push(ref(db, 'posts/'), {
            title: dataBundle[0].title,
            price: dataBundle[0].price,
            category: dataBundle[0].category,
            additionalInfo: dataBundle[0].additionalInfo,
        }).then((snap) => {
            const key = snap.key;
            for(let i=0; i<imgUrls.length; i++){
                console.log("Generating listing...: " + imgUrls[i])
                push(ref(db, 'posts/' + key + "/imageUrls"), {
                    key: imgUrls[i],
                });
            }
        });
        console.log("Data pushed to db!")
    }catch(error){
        console.log("ERROR: " + error.message);
    }
}
