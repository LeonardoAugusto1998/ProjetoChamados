import { useState, createContext, useEffect } from 'react';

export const AuthContext = createContext({})

export default function AuthProvider({children}){
    const [user, setUser] = useState(null);

    useEffect(()=>{

        function Loadstorage(){
            const userDadosStorage = localStorage.getItem('Users');

            if(userDadosStorage){
                setUser(userDadosStorage);
            }
        }
        Loadstorage();
    }, [])

    return(
        <AuthContext.Provider value={{signed: !!user, user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}