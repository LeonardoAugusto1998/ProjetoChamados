
import Header from '../../components/Header'
import { AuthContext } from '../../contexts/auth';
import { useContext } from 'react';

export default function Dashboard(){

    const { deslogar } = useContext(AuthContext);

       function deslogarFunc(){
        localStorage.removeItem('Users');
        deslogar();
        }


    return(
        <div>
                <Header/>
                <h1>Página de Dashboard</h1>
            <button onClick={deslogarFunc}>Deslogar</button>            
        </div>
    )
    
}