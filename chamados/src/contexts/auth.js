
import { toast } from 'react-toastify'
import { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConnection';

export const AuthContext = createContext({})

export default function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    
   
   
        useEffect( () => {

             function loadStorageUser(){
         const document_Storage = localStorage.getItem('Users');

        if(document_Storage){
            setUser(JSON.parse(document_Storage));
        }

    }

    loadStorageUser();
}, []);

        async function login(email, senha){

            await firebase.auth().signInWithEmailAndPassword(email, senha)
            .then( async (value)=>{

                await firebase.firestore().collection('Users')
                .doc(value.user.uid).get()
                .then((snap)=>{
                    let data = {
                        uid: value.user.uid,
                        nome: snap.data().nome,
                        email: value.user.email,
                        avatarUrl: snap.data().avatarUrl,
                    }

                    setUser(data);
                    salvarUsuario(data);
                    setLoading(false);
                    toast.success('Seja Bem Vindo de Volta !')
                    

                })
                .catch((err)=>{
                    console.log(err);
                    setLoading(false);
                    toast.error('Ops, Parece que algo deu errado !')
                })
                
            })
            .catch((err)=>{
                console.log(err);
                setLoading(false);
                toast.error('Ops, Parece que algo deu errado !')
            })

        }

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
                    setLoading(false);
                    toast.success('Seja bem Vindo à nossa plataforma')
                    

                })
                .catch((err)=>{
                    console.log('Erro no Firestore' + err);
                    setLoading(false);
                    toast.error('Ops, Parece que algo deu errado !')
                })

            })
            .catch((err)=>{
                console.log('Erro no Auth' + err);
                setLoading(false);
                toast.error('Ops, Parece que algo deu errado !')
            })

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
        <AuthContext.Provider value={{signed: !!user, user,  setUser, cadastrar, deslogar, login, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}