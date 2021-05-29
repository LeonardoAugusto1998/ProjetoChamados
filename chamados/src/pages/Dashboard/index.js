
import AuthContext from '../../contexts/auth';
import { useContext } from 'react';

export default function Dashboard(){

    const { deslogar } = useContext(AuthContext)

    function deslogarFunc(){
        deslogar();
    }

    return(
        <div>
            <h1>Página de Dashboard</h1>
            <button onClick={deslogarFunc}>Deslogar</button>
        </div>
    )
}