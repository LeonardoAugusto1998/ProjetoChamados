
import './header.css';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Link } from 'react-router-dom';
import avatar from '../../assets/avatar.png';
import { FiUsers, FiUser, FiHome } from 'react-icons/fi';

export default function Header(){

const { user } = useContext(AuthContext);

    return(
        <div className='sidebar'>
            <div>
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt='foto de perfil'/>
            </div>
            
            <Link to='/clientes'> <FiUsers size={24}/>Clientes</Link> 
            <Link to='/dashboard'> <FiHome size={24}/>Chamados</Link>
            <Link to='/perfil'><FiUser size={24}/>Meu Perfil</Link>
            
        </div>
    );
}