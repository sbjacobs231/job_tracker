import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

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
            <div className="p-5 text-center bg-light">
                <Row>
                    <Col>
                        <h1 className="mb-3">Welcome to Job Tracker</h1>
                        <p className="p-3">
                        Lorem ipsum dolor sit amet. Rem officia distinctio et galisum Quis ut illum voluptas. Et maxime rerum ut sequi enim non commodi itaque et dolor quia et porro libero ut doloremque vero. Aut dolores error ut commodi voluptatem qui eveniet deserunt et earum eius ut aspernatur repellendus.
                        </p>
                        <div className="hero-buttons">
                        <Button variant="primary" className="m-2" onClick={handleSignupClick}>Sign Up</Button>
                        <Button variant="secondary" className="m-2" onClick={handleLoginClick}>Login</Button>
                        </div>
                    </Col>
                </Row>
            </div>
            <Container className="features-section text-center">
                <Row>
                <Col md={3}>
                    <div className="feature-box mt-5">
                    <i className="bi bi-globe fs-5"></i>
                    <p>Use this space to promote the business, its products or its services.</p>
                    </div>
                </Col>
                <Col md={3}>
                    <div className="feature-box mt-5">
                    <i className="bi bi-pencil fs-5"></i>
                    <p>Use this space to promote the business, its products or its services.</p>
                    </div>
                </Col>
                <Col md={3}>
                    <div className="feature-box mt-5">
                    <i className="bi bi-eye fs-5"></i>
                    <p>Use this space to promote the business, its products or its services.</p>
                    </div>
                </Col>
                <Col md={3}>
                    <div className="feature-box mt-5">
                    <i className="bi bi-heart fs-5"></i>
                    <p>Use this space to promote the business, its products or its services.</p>
                    </div>
                </Col>
                </Row>
            </Container>

        </div>
    )
}

export default MainPage;