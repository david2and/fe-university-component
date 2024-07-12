import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Codificar la contraseña en Base64
      if (!username || !password) {
        setError('All fields are required.');
        return;
      }
      const encodedPassword = btoa(password);
      await registerUser(username, encodedPassword);
      setSuccess("REGISTRO EXITOSO");
      setTimeout(() => {
        navigate('/login');  // Redirigir a la página de login
      }, 2000); 
    } catch (err) {
      setError(err.message);
    }
  };

  const backLogin = async () => {
    navigate('/login');
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={4}>
          <h2 className="my-4">Registro</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleRegister}>
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
              Registrar
            </Button>
            <div></div>
            <Button variant="primary" onClick={backLogin} className="mt-3">
            Regresar
            </Button>
          </Form>
        </Col>
      </Row>

    </Container>
    
  );
};

export default RegisterPage;