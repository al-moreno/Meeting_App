import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';


const NavLink = ({to, children}) =>{
    const location = useLocation();
    return <Nav.Link as={Link} to={to} active={location.pathname === to}>{children}</Nav.Link>

}

const MeetingNav = () => {

    

    return (
        <Nav variant="tabs" >
            <Nav.Item>
                <NavLink  to="/positivestart">Positive Start</NavLink>
            </Nav.Item>
            <Nav.Item>
            <NavLink  to="/incomingupdates">Incoming Updates</NavLink>
            </Nav.Item>
            <Nav.Item>
            <NavLink  to="/almanac">Almanac</NavLink>
            </Nav.Item>
            <Nav.Item>
            <NavLink  to="/quarterlygoals">Quarterly Goals</NavLink>
            </Nav.Item>
            <Nav.Item>
            <NavLink  to="/weeds">Weeds</NavLink>
            </Nav.Item>
            <Nav.Item>
            <NavLink  to="/wrapup">Wrap Up</NavLink>
            </Nav.Item>


        </Nav>
    )
}

export default MeetingNav;