import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";



import { GoogleAuthProvider } from "firebase/auth";

const GoogleProvider = new GoogleAuthProvider();

import { GithubAuthProvider } from "firebase/auth";
import auth from "../../Firebase/firebase.config";

const GithubProvider = new GithubAuthProvider();

export const AuthContext = createContext(null);



const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);
    const [infoHolder, setInfoHolder] = useState({});
    const createUser = (email, password) => {
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }


    const LogOutUser = () => {
        setLoader(true);
        return signOut(auth);
    }

    const GoogleLogin = () => {
        setLoader(true);
        return signInWithPopup(auth, GoogleProvider);
    }

    const GitHUbLogin = () => {
        setLoader(true);
        return signInWithPopup(auth, GithubProvider);
    }

    const UpdateUserProfile = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
        })
            .then(() => {

                // console.log("update successful");
            })
            .catch((error) => {
                // console.log(error);
            });
    }


    const loginUser = (email, password) => {
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        const Unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setInfoHolder(currentUser);
            setLoader(false);

        });
        return () => {
            Unsubscribe();
        }
    }, [])

    const info = {
        user,
        createUser,
        setInfoHolder,
        UpdateUserProfile,
        LogOutUser,
        loginUser,
        GoogleLogin,
        GitHUbLogin,
        infoHolder,
        loader,
        setUser
    }

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;