import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import './Joya.css';
import { useNavigate } from 'react-router-dom';
import { ruta_back } from '../utils/globals.js';
import '../utils/globals.css';
import { FaEdit } from 'react-icons/fa';
import Editar_Joya from '../Popups/Editar_Joya';

const Administrar_Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState('');
  const [showEditarJoya, setShowEditarJoya] = useState(false);
  const [joyaSeleccionada, setJoyaSeleccionada] = useState(null);
  const [editarJoya, setEditarJoya] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const token = localStorage.getItem('accessToken');

  const getUsuarios = async () => {
    try {
      const res = await axios.get(ruta_back + 'usuario',{
        headers: {
          Authorization: token, 
        }
      });
      setUsuarios(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };



  const handlePopupSubmit = async () => {
    try {
      await getUsuarios();
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    getUsuarios();
  }, []);


  return (
    <Container style={{ marginTop: '50px', textAlign: 'center' }} className="container-table">
      <h1 className='titulo'>USUARIOS</h1>

      <Row style={{ marginTop: '20px' }}>
          <Col className="left-col" md={6}>
            <span style={{ marginRight: '10px', fontWeight: 'bold' }}>USUARIOS:</span>
            <span>{usuarios.length}</span>
          </Col>
 
        <Col className="right-col" md={6} >
          <Link to="/usuarios/agregar-usuario">
            <Button variant="primary"  style={{ marginRight: '10px' , backgroundColor: '#D5418F', borderRadius: '10', borderColor: 'transparent',fontSize:'14px'}}>Agregar Usuario</Button>
          </Link>    
        </Col>
      </Row>


      <div style={{ overflow: 'auto', maxHeight: '55vh', marginTop: '20px' }}>
        <Table bordered hover className="table">
          <thead>
            <tr className='cabeceras'>
              <th>NOMBRE</th>
              <th>CORREO</th>
              <th>ROL</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr key={index}>
                <td>{usuario.nombre} {usuario.apellido}</td>
                <td>{usuario.email}</td>
                <td>{usuario.rol}</td>
                
              </tr>
            ))}
          </tbody>
        </Table>
      </div>


    </Container>
  );
};

export default Administrar_Usuarios;