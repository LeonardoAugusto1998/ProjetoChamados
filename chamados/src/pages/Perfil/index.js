
import './perfil.css'
import {useContext, useState} from 'react';
import { FiUser, FiUpload } from 'react-icons/fi';
import Header from '../../components/Header';
import Title from '../../components/Title';
import avatar from '../../assets/avatar.png';
import {AuthContext} from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';
import { toast } from 'react-toastify';



export default function Perfil(){

const { user, setUser, deslogar, salvarUsuario } = useContext(AuthContext);

const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
const [nome, setNome] = useState(user && user.nome);
const [email, setEmail] = useState(user && user.email);
const [imageAvatar, setImageAvatar] = useState(null);


    function handleChange(e){
        
        if(e.target.files[0]){
            let image = e.target.files[0]

            if(image.type === 'image/png' || image.type === 'image/jpeg'){
                let fotoUrl = URL.createObjectURL(image)

                console.log(fotoUrl)
                setImageAvatar(image)
                setAvatarUrl(fotoUrl)                
            }else{
                alert('Envie um tipo de arquivo PNG ou JPEG apenas !')
            }
        }

    }

    async function handleUpload(){
        const currentUid = user.uid

        await firebase.storage()
        .ref(`images/${currentUid}/${imageAvatar.name}`)
        .put(imageAvatar)
        .then( async () => {

            await firebase.storage().ref(`images/${currentUid}`)
            .child(imageAvatar.name).getDownloadURL()
            .then( async (url) => {
                
                await firebase.firestore().collection('Users')
                .doc(user.uid)
                .update({
                    nome: nome,
                    avatarUrl: url
                })
                .then( () =>{
                    
                    let data = {
                        ...user,
                        nome: nome,
                        avatarUrl: url
                    }

                    setUser(data);
                    salvarUsuario(data);
                    toast.success('Foto de Perfil Atualizada com Sucesso !');
                })
                .catch((err) => {
                    console.log('Ocorreu um error:'+ err)
                    toast.error('OCorreu um erro')
                })
            })
        })
        
        
    }

 async function handleSave(e){

    e.preventDefault();

    if(avatarUrl === null && nome !== ''){
        await firebase.firestore().collection('Users')
        .doc(user.uid)
        .update({
            nome: nome
        })
        .then( () => {

            let data = {
                ...user,
                nome: nome
            }
            setUser(data);
            salvarUsuario(data);

            toast.success('Perfil atualizado com sucesso !')
        } )
        .catch( (err) => {
            console.log(err);
            toast.error('Ocorreu um erro')
        })
    }else if(imageAvatar !== null && nome !== ''){
        handleUpload(e);
    }
    
 }

    return(
        <div>

            <Header/>

            <div className='content'>
                <Title name='Meu Perfil'>
                    <FiUser size={25}/>
                </Title>

                <div className='container'>
                    <form className='form-profile'>
                        <label className='label-avatar'>
                            <span><FiUpload size={25} color='#FFF'/></span>
                            <input type='file' accept='image/*' onChange={handleChange}/><br/>
                            {avatarUrl === null ?
                                <img src={avatar} width={250} height={250} alt='Imagem de perfil do usuário'/> 
                                :
                                <img src={avatarUrl} width={250} height={250} alt='Imagem de perfil do usuário'/>
                            }
                        </label>

                        <label>Nome:</label>
                        <input type='text' value={nome} onChange={ (e) => {setNome(e.target.value)}}/>

                        <label>Email:</label>
                        <input type='email' value={email} disabled={true} onChange={ (e) => {setEmail(e.target.value)}}/>

                        <button type='submit' className='but' onClick={handleSave}>Salvar</button>
                    </form>
                </div>

                <div className='container'>
                        <button className='but-logout' onClick={ () => deslogar() }>Sair</button> 
                </div>

            </div>
            
        </div>
    );
}