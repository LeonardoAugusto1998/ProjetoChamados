
import  { AuthContext }  from '../../contexts/auth';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import firebase from '../../services/firebaseConnection';
import { toast } from 'react-toastify'

export default function Login(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');

    const { salvarUsuario, setUser, loading, setLoading } = useContext(AuthContext);

    async function cadastrarFunc(e){
        e.preventDefault();
        
            await firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then( async (value)=>{

                let data = {
                    uid: value.user.uid,
                    nome: nome,
                    email: value.user.email,
                    avatarUrl: null,
                }

                setUser(data);
                salvarUsuario(data);
                setLoading(false);
                toast.success('Seja bem Vindo à nossa plataforma');
                setEmail('');
                setSenha('');
                setNome('');

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
                    setEmail('');
                    setSenha('');
                    setNome('');
                    

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

    return(
        <div className='container-center'>
            <div className='login'>
                <div className='logo-area'>
                    <img src={logo} alt='logo'/>
                </div>

                <form onSubmit={cadastrarFunc}>
                    <h1>Cadastro</h1>
                    <label>Nome</label>
                    <input type='text' value={nome} placeholder='Digite seu nome' onChange={(e)=>{setNome(e.target.value)}}/>
                    <label>Login</label>
                    <input type='email' value={email} placeholder='exemplo@exemplo.com' onChange={(e)=>{setEmail(e.target.value)}}/>
                    <label>Senha</label>
                    <input type='password' value={senha} placeholder='********' onChange={(e)=>{setSenha(e.target.value)}}/>
                    <button type='submit'>{loading ? 'Carregando...' : 'Cadastrar'}</button>
                    <Link to='/'>Ja tem Conta? Entrar</Link>
                </form>
            </div>
        </div>
    )
}