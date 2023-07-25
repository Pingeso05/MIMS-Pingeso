import { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import {ruta_back, ruta_front} from '../utils/globals.js';
import '../utils/globals.css';

const AgregarUsuario = () => {
  const [nombreTipo, setNombreTipo] = useState('');
  const [materialTipo, setMaterialTipo] = useState('');
  const token = localStorage.getItem('accessToken');
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (nombreTipo.trim() === '' || materialTipo.trim() === '') {
      alert('Por favor, completa todos los campos');
      return;
    }

    try {
      await axios.post(ruta_back + 'tipojoya', {
        nombre: nombreTipo,
        material: materialTipo,
      },{
        headers: {
          Authorization: token, 
        }
      });

      setNombreTipo('');
      setMaterialTipo('');

      alert('Tipo de joya agregado exitosamente');
      window.location.href = ruta_front + 'tipos-de-joya';
    } catch (error) {
      console.log(error);
      alert('Ocurrió un error al agregar el tipo de joya');
    }
  };

  return (
    <Container style={{ textAlign: 'center' }} className="container-add-edit">
      <div>
        <h2 className="titulo">Agregar Usuario</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombreTipo">Nombre del Tipo:</label>
            <input
              type="text"
              id="nombreTipo"
              value={nombreTipo}
              onChange={(e) => setNombreTipo(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="materialTipo">Material:</label>
            <input
              type="text"
              id="materialTipo"
              value={materialTipo}
              onChange={(e) => setMaterialTipo(e.target.value)}
            />
          </div>

          <button type="submit">Agregar Usuario</button>
        </form>

        <div className="separador"> </div>
      </div>
    </Container>
  );
};

export default AgregarUsuario;
