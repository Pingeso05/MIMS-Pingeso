import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import './Modificar_Inventario.css';
import '../utils/globals';
import {ruta_back} from '../utils/globals';
import { alertaError, alertaSuccess, alertaWarning } from '../utils/alertas';

const Editar_Usuario = ({ id, onCancel, onSubmit }) => {
  

  const [isOpen, setIsOpen] = useState(true);
  const [apellidoSeleccionado, setApellidoSeleccionado] = useState('');
  const [emailSeleccionado, setEmailSeleccionado] = useState('');
  const [nombreSeleccionado, setNombreSeleccionado] = useState('');
  const [rolSeleccionado, setRolSeleccionado] = useState('');
  const [roles, setRoles] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const token = localStorage.getItem('accessToken');

  //Obtener el usuario a editar
  const getUsuario = async () => {
    try {
      const res = await axios.get(ruta_back + 'usuario/' + id,{
        headers: {
          Authorization: token, 
        }
      });
      const usuarioR = res.data;
        setNombreSeleccionado(usuarioR.nombre);
        setApellidoSeleccionado(usuarioR.apellido);
        setEmailSeleccionado(usuarioR.email);
        setRolSeleccionado(usuarioR.rol);
    } catch (error) {
      console.log(error);
    }
  };

  //Obtener los usuarios
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

    //Obtener los roles
    const getRoles = async () => {
      try {
        const res = await axios.get(ruta_back + 'rol',{
          headers: {
            Authorization: token, 
          }
        });
        setRoles(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  
    useEffect(() => {
        getUsuario();
        getUsuarios();
        getRoles();
    }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      nombreSeleccionado === '' || apellidoSeleccionado === '' || emailSeleccionado === '' || rolSeleccionado === ''
    ) {
      alertaWarning('Por favor, completa todos los campos');
      return;
    }
    
    try {
      
      const buscarEmail = usuarios
      .filter(usuario => (emailSeleccionado ? usuario.email === emailSeleccionado : true))
      .filter(usuario => (id ? usuario.id !== id : true));

      console.log(buscarEmail);
      if(buscarEmail.length === 0){
        await axios.put(ruta_back + 'usuario/' + id, {
          nombre: nombreSeleccionado,
          apellido: apellidoSeleccionado,
          email: emailSeleccionado,
          rol: rolSeleccionado,
          deleted: false
        },{
          headers: {
            Authorization: token, 
          }
        });
  
    
        setApellidoSeleccionado('');
        setNombreSeleccionado('');
        setEmailSeleccionado('');
        setRolSeleccionado('');
        setIsOpen(false);
        onSubmit();
        alertaSuccess('Usuario actualizado exitosamente');
    } else {
      
      alertaError('El email ya está registrado');
      return;
    }
    } catch (error) {
      console.log(error);
      alertaError('Ocurrió un error al agregar el producto');
    }
    
  };


  const handleCancel = () => {
    setIsOpen(false);
    onCancel();
  };


  if (!isOpen) {
    return null;
  }

  return (
    
      <div className="popup-container">
        <Container style={{ textAlign: 'center' }} className="container-popup">
            <div className="popup-header">
              <button className='button-exit' onClick={handleCancel}>Salir</button>
            </div>
            <div className="popup-body">
            <div>  
              
                 
              <form onSubmit={handleSubmit}>
                <h2>Editar Usuario</h2>
                <div  >
                  <label htmlFor="nombre">Nombre:</label>
                  <input
                    type="text"
                    id="nombre"
                    value={nombreSeleccionado}
                    onChange={(e) => setNombreSeleccionado(e.target.value)}
                  />
                </div>
                <div  >
                  <label htmlFor="apellido">Apellido:</label>
                  <input
                    type="text"
                    id="apellido"
                    value={apellidoSeleccionado}
                    onChange={(e) => setApellidoSeleccionado(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="email">EMAIL:</label>
                  <input
                    type="email"
                    id="email"
                    value={emailSeleccionado}
                    onChange={(e) => setEmailSeleccionado(e.target.value)}
                  />
                </div>

                <div>
                <label htmlFor="tipojoya">Rol:</label>
                    <select
                    id="tipojoya"
                    value={rolSeleccionado}
                    onChange={(e) => setRolSeleccionado(e.target.value)}
                    >
                    <option value="">Seleccione un Rol</option>
                        {roles.map((rol) => (
                        <option value={rol.id} key={rol.id}>
                            {rol.nombre}
                        </option>
                        ))}
                    </select>
                </div>


                <button type="submit">Editar Usuario</button>
              </form>

              <div className="separador"> </div>
            </div>
            </div>
        </Container>
      </div>
    
  );
};

export default Editar_Usuario;