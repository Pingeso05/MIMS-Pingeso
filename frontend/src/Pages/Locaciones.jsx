import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import './Locaciones.css';
import { useNavigate } from 'react-router-dom';
import {ruta_back} from '../utils/globals.js';
import '../utils/globals.css';

const Locaciones = () => {
  const navigate = useNavigate();
  const [locaciones, setLocaciones] = useState([]);

  const getLocaciones = async () => {
    try {
      const res = await axios.get(ruta_back + 'locacion');
      setLocaciones(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getEditView = (id) => {
    navigate('/locaciones/editar-locacion/' + id);
  };


  useEffect(() => {
    getLocaciones();
  }, []);

  return (
    <Container style={{ marginTop: '50px', textAlign: 'center' }} className="container-table">
      <h1 className='titulo' >Locaciones</h1>      

      <Row style={{ marginTop: '20px' }}>
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
            <Table bordered hover className='table'>
            <thead >
                <tr className='cabeceras'>
                    <th>#</th>
                    <th>Opciones</th>
                    <th>Nombre</th>
                    <th>Dirección</th>
                    <th>Comuna</th>
                </tr>
            </thead>
            <tbody>
                {locaciones.map((locacion, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td><Button variant="primary" onClick={() => getEditView(locacion.id)} style={{ marginRight: '10px' , backgroundColor: '#D5418F', borderRadius: '10', borderColor: 'transparent'}}>Editar</Button></td>
                        <td>{locacion.nombre}</td>
                        <td>{locacion.direccion}</td>
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