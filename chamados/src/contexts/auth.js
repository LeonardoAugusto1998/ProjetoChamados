import { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConnection';

export const AuthContext = createContext({})

export default function AuthProvider({children}){
    const [user, setUser] = useState(null);
    
   
   
        useEffect( () => {

             function loadStorageUser(){
         const document_Storage = localStorage.getItem('Users');

        if(document_Storage){
            setUser(JSON.parse(document_Storage));
        }

    }

    loadStorageUser();
}, []);

        async function cadastrar(email, senha, nome){

            await firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then( async (value)=>{

                await firebase.firestore().collection('Users')
                .doc(value.user.uid)
                .set({
                    nome: nome,
                    avatarUrl: null,
                })
                .then(()=>{

                    let data = {
                        uid: value.user.uid,
                        nome: nome,
                        email: value.user.email,
                        avatarUrl: null,
                    }

                    setUser(data);
                    salvarUsuario(data);

                })

            })
            .catch((err)=>{console.log(err)})

        }

            

        function salvarUsuario(data){
            localStorage.setItem('Users', JSON.stringify(data));
        }

        async function deslogar(){
            await firebase.auth().signOut();
            localStorage.removeItem('Users');
            setUser(null);
        }

        
    return(
        <AuthContext.Provider value={{signed: !!user, setUser, cadastrar, deslogar }}>
            {children}
        </AuthContext.Provider>
    )
}