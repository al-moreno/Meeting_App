import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';

function Copyright(props) {
    return (
        <div className="text-center text-muted mt-5 mb-0" href="#" {...props}>
            <div className="text-center text-muted mt-5 mb-0">Already have an account? <a href="/login" className="fw-bold text-body"><u>Login here</u></a></div>
            {'Copyright © '} Eureka Process{' '}
            {new Date().getFullYear()}
            {'.'}
        </div>
    );
}

const Register = props => {
    const [user, setUser] = useState({ username: '', password: '', role: '' });
    const [message, setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        }

    }, []);

    const navigate = useNavigate();

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const resetForm = () => {
        setUser({ username: '', password: '', role: "" });
    }


    const onSubmit = e => {
        e.preventDefault();
        AuthService.register(user).then(data => {
            const { message } = data;
            setMessage(message);
            resetForm();
            if (!message.msgError) {
                timerID = setTimeout(() => {
                    navigate('/login');
                } )
            }
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
                                    <h2 className="text-uppercase text-center mb-5">Sign Up</h2>
                                    <form onSubmit={onSubmit}>
                                        <div className="form-outline mb-3">
                                            <label htmlFor="username" className="form-label">Username:</label>
                                            <input type="text" className="form-control form-control-lg"
                                                name='username'
                                                value={user.username}
                                                onChange={onChange}
                                                className="form-control"
                                                placeholder="Enter Username" />
                                        </div>
                                        <div className="form-outline mb-3">
                                            <label htmlFor="password" className="form-label">Password:</label>
                                            <input type="password" className="form-control form-control-lg"
                                                name='password'
                                                value={user.password}
                                                onChange={onChange}
                                                className="form-control"
                                                placeholder="Enter Password" />
                                        </div>
                                        <div className="form-outline mb-3">
                                            <label htmlFor="role" className="form-label">Role:</label>
                                            <input type="text" className="form-control form-control-lg"
                                                name='role'
                                                value={user.role}
                                                onChange={onChange}
                                                className="form-control"
                                                placeholder="Enter Role (Admin/User)" />
                                        </div>
                                        <div class="container">
                                            <div class="row">
                                                <div class="col text-center">
                                                    <button className="btn btn-lg btn-primary btn-block" type='submit'>Register</button>
                                                </div>
                                            </div>
                                        </div>
                                        <Copyright />
                                    </form>
                                    {message ? <Message message={message} /> : null}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    )
};

export default Register;