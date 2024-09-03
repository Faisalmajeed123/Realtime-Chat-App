import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";


export const AuthContext = createContext()

export const Authcontextprovider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(undefined)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            console.log('user', user)
            if (user) {
                setIsAuthenticated(true)
                setUser(user)
                updateUserData(user.uid)
            } else {
                setIsAuthenticated(false)
                setUser(null)
            }
        })
        return unsub;
    }, []);

    const updateUserData= async(userId)=>{
        const docRef = doc(db, 'users', userId)
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            let data = docSnap.data();
            setUser({...user, username: data.name, profileUrl: data.photoURL, userId: data.userId})
        }
    };

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            return{success: true}
        } catch (error) {
            console.log('error message', error)
            return { success: false, msg: error.message }
        }
    };


    const logout = async () => {
        try {
            await signOut(auth);
            return{success: true}
        } catch (error) {
            console.log('error message', error)
            return { success: false, msg: error.message }
        }
    };


    const register = async (email, password, name, photoURL ) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('response.user: ', response?.user)

            await setDoc(doc(db, 'users', response?.user?.uid), {
                name,
                photoURL,
                userId: response?.user?.uid
            });

            return { success: true, data: response?.user }
        } catch (error) {
            console.log('error message', error)
            return { success: false, msg: error.message }
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext)
    if (!value) {
        throw new Error('Useauth must be wrapped inside AuthContext Provider')
    }
    return value;
};



