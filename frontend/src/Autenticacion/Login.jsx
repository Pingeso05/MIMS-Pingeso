import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import './Login.css';
import logo from '../images/Logo_Mimstransparent.png';
import {ruta_back} from '../utils/globals';

const Login = ({ id, onSubmit }) => {
  

  const [isOpen, setIsOpen] = useState(true);
  const [costo, setCosto] = useState('');
  const [joya, setJoya] = useState();
  const [tiposJoya, setTiposJoya] = useState([]);
  const [nombre, setNombre] = useState('');
  const [joyaSeleccionada, setJoyaSeleccionada] = useState('');
  const [tipoJoyaSeleccionado, setTipoJoyaSeleccionado] = useState('');

  //Obtener la joya a editar
  const getJoya = async () => {
    try {
      const res = await axios.get(ruta_back + 'joya/' + id);
      const joyaR = res.data;
      setJoya(joyaR);
        setNombre(joyaR.nombre);
        setCosto(joyaR.cost);
        setTipoJoyaSeleccionado(joyaR.id_tipo_joya);
    } catch (error) {
      console.log(error);
    }
  };

    //Obtener los tipos de joya
    const getTiposJoya = async () => {
        try {
        const res = await axios.get(ruta_back + 'tipojoya');
        const tiposJoyaR = res.data;
        setTiposJoya(tiposJoyaR);
        }
        catch (error) {
            console.log(error);
        }
    };
  
    useEffect(() => {
        getJoya();
        getTiposJoya();
    }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      nombre === '' || costo === ''
    ) {
      alert('Por favor, completa todos los campos');
      return;
    }

    try {
        await axios.put(ruta_back + 'joya/' + id, {
        nombre: nombre,
        id_tipo_joya: tipoJoyaSeleccionado,
        cost: costo,
        deleted: false
      });

  
      setTipoJoyaSeleccionado('');
      setNombre('');
      setCosto('');
      setIsOpen(false);
      onSubmit();
      alert('Producto actualizado exitosamente');
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      alert('Ocurrió un error al actualizar el producto');
    }
  };



  if (!isOpen) {
    return null;
  }

  return (
    
      <div className="login-container">
        
        <Container style={{ textAlign: 'center' }} className="container-login">
            <div className="popup-body">
            <div>  
            <div className="note-red">
              <img src={logo} alt="Logo" className="logo-login" />
            </div>
            <form onSubmit={handleSubmit} className='form-login'>

                
                <div  >
                  <label htmlFor="costo">Email:</label>
                  <input
                    type="email"
                    min="0"
                    step="1"
                    id="costo"
                    value={costo}
                    onChange={(e) => setCosto(e.target.value)}
                  />
                </div>
                <div  >
                  <label htmlFor="nombre">Contraseña:</label>
                  <input
                    type="password"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>




                <button type="submit">Iniciar Sesión</button>
              </form>

              <div className="separador"> </div>
            </div>
            </div>
        </Container>
      </div>
    
  );
};

export default Login;