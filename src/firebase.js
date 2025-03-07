import { initializeApp } from "firebase/app";
import {
     createUserWithEmailAndPassword,
     getAuth, 
     signInWithEmailAndPassword, 
     signOut } from "firebase/auth";
import {
     addDoc,
     collection, 
     getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";



const firebaseConfig = {
  apiKey: "AIzaSyBZ2h2pIcTHt395nA0Js-98nfe7-BuGDe8",
  authDomain: "netflix-clone-164a8.firebaseapp.com",
  projectId: "netflix-clone-164a8",
  storageBucket: "netflix-clone-164a8.firebasestorage.app",
  messagingSenderId: "803328496472",
  appId: "1:803328496472:web:cbca96595ec9b0e6d7cb2d"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try{
       const res = await createUserWithEmailAndPassword(auth, email, password);
       const user = res.user;
       await addDoc(collection(db,"user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
       });

    } catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }

}
const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        

    }

}
const logout =()=>{
    signOut(auth);
}

export{auth, db, login, signup, logout};