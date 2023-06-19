import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './TipoJoyaEditar.css';
import {ruta_back, ruta_front} from '../utils/globals.js';
import '../utils/globals.css';

const EditarTipoJoya = () => {
  const { id } = useParams();

  const [nombre, setNombre] = useState('');
  const [material, setMaterial] = useState('');

  const getTipoJoya = async () => {
    try {
      const res = await axios.get(ruta_back + 'tipojoya/' + id);
      const tipoJoya = res.data;

      setNombre(tipoJoya.nombre);
      setMaterial(tipoJoya.material);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (nombre.trim() === '' || material.trim() === '') {
      alert('Por favor, completa todos los campos');
      return;
    }

    try {
      await axios.put(ruta_back + 'tipojoya/' + id, {
        nombre: nombre,
        material: material,
      });

      setNombre('');
      setMaterial('');

      alert('Tipo de Joya actualizado exitosamente');
      window.location.href = ruta_front + 'tipos-de-joya';
    } catch (error) {
      console.log(error);
      alert('Ocurrió un error al actualizar el tipo de joya');
    }
  };

  useEffect(() => {
    getTipoJoya();
  }, [id]);

  return (
    <Container style={{ textAlign: 'center' }} className="container-add-edit">
      <div>
        <h2 className="titulo">Editar Tipo de Joya</h2>

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
            <label htmlFor="material">Material:</label>
            <input
              type="text"
              id="material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            />
          </div>

          <button type="submit">Actualizar Tipo de Joya</button>
        </form>
      </div>
    </Container>
  );
};

export default EditarTipoJoya;
