import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import './TipoJoya.css';
import { useNavigate } from 'react-router-dom';
import {ruta_back} from '../utils/globals.js';
import '../utils/globals.css';
import { FaEdit } from 'react-icons/fa';

const TipoJoya = () => {
  const navigate = useNavigate();
  const [tipos, setTipos] = useState([]);

  const getTipos = async () => {
    try {
      const res = await axios.get(ruta_back + 'tipojoya');
      setTipos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (id) => {
    navigate('/tipos-de-joya/editar/' + id);
  };



  useEffect(() => {
    getTipos();
  }, []);


  return (
    <Container style={{ marginTop: '50px', textAlign: 'center' }} className="container-table">
      <h1 className='titulo' >Tipos de Joya</h1>

      <Row style={{ marginTop: '20px' }}>
          <Col className="left-col" md={6}>
            <span style={{ marginRight: '10px', fontWeight: 'bold' }}>Tipos:</span>
            <span>{tipos.length}</span>
          </Col>
 
        <Col className="right-col" md={6} >
          <Link to="/tipos-de-joya/agregar-tipo">
            <Button variant="primary"  style={{ marginRight: '10px' , backgroundColor: '#D5418F', borderRadius: '10', borderColor: 'transparent',fontSize:'14px'}}>Agregar Tipo Joya</Button>
          </Link>    
        </Col>
      </Row>

      <div style={{ overflow: 'auto', maxHeight: '60vh', marginTop: '20px' }}>
        <Table bordered hover className='table'>
        <thead className='cabeceras'>
            <tr >
                <th>Nombre</th>
                <th>Material</th>
                <th>Opciones</th>
            </tr>
        </thead>
        <tbody>
            {tipos.map((tipo, index) => (
                <tr key={index}>
                    <td>{tipo.nombre}</td>
                    <td>{tipo.material}</td>
                    <td>
                      <div className='icono-columna'>
                      <FaEdit title='Editar Tipo de Joya' className='icono' onClick={() => handleEditClick(tipo.id)} />
                      </div>
                    </td>
                </tr>
            ))}

        </tbody>
        </Table>    
    </div>
    </Container>
  );
};

export default TipoJoya;
