import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import './Modificar_Inventario.css';
import '../utils/globals';
import { ruta_back } from '../utils/globals';
import { alertaError, alertaSuccess, alertaWarning } from '../utils/alertas';

const Editar_Locacion = ({ id, onCancel, onSubmit }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [nombreLocacion, setNombreLocacion] = useState('');
  const [regionOg, setRegion] = useState('');
  const [comunaOg, setComuna] = useState('');
  const [comunas, setComunas] = useState([]);
  const [regiones, setRegiones] = useState([]);
  const [direccion, setDireccion] = useState('');
  const token = localStorage.getItem('accessToken');

  const getLocacion = async () => {
    try {
      const res = await axios.get(ruta_back + 'locacion/' + id,{
        headers: {
          Authorization: token, 
        }
      });
      const locacionR = res.data;
      setNombreLocacion(locacionR.nombre);
      setDireccion(locacionR.direccion);
      const res2 = await axios.get(ruta_back + 'comuna/' + locacionR.comuna,{
        headers: {
          Authorization: token, 
        }
      });
      const comunaRes = res2.data;
      setComuna(comunaRes.id);
      setRegion(comunaRes.id_region);
    } catch (error) {
      console.log(error);
    }
  };

  const getComunas = async () => {
    try {
      const res = await axios.get(ruta_back + 'comuna',{
        headers: {
          Authorization: token, 
        }
      });
      setComunas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRegiones = async () => {
    try {
      const res = await axios.get(ruta_back + 'region',{
        headers: {
          Authorization: token, 
        }
      });
      setRegiones(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocacion();
    getComunas();
    getRegiones();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      nombreLocacion.trim() === '' ||
      String(regionOg).trim() === '' ||
      String(comunaOg).trim() === '' ||
      direccion.trim() === ''
    ) {
      alertaWarning('Por favor, completa todos los campos');
      return;
    }

    try {
      await axios.put(ruta_back + 'locacion/' + id, {
        nombre: nombreLocacion,
        direccion: direccion,
        deleted: false,
        comuna: comunaOg,
        region: regionOg,
      },{
        headers: {
          Authorization: token, 
        }
      });

      setNombreLocacion('');
      setRegion('');
      setComuna('');
      setDireccion('');
      onSubmit();
      setIsOpen(false);
      alertaSuccess('Locación editada exitosamente');
    } catch (error) {
      alertaError('Ocurrió un error al agregar la locación');
    }
  };

  const handleSelectedRegion = (e) => {
    const region = e.target.value;
    setRegion(region);
  };

  const handleSelectedComuna = (e) => {
    const comuna = e.target.value;
    setComuna(comuna);
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
          <button className="button-exit" onClick={handleCancel}>
            Salir
          </button>
        </div>
        <div className="popup-body">
          <div>
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
                  value={regionOg}
                  onChange={handleSelectedRegion}
                >
                  <option value="">Seleccione una Región</option>
                  {regiones.map((region) => (
                    <option value={region.id} key={region.id}>
                      {region.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="comuna">Comuna:</label>
                <select
                  id="comuna"
                  value={comunaOg}
                  onChange={handleSelectedComuna}
                >
                  <option value="">Seleccione una Comuna</option>
                  {comunas
                    .filter((comuna) => comuna.id_region === Number(regionOg))
                    .map((comuna) => (
                      <option value={comuna.id} key={comuna.id}>
                        {comuna.nombre}
                      </option>
                    ))}
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

              <button type="submit">Editar Locación</button>
            </form>

            <div className="separador"> </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Editar_Locacion;
