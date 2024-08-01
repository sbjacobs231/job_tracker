import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      const response = await fetch('/api/signup', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          username,
          password
        })
      });
      const data = await response.json();
      alert(data.message)
    };

    return (
    <Container className="p-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center mb-5" >Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3">
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    )
}

export default Signup;