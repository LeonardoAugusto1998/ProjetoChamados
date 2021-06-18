
import './header.css';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Link } from 'react-router-dom';
import avatar from '../../assets/avatar.png';
import cover from '../../assets/cover.png';

export default function Header(){

const { user } = useContext(AuthContext);

    return(
        <div>
            <img src={user.avatarUrl == null ? avatar : user.avatarUrl} alt='foto de perfil'/>
            <img src={cover} alt='cover'/>
            
        </div>qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
    );
}