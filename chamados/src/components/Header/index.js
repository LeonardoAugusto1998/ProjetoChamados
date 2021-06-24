
import './header.css';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Link } from 'react-router-dom';
import avatar from '../../assets/avatar.png';
import cover from '../../assets/cover.png';
import { FiHome, FiUser, FiSettings } from 'react-icons/fi';

export default function Header(){

const { user } = useContext(AuthContext);

    return(
        <div className='sidebar'>
            <div>
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt='foto de perfil'/>
            </div>
            
            <Link to='/dashboard'>Clientes <FiHome size={24}/></Link> 
            <Link to='/dashboard'>Chamados <FiSettings size={24}/></Link>
            <Link to='/dashboard'>Meu Perfil <FiUser size={24}/></Link>
            
        </div>
    );
}