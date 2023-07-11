import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import './Joya.css';
import { useNavigate } from 'react-router-dom';
import {ruta_back} from '../utils/globals.js';
import '../utils/globals.css';
import { FaEdit } from 'react-icons/fa';
import Editar_Joya from '../Popups/Editar_Joya';

const Joya = () => {
  const [joyas, setJoyas] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState('');
  const [showEditarJoya, setShowEditarJoya] = useState(false);
  const [joyaSeleccionada, setJoyaSeleccionada] = useState(null);
  const token = localStorage.getItem('accessToken');

  const getJoyas = async () => {
    try {
      const res = await axios.get(ruta_back + 'joya',{
        headers: {
          Authorization: token, 
        }
      });
      setJoyas(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleEditClick = (joya) => {
    setJoyaSeleccionada(joya);
    setShowEditarJoya(true);
  };

  const handlePopupSubmit = async () => {
      try {
        await getJoyas();
      } catch (error) {
        console.log(error);
      }
    setShowEditarJoya(false);
  };

  const getTipos = async () => {
    try {
      const res = await axios.get(ruta_back + 'tipojoya',{
        headers: {
          Authorization: token, 
        }
      });
      const tiposUnicos = [...new Set(res.data.map(tipo => tipo.nombre))];
      setTipos(tiposUnicos);
    } catch (error) {
      console.log(error);
    }
  };

  
  useEffect(() => {
    getJoyas();
    getTipos();
  }, []);

  const filteredJoyas = tipoSeleccionado ? joyas.filter(joya => joya.tipo_joya === tipoSeleccionado) : joyas;

  return (
    <Container style={{ marginTop: '50px', textAlign: 'center' }} className="container-table">
      <h1 className='titulo'>Joyas</h1>

      <Row style={{ marginTop: '20px' }}>
          <Col className="left-col" md={6} >
            <span style={{ marginRight: '10px', fontWeight: 'bold' }}>Joyas:</span>
            <span>{filteredJoyas.length}</span>
          </Col>
        <Col className="right-col" md={6}>
          <Link to="/joyas/agregar-joya">
            <Button variant="primary"  style={{ marginRight: '10px' , backgroundColor: '#D5418F', borderRadius: '10', borderColor: 'transparent', fontSize:'14px'}}>Agregar Joya</Button>
          </Link>    
        </Col>
      </Row>

      <div style={{ overflow: 'auto', maxHeight: '55vh', marginTop: '20px' }}>
        <Table bordered hover className='table'>
          <thead>
            <tr className='cabeceras'>
              <th>Nombre</th>
              <th>Tipo de Joya</th>
              <th>Precio Costo</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredJoyas.map((joya, index) => (
              <tr key={index}>
                <td>{joya.nombre}</td>
                <td>{joya.tipo_joya}</td>
                <td>${Number(joya.cost).toLocaleString()}</td>
                <td>
                  <div className='icono-columna'>
                    <FaEdit title='Editar Joya' className='icono' onClick={() => handleEditClick(joya.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>    
      </div>

        {showEditarJoya && (
        <Editar_Joya
          id={joyaSeleccionada}
          onCancel={() => setShowEditarJoya(false)}
          onSubmit={handlePopupSubmit}
        />
         )}

    </Container>
  );
};
  
export default Joya;
