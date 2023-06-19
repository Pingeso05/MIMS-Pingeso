import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './LocacionEditar.css';
import {ruta_back, ruta_front} from '../utils/globals.js';
import '../utils/globals.css';

const EditarLocacion = () => {
  const { id } = useParams();

  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');

  const getLocacion = async () => {
    try {
      const res = await axios.get(ruta_back + 'locacion/' + id);
      const locacion = res.data;

      setNombre(locacion.nombre);
      setDireccion(locacion.direccion);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (nombre.trim() === '' || direccion.trim() === '') {
      alert('Por favor, completa todos los campos');
      return;
    }

    try {
      await axios.put(ruta_back + 'locacion/' + id, {
        nombre: nombre,
        direccion: direccion,
      });

      setNombre('');
      setDireccion('');

      alert('Locación actualizada exitosamente');
      window.location.href = ruta_front + 'locaciones';
    } catch (error) {
      console.log(error);
      alert('Ocurrió un error al actualizar la locación');
    }
  };

  useEffect(() => {
    getLocacion();
  }, [id]);

  return (
    <Container style={{ textAlign: 'center' }} className="container-add-edit">
      <div>
        <h2 className="titulo">Editar Locación</h2>

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
            <label htmlFor="direccion">Dirección:</label>
            <input
              type="text"
              id="direccion"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>

          <button type="submit">Actualizar Locación</button>
        </form>
      </div>
    </Container>
  );
};

export default EditarLocacion;
