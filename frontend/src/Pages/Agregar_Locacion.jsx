import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import './AgregarLocacion.css';
import { ruta_back, ruta_front } from '../utils/globals.js';
import '../utils/globals.css';

const AgregarLocacion = () => {
  const [nombreLocacion, setNombreLocacion] = useState('');
  const [region, setRegion] = useState('');
  const [comuna, setComuna] = useState('');
  const [comunas, setComunas] = useState([]);
  const [regiones, setRegiones] = useState([]);
  const [direccion, setDireccion] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const getComunas = async () => {
    try {
      const res = await axios.get(ruta_back + 'comuna');
      setComunas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRegiones = async () => {
    try {
      const res = await axios.get(ruta_back + 'region');
      setRegiones(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComunas();
    getRegiones();
  }, []);

  const handleSelectedRegion = (e) => {
    const region = e.target.value;
    setRegion(region);
    setSelectedRegion(region);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      nombreLocacion.trim() === '' ||
      region.trim() === '' ||
      comuna.trim() === '' ||
      direccion.trim() === ''
    ) {
      alert('Por favor, completa todos los campos');
      return;
    }

    try {
      await axios.post(ruta_back + 'locacion', {
        nombre: nombreLocacion,
        direccion: direccion,
        deleted: false,
        comuna: comuna,
        region: region,
      });

      setNombreLocacion('');
      setRegion('');
      setComuna('');
      setDireccion('');

      alert('Locación agregada exitosamente');
      window.location.href = ruta_front + 'locaciones';
    } catch (error) {
      console.log(error);
      alert('Ocurrió un error al agregar la locación');
    }
  };

  return (
    <Container style={{ textAlign: 'center' }} className="container-add-edit">
      <div>
        <h2 className="titulo">Agregar Locación</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombreProducto">Nombre de la Locación:</label>
            <input
              type="text"
              id="nombreLocacion"
              value={nombreLocacion}
              onChange={(e) => setNombreLocacion(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="region">Región:</label>
            <select
              id="region"
              value={region}
              onChange={(e) => handleSelectedRegion(e)}
            >
              {regiones.map((region) => (
                <option value={region.id} key={region.id}>{region.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="comuna">Comuna:</label>
            <select
                id="comuna"
                value={comuna}
                onChange={(e) => setComuna(e.target.value)}
              >
                {comunas.filter((comuna) => comuna.id_region === Number(selectedRegion)).map((comuna) => {
                  console.log('comuna.id_region:', comuna.id_region);
                  return <option value={comuna.id} key={comuna.id}>{comuna.nombre}</option>;
                })}
              </select>

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

          <button type="submit">Agregar Local</button>
        </form>

        <div className="separador"> </div>
      </div>
    </Container>
  );
};

export default AgregarLocacion;
