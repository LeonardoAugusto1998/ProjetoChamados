
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import { Route, Redirect } from 'react-router-dom';

export default function RouteWrapper({
    component: Component,
    Block,
    ...rest
}){

    const { signed } = useContext(AuthContext);

    if(!signed && Block){
        return <Redirect to='/'/>
    }

    if(signed && !Block){
        return <Redirect to='/dashboard'/>
    }

    return(
        <Route
            {...rest}
            render={ props => (
                <Component {...props}/>
            )}
        />
    );
}