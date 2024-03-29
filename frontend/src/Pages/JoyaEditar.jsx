import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './JoyaEditar.css';
import {ruta_back, ruta_front} from '../utils/globals.js';
import '../utils/globals.css';

const EditarJoya = () => {
  const { id } = useParams();

  const [nombre, setNombre] = useState('');
  const [tipoJoyaSeleccionado, setTipoJoyaSeleccionado] = useState('');
  const [tiposDeJoya, setTiposDeJoya] = useState([]);
  const token = localStorage.getItem('accessToken');

  const getJoya = async () => {
    try {
      const res = await axios.get(ruta_back + 'joya/' + id);
      const joya = res.data;

      setNombre(joya.nombre);
      setTipoJoyaSeleccionado(joya.id_tipo_joya);
    } catch (error) {
      console.log(error);
    }
  };

  const getTiposDeJoya = async () => {
    try {
      const res = await axios.get(ruta_back + 'tipojoya');
      const tiposDeJoyaUnicas = res.data;
      setTiposDeJoya(tiposDeJoyaUnicas);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (nombre.trim() === '' || tipoJoyaSeleccionado === '') {
      alert('Por favor, completa todos los campos');
      return;
    }

    try {
      await axios.put(ruta_back + 'joya/' + id, {
        nombre: nombre,
        id_tipo_joya: tipoJoyaSeleccionado,
      });

      setNombre('');
      setTipoJoyaSeleccionado('');

      alert('Joya actualizada exitosamente');
      window.location.href = ruta_front + 'joyas';
    } catch (error) {
      console.log(error);
      alert('Ocurrió un error al actualizar la joya');
    }
  };

  useEffect(() => {
    getJoya();
    getTiposDeJoya();
  }, [id]);

  return (
    <Container style={{ textAlign: 'center' }} className="container-add-edit">
      <div>
        <h2 className="titulo">Editar Joya</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="tipoJoya">Tipo de Joya:</label>
            <select
              id="tipoJoya"
              value={tipoJoyaSeleccionado}
              onChange={(e) => setTipoJoyaSeleccionado(e.target.value)}
            >
              <option value="">Seleccione un tipo de joya</option>
              {tiposDeJoya.map((tipo) => (
                <option value={tipo.id} key={tipo.id}>
                  {tipo.nombre}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">Actualizar Joya</button>
        </form>
      </div>
    </Container>
  );
};

export default EditarJoya;
