
import './login.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function Login(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    

    function acessar(e){
        e.preventDefault();
        
    }

    return(
        <div className='container-center'>
            <div className='login'>
                <div className='logo-area'>
                    <img src={logo} alt='logo'/>
                </div>

                <form onSubmit={acessar}>
                    <h1>Entrar</h1>
                    <label>Login</label>
                    <input type='email' value={email} placeholder='exemplo@exemplo.com' onChange={(e)=>{setEmail(e.target.value)}}/>
                    <label>Senha</label>
                    <input type='password' value={senha} placeholder='********' onChange={(e)=>{setSenha(e.target.value)}}/>
                    <button type='submit'>Acessar</button>
                    <Link to='/cadastro'>Criar uma Conta</Link>
                </form>
            </div>
        </div>
    )
}

