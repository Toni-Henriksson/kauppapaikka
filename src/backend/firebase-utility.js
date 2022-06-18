export const login = async (email, password) => {
    try{
        const user = await signInWithEmailAndPassword(auth, email, password);
    }catch(error){
        console.log(error.message);
    }
};