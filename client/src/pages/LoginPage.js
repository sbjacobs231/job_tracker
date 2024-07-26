import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [invalidInput, setInvalidInput] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(data => {
      const token = data.token;
      document.cookie = `token=${token}`;
      navigate('/dashboard');
    })
    .catch(error => setInvalidInput(true));
  };

  const changeInput = (e) => {
    setInvalidInput(false);
    if (e.target.id === "formBasicUsername") {
      setUsername(e.target.value);
    } else if (e.target.id === "formBasicPassword") {
      setPassword(e.target.value);
    } else {
      console.error("Invalid input type");
    }
  }

  return (
    <Container className="p-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">Login</h2>
          <Form onSubmit={handleSubmit} className="mb-3 mt-5">
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={changeInput}
                required
                isInvalid={invalidInput}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={changeInput}
                required
                isInvalid={invalidInput}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
