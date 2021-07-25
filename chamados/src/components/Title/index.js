
import './title.css';
import { FiUser } from 'react-icons/fi';


export default function Title({children, name}){
    return(
        <div>

            <div className='title'>
                {children}
                <span>{name}</span>
            </div>
            
        </div>
    );
}