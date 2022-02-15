import React, { useState, useContext } from 'react';
import AuthService from '../../Services/Auth';
import Message from '../Message/Message';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = props => {
    const [user, setUser] = useState({ username: '', password: '' });
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const navigate = useNavigate();

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.login(user).then(data => {
            const { isAuthenticated, user, message } = data;
            if (isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                navigate('/positivestart');
            }
            else
                setMessage(message);
        });
    }

    return (
        <section className="vh-100 bg-image">
            <div className="mask d-flex align-items-center h-100 bg-dark">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card">
                                <div className="card-body p-5">
                                    <form onSubmit={onSubmit}>
                                        <h2 className="text-uppercase text-center mb-5">Login</h2>
                                        <div className="form-outline mb-3">
                                            <label htmlFor="username" className="form-label">Username:</label>
                                            <input type="text" className="form-control form-control-lg"
                                                name='username'
                                                onChange={onChange}
                                                placeholder="Enter Username" />
                                        </div>
                                        <div className="form-outline mb-3">
                                            <label htmlFor="password" className="form-label">Password:</label>
                                            <input type="password" className="form-control form-control-lg"
                                                name='password'
                                                onChange={onChange}
                                                placeholder="Enter Password" />
                                        </div>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col text-center">
                                                    <button className="btn btn-lg btn-primary btn-block" type='submit'>Log in</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    {message ? <Message message={message} /> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
};

export default Login;