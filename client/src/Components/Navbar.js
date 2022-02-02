import React, { useContext } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';

const Navbar = props => {
    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    // resetting user 
    const onClickLogoutHandler = () => {
        AuthService.logout().then(data => {
            if (data.success) {
                setUser(data.user);
                setIsAuthenticated(false);
                navigate("/home");
            }
        });
    }

    // navbar to display if not authorized or logged in
    const unauthenticatedNavBar = () => {
        return (
            <>
                <Link to="/">
                    <li className="nav-item nav-link">
                        Home
                    </li>
                </Link>
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
    const authenticatedNavBar = () => {
        return (
            <>
                <Link to="/">
                    <li className="nav-item nav-link">
                        Home
                    </li>
                </Link>
                <Link to="/todos">
                    <li className="nav-item nav-link">
                        Todos
                    </li>
                </Link>
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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to='/'>
                    <div className="navbar-brand">
                        Eureka Process
                    </div>

                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        
                        {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}

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