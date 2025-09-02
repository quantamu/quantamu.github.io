import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import '../App.css';
import logo from '../assets/logo2.png';

const Header = () => {
    return (
        <Navbar expand="lg" className="Website-header" fixed="top">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                    <img src={logo} className="header-logo" alt="logo" />
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link as={Link} to="/about">About Us</Nav.Link>
                        <Nav.Link as={Link} to="/calendar">Calendar</Nav.Link>
                        <Nav.Link as={Link} to="/officers">Officers</Nav.Link>
                        <Nav.Link as={Link} to="/resources">Resources</Nav.Link>
                        <Nav.Link as={Link} to="/newsletter">Newsletter</Nav.Link>
                    </Nav>
                    
                    <Button 
                        variant="outline-light" 
                        href="https://discord.gg/YH5PWp8E2S" 
                        className="join-us-button"
                    >
                        Join Us
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;