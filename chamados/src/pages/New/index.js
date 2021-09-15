
import './new.css';
import * as React from 'react'
import Title from '../../components/Title';
import Header from '../../components/Header';
import { FiPlusCircle } from 'react-icons/fi';

export default function New(){

    const [date, setDate] = React.useState()

    return(
        <div>

            <Header/>

                <div className='content'>
                    <Title name='Adicionar Chamado'>
                        <FiPlusCircle size={25}/>
                    </Title>
                

                <div className='container'>
                    <form className='form-profile' >
                    <label>Cliente:</label>
                        <select>
                            <option>Cliente 1</option>
                            <option>Cliente 2</option>
                            <option>Cliente 3</option>
                        </select>

                        <label>Assunto: </label>
                        <select>
                            <option>Suporte</option>
                            <option>Opção 2</option>
                            <option>Opção 3</option>
                        </select>

                    <div className='status'>
                        <input type='radio' name='Em Aberto' value='Aberto'/><span>Em Aberto</span>
                        <input type='radio' name='Em Progresso' value='Progresso'/><span>Em Progresso</span>
                        <input type='radio' name='Atendido' value='Atendido'/><span>Atendido</span>
                    </div>

                    <textarea type='text' placeholder='Digite seu comentário...'/>
                    </form>
                </div>
            </div>
        </div>
    );
}