import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import './Locaciones.css';
import {ruta_back} from '../utils/globals.js';
import '../utils/globals.css';
import { FaEdit } from 'react-icons/fa';
import Editar_Locacion from '../Popups/Editar_Locacion';

const Locaciones = () => {
  const [locaciones, setLocaciones] = useState([]);
  const [showEditar, setShowEditar] = useState(false);
  const [id, setId] = useState('');

  const getLocaciones = async () => {
    try {
      const res = await axios.get(ruta_back + 'locacion');
      setLocaciones(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (id) => {
    setId(id);
    setShowEditar(true);
  };

  const handlePopupSubmit = async () => {
    try {
      await getLocaciones();
    } catch (error) {
      console.log(error);
    }
    setShowEditar(false);
  };

  useEffect(() => {
    getLocaciones();
  }, []);

  return (
    <Container style={{ marginTop: '50px', textAlign: 'center' }} className="container-table">
      <div>
        <h1 className='titulo' >LOCACIONES</h1>      

        <Row style={{ marginTop: '20px' }}>
          <Col className="left-col" md={6}>
            <span style={{ marginRight: '10px', fontWeight: 'bold' }}>LOCACIONES:</span>
            <span >{locaciones.length}</span>
          </Col>
          <Col className="right-col" md={6}>
            <Link to="/locaciones/agregar-locacion">
              <Button variant="primary" style={{ marginRight: '10px' , backgroundColor: '#D5418F', borderRadius: '10', borderColor: 'transparent',fontSize:'14px'}}>Agregar Locación</Button>
            </Link>
            
          </Col>
        </Row>
        
            <div style={{ overflow: 'auto', maxHeight: '60vh', marginTop: '20px' }}>
              <Table bordered hover className='table'>
              <thead >
                  <tr className='cabeceras'>
                      <th>NOMBRE</th>
                      <th>DIRECCION</th>
                      <th>COMUNA</th>
                      <th>REGIÓN</th>
                      <th>OPCIONES</th>
                  </tr>
              </thead>
              <tbody>
                  {locaciones.map((locacion, index) => (
                      <tr key={index}>
                          <td>{locacion.nombre}</td>
                          <td>{locacion.direccion}</td>
                          <td>{locacion.comuna}</td>
                          <td>{locacion.region}</td>
                          <td>
                          <div className='icono-columna'>
                            <FaEdit title='Editar Locación' className='icono' onClick={() => handleEditClick(locacion.id)} />
                          </div>
                          </td>
                      </tr>
                  ))}

              </tbody>
              </Table>    
          </div>
        </div>

        {showEditar && (
        <Editar_Locacion
          id={id}
          onCancel={() => setShowEditar(false)}
          onSubmit={handlePopupSubmit}
        />
         )}
        </Container>
    );
  };
  
  export default Locaciones;