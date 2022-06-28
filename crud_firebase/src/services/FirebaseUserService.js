import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendEmailVerification } from 'firebase/auth'


export default class FirebaseUserService {

    static signup = (auth, login, password, callback) => {
        createUserWithEmailAndPassword(
            auth, login, password
        )
            .then(
                (userCredential)=>{
                    sendEmailVerification(userCredential.user)
                    .then(() => {
                        callback(true, userCredential.user)  
                    })
                .catch((error) => {
                    callback(false, error.code)
                }); 
                
            })
    
            .catch(
                (error) => {
                    callback(false, error.code)
                    console.log(error.code)
                }
            )
    }

    static login = (auth, email, password, callback) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(
                (userCredential) => {
                    callback(userCredential.user)
                }
            )
            .catch(error => {callback(null); console.log(error)})
    }

    static logout = (auth, callback) => {
        signOut(auth)
            .then(
                () => callback(true)
            )
            .catch((error) => { console.log(error); callback(false) })
    }


}