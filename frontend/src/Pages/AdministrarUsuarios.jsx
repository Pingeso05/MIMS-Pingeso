import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import './Joya.css';
import { ruta_back } from '../utils/globals.js';
import '../utils/globals.css';
import Swal from 'sweetalert2';
import { alertaError } from '../utils/alertas';
import Editar_Usuario from '../Popups/Editar_Usuario';


const AdministrarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showEditarUsuario, setShowEditarUsuario] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(false);
  const token = localStorage.getItem('accessToken');

  const getUsuarios = async () => {
    try {
      const res = await axios.get(ruta_back + 'usuario',{
        headers: {
          Authorization: token, 
        }
      });
      setUsuarios(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setShowEditarUsuario(true);
  };

  const handleDeleteClick = async (usuario) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro de eliminar al usuario ' + usuario.nombre + ' ' + usuario.apellido + '?',
        text: "Esta acción no se podrá revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Eliminar'
      });
  
      if (result.isConfirmed) {
        const res = await axios.delete(ruta_back + 'usuario/' + usuario.id, {
          headers: {
            Authorization: token,
          }
        });
        getUsuarios();
        Swal.fire(
          'Usuario Eliminado',
          'El usuario ha sido eliminado con éxito',
          'success'
        );
      } 
    } catch (error) {
      alertaError('Ha ocurrido un error al eliminar al usuario');
    }
  };

  const handlePopupSubmit = async () => {
    try {
      await getUsuarios();
    } catch (error) {
      alertaError("Error al obtener usuarios");
    }
    setShowEditarUsuario(false);
  };

  useEffect(() => {
    getUsuarios();
  }, []);


  return (
    <Container style={{ marginTop: '30px', textAlign: 'center' }} className="container-table">
      <h1 className='titulo'>USUARIOS</h1>

      <Row style={{ marginTop: '20px' }}>
          <Col className="left-col" md={6}>
            <span style={{ marginRight: '10px', fontWeight: 'bold' }}>USUARIOS:</span>
            <span>{usuarios.length}</span>
          </Col>
 
        <Col className="right-col" md={6} >
          <Link to="/admin/usuarios/agregar-usuario">
            <Button variant="primary"  style={{ marginRight: '10px' , backgroundColor: '#D5418F', borderRadius: '10', borderColor: 'transparent',fontSize:'14px'}}>Agregar Usuario</Button>
          </Link>    
        </Col>
      </Row>


      <div className="div-table">
        <Table bordered hover className="table">
          <thead>
            <tr className='cabeceras'>
              <th>NOMBRE</th>
              <th>CORREO</th>
              <th>ROL</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr key={index}>
                <td>{usuario.nombre} {usuario.apellido}</td>
                <td>{usuario.email}</td>
                <td>{usuario.rol}</td>
                <td style={{ width: '160px' }}>
                  <div >
                    <Row>
                      <Col style={{padding:'2px'}}><Button variant="primary" onClick={() => handleEditClick(usuario.id)}  style={{backgroundColor: 'success', borderRadius: '10', borderColor: 'transparent',fontSize:'10px'}}>EDITAR</Button></Col>
                      <Col><Button variant="danger" onClick={() => handleDeleteClick(usuario)} style={{backgroundColor: 'danger', borderRadius: '10', borderColor: 'transparent',fontSize:'10px'}}>ELIMINAR</Button></Col>
                    </Row>
                    
                  </div>
                  </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {showEditarUsuario && (
        <Editar_Usuario
          id={usuarioSeleccionado}
          onCancel={() => setShowEditarUsuario(false)}
          onSubmit={handlePopupSubmit}
        />
      )}

    </Container>
  );
};

export default AdministrarUsuarios;