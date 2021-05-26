import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function Login(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');

    function cadastrar(e){
        e.preventDefault();
    }

    return(
        <div className='container-center'>
            <div className='login'>
                <div className='logo-area'>
                    <img src={logo} alt='logo'/>
                </div>

                <form onSubmit={cadastrar}>
                    <h1>Criar Conta</h1>
                    <label>Nome</label>
                    <input type='text' value={nome} placeholder='exemplo@exemplo.com' onChange={(e)=>{setNome(e.target.value)}}/>
                    <label>Login</label>
                    <input type='email' value={email} placeholder='exemplo@exemplo.com' onChange={(e)=>{setEmail(e.target.value)}}/>
                    <label>Senha</label>
                    <input type='password' value={senha} placeholder='********' onChange={(e)=>{setSenha(e.target.value)}}/>
                    <button type='submit'>Cadastrar</button>
                    <Link to='/'>Ja tem Conta? Entrar</Link>
                </form>
            </div>
        </div>
    )
}