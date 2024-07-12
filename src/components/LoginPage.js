import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser,setRedirectFunction  } from '../services/api';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    localStorage.clear()
    setRedirectFunction(navigate('/Login')); 
  },[navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Codificar la contraseña en Base64
      const encodedPassword = btoa(password);
      const result = await loginUser(username, encodedPassword);
      if(result){
        localStorage.setItem('token', result);
        navigate('/data');
      }else{
        setError('Username or Password invalid');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={4}>
          <h2 className="my-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Login
            </Button>
          </Form>
          <div className="mt-3">
            <Link to="/register">Don't have an account? Register here</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;