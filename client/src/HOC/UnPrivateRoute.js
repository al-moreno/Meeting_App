import React, { useContext } from 'react';
import { Route, Navigate, Outlet} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const UnPrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <Outlet {...rest} render={props => {
            if (isAuthenticated)
                return <Navigate to={{
                    pathname: '/',
                    state: { from: props.location }
                }} />

            return <Component {...props} />
        }} />
    )
}

export default UnPrivateRoute;