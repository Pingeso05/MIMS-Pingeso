import { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import {ruta_back, ruta_front} from '../utils/globals.js';
import '../utils/globals.css';
import { Alert } from 'react-bootstrap';

const AgregarUsuario = () => {
  const [nombreSeleccionado, setNombreSeleccionado] = useState('');
  const [apellidoSeleccionado, setApellidoSeleccionado] = useState('');
  const [emailSeleccionado, setEmailSeleccionado] = useState('');
  const [passwordSeleccionado, setPasswordSeleccionado] = useState('');
  const [roles, setRoles] = useState([]);
  const [rolSeleccionado, setRolSeleccionado] = useState('');
  const [usuarios, setUsuarios] = useState([]);
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
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (nombreSeleccionado.trim() === '' || apellidoSeleccionado.trim() === '' || emailSeleccionado.trim() === '' || passwordSeleccionado.trim() === '' || rolSeleccionado.trim() === '') {
      alert('Por favor, completa todos los campos');
      return;
    }

    try {
      
      const buscarEmail = usuarios
      .filter(usuario => (emailSeleccionado ? usuario.email === emailSeleccionado : true));

      console.log(buscarEmail);
      if(buscarEmail.length === 0){
      await axios.post(ruta_back + 'usuario', {
        nombre: nombreSeleccionado,
        apellido: apellidoSeleccionado,
        email: emailSeleccionado,
        password: passwordSeleccionado,
        rol: rolSeleccionado,
        deleted: false
      },{
        headers: {
          Authorization: token, 
        }
      });

     
      setUsuarios([]);
      setNombreSeleccionado('');
      setApellidoSeleccionado('');
      setEmailSeleccionado('');
      setPasswordSeleccionado('');
      setRolSeleccionado('');
      alert('Usuario agregado exitosamente');
      window.location.href = ruta_front + 'usuarios';

    } else {
      
      return <Alert severity="error">This is an error alert — check it out!</Alert>;
    }
    } catch (error) {
      console.log(error);
      alert('Ocurrió un error al agregar el producto');
    }

  };

  useEffect(() => {
    getRoles();
    getUsuarios();
  }, []);

  return (
    <Container style={{ textAlign: 'center' }} className="container-add-edit">
      <div>
        <h2 className="titulo">Agregar Usuario</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre">NOMBRE:</label>
            <input
              type="text"
              id="nombre"
              value={nombreSeleccionado}
              onChange={(e) => setNombreSeleccionado(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="apellido">APELLIDO:</label>
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
            <label htmlFor="password">CONTRASEÑA:</label>
            <input
              type="password"
              id="password"
              value={passwordSeleccionado}
              onChange={(e) => setPasswordSeleccionado(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="rol">ROL:</label>
            <select
              id="rol"
              value={rolSeleccionado}
              onChange={(e) => setRolSeleccionado(e.target.value)}
            >
              <option value="">SELECCIONE ROL</option>
                {roles.map((rol,index) => (
                  <option value={rol.id} key={index}>
                    {rol.nombre}
                  </option>
                ))}
            </select>
          </div>

          <button type="submit">Agregar Usuario</button>
        </form>
        <div className="separador"> </div>
      </div>
    </Container>
  );
};

export default AgregarUsuario;
