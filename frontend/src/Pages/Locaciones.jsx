import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import './Locaciones.css';

const Locaciones = () => {
  const [locaciones, setLocaciones] = useState([]);

  const getLocaciones = async () => {
    try {
      const res = await axios.get('http://localhost:8080/locacion');
      setLocaciones(res.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getLocaciones();
  }, []);

  return (
    <Container style={{ marginTop: '50px', textAlign: 'center' }} className="container-locacion">
      <h1 style={{ fontSize: '48px' }}>Locaciones</h1>      

      <Row className="fila-dp" style={{ marginTop: '20px' }}>
        <Col className="left-col" md={6}>
          <span className="locaciones-label">Locaciones:</span>
          <span className="locaciones-count">{locaciones.length}</span>
        </Col>
        <Col className="right-col" md={6}>
          <Link to="/locaciones/agregar-locacion">
            <Button variant="primary" style={{ marginRight: '10px' , backgroundColor: '#D5418F', borderRadius: '10', borderColor: 'transparent'}}>Agregar Locación</Button>
          </Link>
          
        </Col>
      </Row>
      
          <div style={{ overflow: 'auto', maxHeight: '60vh', marginTop: '20px' }}>
            <Table bordered hover className='table_locaciones'>
            <thead >
                <tr className='cabeceras'>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Dirección</th>
                    <th>Comuna</th>
                </tr>
            </thead>
            <tbody>
                {locaciones.map((locacion, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{locacion.nombre}</td>
                        <td>dirección</td>
                        <td>comuna</td>
                    </tr>
                ))}

            </tbody>
            </Table>    
        </div>
        </Container>
    );
  };
  
  export default Locaciones;