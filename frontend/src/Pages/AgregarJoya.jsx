import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import './AgregarJoya.css';
import {ruta_back, ruta_front} from '../utils/globals.js';
import '../utils/globals.css';

const AgregarJoya = () => {
  const [nombreJoya, setNombreJoya] = useState('');
  const [cost, setCost] = useState('');
  const [tipoJoya, setTipoJoya] = useState('');
  const [tipos, setTipos] = useState([]);

  const getTipos = async () => {
    try {
      const res = await axios.get(ruta_back + 'tipojoya');
      setTipos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTipos();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (nombreJoya.trim() === '' || tipoJoya.trim() === '' || cost.trim() === '') {
      alert('Por favor, completa todos los campos');
      return;
    }

    try {
      await axios.post(ruta_back + 'joya', {
        nombre: nombreJoya,
        id_tipo_joya: tipoJoya,
        cost: cost,
      });

      setNombreJoya('');
      setTipoJoya('');
      setCost('');

      alert('Joya agregada exitosamente');
      window.location.href = ruta_front + 'joyas';
    } catch (error) {
      console.log(error);
      alert('Ocurrió un error al agregar la joya');
    }
  };

  return (
    <Container style={{ textAlign: 'center' }} className="container-add-edit">
      <div>
        <h2 className="titulo">Agregar Joya</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombreJoya">Nombre de la Joya:</label>
            <input
              type="text"
              id="nombreJoya"
              value={nombreJoya}
              onChange={(e) => setNombreJoya(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="cost">Precio Costo:</label>
            <input
              type="number"
              min="0"
              step="1"
              id="Precio costo"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="tipoJoya">Tipo de Joya:</label>
            <select
              id="tipoJoya"
              value={tipoJoya}
              onChange={(e) => setTipoJoya(e.target.value)}
            >
              <option value="">Selecciona un Tipo</option>
              {tipos.map((tipo, index) => (
                <option value={tipo.id} key={tipo.id}>{tipo.nombre}</option>
              ))}
            </select>
          </div>

          <button type="submit">Agregar Joya</button>
        </form>

        <div className="separador"> </div>
      </div>
    </Container>
  );
};

export default AgregarJoya;
