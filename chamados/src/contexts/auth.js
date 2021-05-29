import { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConnection';

export const AuthContext = createContext({})

export default function AuthProvider({children}){
    const [user, setUser] = useState(null);

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
        .then( async(value) =>{
            let uid = value.uid;
            await firebase.firestore().collection('Users')
            .doc(uid).set({
                nome: nome,
                avatarUrl: null,
            })
            .then( () =>{
                let data = {
                    uid: value.uid,
                    nome: nome,
                    email: value.email,
                    avatarUrl: null
                }
                setUser(data);
                salvarLocalStorage(data);
            })
        })
    }

    function salvarLocalStorage(data){
        localStorage.setItem('Users', data)
    }

    function deletarLocalStorage(){
        localStorage.removeItem('Users')
    }

     async function deslogar(){
        await firebase.auth().signOut()
        .then( () => {
            setUser(null);

        })
    }

    return(
        <AuthContext.Provider value={{signed: !!user, user, setUser, cadastrar, deslogar}}>
            {children}
        </AuthContext.Provider>
    )
}