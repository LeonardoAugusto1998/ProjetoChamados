import { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConnection';

export const AuthContext = createContext({})

export default function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(()=>{

        function Loadstorage(){
            const userDadosStorage = localStorage.getItem('Users');

            if(userDadosStorage){
                setUser(JSON.parse(userDadosStorage));
            }
        }
        Loadstorage();
    }, [])

    async function cadastrar(email, senha, nome){


        await firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then( async (value) =>{
            let uid = value.user.uid;

            await firebase.firestore().collection('Users')
            .doc(value.user.uid).set({
                nome: nome,
                avatarUrl: null,
            })
            .then( () =>{
                let data = {
                    uid: value.user.uid,
                    nome: nome,
                    email: value.user.email,
                    avatarUrl: null
                }
                setUser(data);
                salvarLocalStorage(data);
            })
        })
    }

    function salvarLocalStorage(data){
        localStorage.setItem('Users', JSON.stringify(data));
    }

    return(
        <AuthContext.Provider value={{signed: !!user, user, setUser, cadastrar, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}