import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData , syncData, syncSpecificData } from '../services/api';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa'; // Importar íconos de react-icons


const MainPage = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState(new Set());

  const navigate = useNavigate();

  // Función para cargar datos
  const loadData = async () => {
    const result = await fetchData();
    setData(result);
  };

  const runSyncData = async () => {
    await syncData();
    const result = await fetchData();
    setData(result);
    alert('Data updated successfully!');
  };

  const handleUpdate = async () => {
    const selectedData = data.filter(item => selectedRows.has(item.idCourse));
    try {
      await syncSpecificData(selectedData);
      const result = await fetchData();
      setData(result);
      alert('Data updated successfully!');
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Failed to update data.');
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedRows(prevSelectedRows => {
      const newSelectedRows = new Set(prevSelectedRows);
      if (newSelectedRows.has(id)) {
        newSelectedRows.delete(id);
      } else {
        newSelectedRows.add(id);
      }
      return newSelectedRows;
    });
  };

  const onLogout = async () => {
    navigate('/login');
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col>
          <h2 className="my-4">Lista de Cursos</h2>
          <Button variant="danger" onClick={onLogout} className="mb-3">Logout</Button>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Selección</th>
                <th>ID</th>
                <th>Nombre</th>
                <th>Area</th>
                <th>Sync</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.idCourse}>
                <td>
                    <input
                    type="checkbox"
                    checked={selectedRows.has(item.idCourse)}
                    onChange={() => handleCheckboxChange(item.idCourse)}
                    />
                </td>
                  <td>{item.idCourse}</td>
                  <td>{item.name}</td>
                  <td>{item.area}</td>
                  <td>
                  {item.sync ? (
                      <FaCheck className="text-success" /> // Check mark icon
                    ) : (
                      <FaTimes className="text-danger" /> // Cross mark icon
                    )}
                    </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="primary" onClick={runSyncData} className="mt-3">
            Actualizar todos los cursos
          </Button>
          <div style={{ marginRight: '10px' }}></div>
          <Button         
                variant="primary" 
                onClick={handleUpdate} 
                className="mt-3"
                disabled={selectedRows.size === 0}
                >
        Actualizar cursos seleccinados
      </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;