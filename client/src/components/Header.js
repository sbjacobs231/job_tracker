import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Header() {
    return (
        <Navbar expand="lg" className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img
                        src={logo}
                        width="35"
                        height="35"
                        className="d-inline-block align-top"
                        alt="JobTracker logo"
                    />JobTracker
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="#contacts">Contacts</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;