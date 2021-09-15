
import './dashboard.css'
import Header from '../../components/Header'
import { AuthContext } from '../../contexts/auth';
import * as React from 'react';
import Title from '../../components/Title';
import { FiEdit2, FiHome, FiPlus, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Dashboard(){
    const [chamados, setChamados] = React.useState([{id:1}]);

    return(
        <div>
                <Header/>
                <div className='content'>
                    <Title name='Atendimentos'>
                        <FiHome size={25}/>
                    </Title>

                    {chamados.length === 0 ? (
                        <div className='container dashboard'>

                        <span>Nenhum Chamado Registrado !</span>

                        <Link to='/new' className='new' color='#FFF'>
                            <FiPlus size={25} color='#FFF'/>
                            Novo Chamado
                        </Link>

                    </div>
                    ) : (
                        <>

                        <Link to='/new' className='new' color='#FFF'>
                            <FiPlus size={25} color='#FFF'/>
                            Novo Chamado
                        </Link>

                        <table>
                            <thead>
                                <tr>
                                    <th scope='col'>Clientes</th>
                                    <th scope='col'>Assuntos</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col'>Cadastrado em</th>
                                    <th scope='col'>#</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td data-label='Cliente'>Cliente</td>
                                    <td data-label='Assunto'>Assunto</td>
                                    <td data-label='Status'>
                                        <span style={{backgroundColor: '#5cb85c'}} className='badge'>Aberto</span>
                                    </td>
                                    <td data-label='Cadastrado'>26/07/21</td>
                                    <td data-label='#'>
                                        <button  className='action' style={{backgroundColor: '#3583f6'}}>
                                            <FiSearch size={17} color='#FFF'/>
                                        </button>
                                        <button  className='action' style={{backgroundColor: '#f6a935'}}>
                                            <FiEdit2 size={17} color='#FFF'/>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        </>
                    )}
                    
                </div>
                            
        </div>
    )
    
}