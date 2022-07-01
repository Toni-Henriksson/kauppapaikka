import { getDatabase, set, ref, push } from 'firebase/database';

export const GenerateListing = async(imgUrls, dataBundle) => {
    try{
        const db = getDatabase();
        let urlArr = []
        let postId = '';

        push(ref(db, 'posts/'), {
            title: dataBundle[0].title,
            price: dataBundle[0].price,
            category: dataBundle[0].category,
            additionalInfo: dataBundle[0].additionalInfo,
            urls: [1,2,3],
        }).then((snap) => {
            const key = snap.key;
            postId = key;
            for(let i=0; i < imgUrls.length; i++){
                //console.log("Generating listing...: " + imgUrls[i])
                urlArr.push(imgUrls[i])
            }
        }).finally(()=>{
            let arr = [urlArr[0], urlArr[1], urlArr[2]]
            set(ref(db, 'posts/' + postId + '/urls'), {
                arr
            });
        });
    }
    catch(error){
        console.log("ERROR: " + error.message);
    }
}
