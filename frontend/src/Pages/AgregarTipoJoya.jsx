import { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import './AgregarTipoJoya.css';
import {ruta_back, ruta_front} from '../utils/globals.js';
import '../utils/globals.css';

const AgregarTipoJoya = () => {
  const [nombreTipo, setNombreTipo] = useState('');
  const [materialTipo, setMaterialTipo] = useState('');

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
      });

      setNombreTipo('');
      setMaterialTipo('');

      alert('Tipo de joya agregado exitosamente');
      window.location.href = ruta_front + 'tipojoya';
    } catch (error) {
      console.log(error);
      alert('Ocurrió un error al agregar el tipo de joya');
    }
  };

  return (
    <Container style={{ textAlign: 'center' }} className="container-add-edit">
      <div>
        <h2 className="titulo">Agregar Tipo de Joya</h2>

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

          <button type="submit">Agregar Tipo de Joya</button>
        </form>

        <div className="separador"> </div>
      </div>
    </Container>
  );
};

export default AgregarTipoJoya;
