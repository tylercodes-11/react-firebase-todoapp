import { useContext, createContext, useEffect, useState } from "react";
import { GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    signInWithRedirect,
     } from "firebase/auth";

import {auth} from '../firebase';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
        const [user, setUser] = useState({});

        const googleSignIn = async () => {
            const provider =   new GoogleAuthProvider();
             await signInWithRedirect(auth, provider);
                       
        } 

        const logOut = () => {
            signOut(auth).then(() => {
                // Sign-out successful.
              }).catch((error) => {
                console.log(error);
                // An error happened.
              });
        }

        useEffect(()=> {
            const unsubscribe =  onAuthStateChanged(auth,(currentUser) =>{
            
                 setUser(currentUser);
                // console.log('User', currentUser);
            })
            return () => {
                unsubscribe();
            }
        }, []);


    return (
        <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
            {/* not loading then show the children */}
            {children} 
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
};