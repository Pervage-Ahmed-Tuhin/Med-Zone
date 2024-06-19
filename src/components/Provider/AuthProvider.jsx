import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";



import { GoogleAuthProvider } from "firebase/auth";

const GoogleProvider = new GoogleAuthProvider();

import { GithubAuthProvider } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import axios from "axios";
import useAxiosPublic from "../Hooks/useAxiosPublic ";

const GithubProvider = new GithubAuthProvider();

export const AuthContext = createContext(null);



const AuthProvider = ({ children }) => {
    const [length, setLength] = useState(0);
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);
    const [infoHolder, setInfoHolder] = useState({});
    const axisPublic = useAxiosPublic();
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

    // Save user in database

    // Save user in database
    // const saveUser = async (user) => {
    //     const currentUser = {
    //         email: user?.email,
    //         role: user.role || "user",
    //         status: 'verified',
    //     };
    //     try {
    //         const { data } = await axios.put('http://localhost:5000/user', currentUser);
    //         return data;
    //     } catch (error) {
    //         console.error('Error saving user to the database:', error);
    //     }
    // };
    const saveUser = async (user, role = "user") => {
        const currentUser = {
            email: user?.email,
            role: role,
            status: 'verified',
        };
        try {
            const { data } = await axios.put('http://localhost:5000/user', currentUser);
            return data;
        } catch (error) {
            console.error('Error saving user to the database:', error);
        }
    };
    const loginUser = (email, password) => {
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        const Unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setInfoHolder(currentUser);
            // if (currentUser) {
            //     saveUser(currentUser);
            // }
            const userInfo = { email: currentUser.email }
            if (currentUser) {
                axisPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {

                            localStorage.setItem('access-token', res.data.token);
                        }
                    })
            } else {
                localStorage.removeItem('access-token');
            }
            setLoader(false);

        });
        return () => {
            Unsubscribe();
        }
    }, [axisPublic])

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
        setUser,
        saveUser,
        length, setLength
    }

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;