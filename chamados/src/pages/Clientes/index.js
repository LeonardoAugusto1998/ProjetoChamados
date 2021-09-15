
import { FiUsers } from 'react-icons/fi';
import * as React from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import firebase from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify';

export default function Clientes(){
    const { user } = React.useContext(AuthContext)

    const [nomeFantasia, setNomeFantasia] = React.useState('');
    const [cnpj, setCnpj] = React.useState('');
    const [endereco, setEndereco] = React.useState('');


    async function cadastrarClientes(e){

        e.preventDefault()

        if(nomeFantasia !== '' && cnpj !== '' && endereco !== ''){
        await firebase.firestore().collection('Clientes')
        .doc(user.uid)
        .set({
            nomeFantasia: nomeFantasia,
            cnpj: cnpj,
            endereco: endereco
        })
        .then( () => {
            toast.success('Cliente cadastrado com sucesso !')
            setNomeFantasia('');
            setCnpj('');
            setEndereco('');
        })
        .catch((err)=>{
            console.log(`Ocorreu um erro ${err}`);
            toast.error('Ocorreu um erro ao cadastrar o cliente')            
        })
    }else{
        toast.error('Todos os Campos são obrigatórios de Preencher !')
    }
}

    return(
        <div>
            <Header/>

            <div className='content'>

                    <Title name='Clientes'>
                        <FiUsers size={25}/>
                    </Title>
                <div className='container'>
                    <form className='form-profile' onSubmit={cadastrarClientes}>

                        <label>Nome Fantasia:</label>
                        <input type='text' placeholder='Nome fantasia da sua Empresa' value={nomeFantasia} onChange={(e)=>{setNomeFantasia(e.target.value)}}/>

                        <label>CNPJ/CPF:</label>
                        <input type='text' placeholder='CNPJ ou CPF' value={cnpj} onChange={(e)=>{setCnpj(e.target.value)}}/>

                        <label>Endereço:</label>
                        <input type='text' placeholder='Endereço da sua Empresa' value={endereco} onChange={(e)=>{setEndereco(e.target.value)}}/>
                        
                        <button type='submit' className='but'>Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}