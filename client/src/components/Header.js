import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link , useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

function Header() {
    const location = useLocation();

    return (
        <Navbar expand="lg" className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img
                        src={logo}
                        height="35"
                        className="d-inline-block align-top"
                        alt="JobTracker logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link as={Link} to="/" active={location.pathname === '/'}>Home</Nav.Link>
                    <Nav.Link as={Link} to="/dashboard" active={location.pathname === '/dashboard'}>Dashboard</Nav.Link>
                    <Nav.Link as={Link} to="/" active={location.pathname === '/contacts'}>Contacts</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;