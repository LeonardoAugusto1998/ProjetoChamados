import { Route, Redirect } from 'react-router-dom';

export default function RouteWrapper({
    component: Component,
    Block,
    ...rest
}){

    const signed = false;

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