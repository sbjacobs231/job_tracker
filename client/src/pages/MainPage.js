import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './mainpage.css';
import Marketing from '../components/Marketing';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTasks, faChartLine } from '@fortawesome/free-solid-svg-icons';


function MainPage() {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLoginClick = () => {
        navigate('/login'); // Navigate to the login page
    };

    const handleSignupClick = () => {
        navigate('./signup'); 
    }

    return (
        <div>
            <Container className="hero p-5 bg-light">
                <Row>
                    <Col>
                        <h1 className="hero-header">Track & Organize <br></br>Your Job Search</h1>
                        <p className="hero-text">The leading tool for organizing, tracking,<br></br> and managing all of your job applications in one place.</p>
                        <div className="hero-buttons">
                        <Button variant="primary" className="m-2" onClick={handleSignupClick}>Sign Up</Button>
                        <Button variant="secondary" className="m-2" onClick={handleLoginClick}>Login</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container className="features-section text-center">
                <Row>
                    <Col md={4}>
                        <Marketing icon={faSave} heading="Save Jobs" text="Save jobs throughout your search. A fast, convenient way to bookmark jobs."/>
                    </Col>
                    <Col md={4}>
                        <Marketing icon={faTasks} heading="Track & Organize" text="Keep a high level view of your job search pipeline." />
                    
                    </Col>
                    <Col md={4}>
                        <Marketing icon={faChartLine} heading="Get Insights" text="View rich keyword & skill insights for every job." />
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default MainPage;