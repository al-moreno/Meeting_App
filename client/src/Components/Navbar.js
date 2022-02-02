import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
import Image from '../images/Eureka-logo.png';

const Navbar = props => {
    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    // resetting user 
    const onClickLogoutHandler = () => {
        AuthService.logout().then(data => {
            if (data.success) {
                setUser(data.user);
                setIsAuthenticated(false);
                navigate("/");
            }
        });
    }

    // navbar to display if not authorized or logged in
    const UnauthenticatedNavBar = () => {
        return (
            <>
                {/* <Link to="/">
                    <li className="nav-item nav-link">
                        Home
                    </li>
                </Link> */}
                <Link to="/login">
                    <li className="nav-item nav-link">
                        Login
                    </li>
                </Link>
                <Link to="/register">
                    <li className="nav-item nav-link">
                        Register
                    </li>
                </Link>
            </>
        )
    }

    // navbar to be deisplayed if logged in
    const AuthenticatedNavBar = () => {
        return (
            <>
                {/* <Link to="/">
                    <li className="nav-item nav-link">
                        Home
                    </li>
                </Link> */}
                {/* <Link to="/incomingupdates">
                    <li className="nav-item nav-link">
                        Incoming Updates
                    </li>
                </Link> */}
                {
                    user.role === "admin" ?
                        <Link to="/admin">
                            <li className="nav-item nav-link">
                                Admin
                            </li>
                        </Link> : null
                }

                <button type='button' className='btn btn-link nav-item nav-link' onClick={onClickLogoutHandler}>Logout</button>

            </>
        )
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to='/'>
                    <div className="navbar-brand">
                        <img src={Image} alt="..." class="img-thumbnail" />
                    </div>
                </Link>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        {!isAuthenticated ? <UnauthenticatedNavBar /> : <AuthenticatedNavBar />}

                    </ul>
                    <span className="navbar-text">
                        Welcome
                    </span>
                </div>
            </div>
        </nav>
    )
};

export default Navbar;