import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    const { isAuthenticated, user } = useContext(AuthContext);
    return (
        <Outlet {...rest} render={props => {
            if (!isAuthenticated)
                return <Navigate to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />
            if (!roles.includes(user.role))
                return <Navigate to={{
                    pathname: '/',
                    state: { from: props.location }
                }} />
        }} />
    )
}

export default PrivateRoute;