import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import './Modificar_Inventario.css';
import '../utils/globals';
import { ruta_back, ruta_front } from '../utils/globals';

const Carga_Cantidad = ({ joyas, onCancel, onSubmit }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [cantidades, setCantidades] = useState(joyas.map(() => ''));
  const [locacionSeleccionada, setLocacionSeleccionada] = useState('');
  const [locaciones, setLocaciones] = useState([]);
  const token = localStorage.getItem('accessToken');
  const user = localStorage.getItem('user');
  const userData = JSON.parse(user); // Convertir el string a un objeto

  const getLocaciones = async () => {
    try {
      const res = await axios.get(ruta_back + 'locacion',{
        headers: {
          Authorization: token, 
        }});
      const locacionesUnicas = [...new Set(res.data.map(locacion => locacion.nombre))];
      setLocaciones(locacionesUnicas);
    } catch (error) {
      console.log(error);
      console.log('error: No se pudieron obtener la locaciones!');
    }
  };

  useEffect(() => {
    getLocaciones();
  }, []);

  const handleSubmit = async (event) => {
    // ... (resto del código)

    setIsOpen(false);
    onSubmit();
    alert('Se han cargado exitosamente los productos al inventario');
    window.location.href = ruta_front + 'inventario';
  };

  const handleCancel = () => {
    setIsOpen(false);
    onCancel();
  };

  const handleChangeCantidad = (index, value) => {
    // ... (resto del código)
  };

  const handleLocacionChange = (event) => {
    // ... (resto del código)
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-container">
      <Container style={{ textAlign: 'center' }} className="container-popup">
        <div className="popup-header">
          <button className='button-exit' onClick={handleCancel}>Salir</button>
        </div>
        <div className="popup-body">
          <div className="locaciones-menu">
            <label htmlFor="locacion">Seleccione la locación de destino:</label>
            <select className='dropdown-tb'
              value={locacionSeleccionada}
              onChange={handleLocacionChange}
            >
              <option value="">Local</option>
              {locaciones.map((locacion, index) => (
                <option value={locacion} key={index}>{locacion}</option>
              ))}
            </select>
          </div>
          <table className="joya-table tabla-joyas"> {/* Agregamos una clase "tabla-joyas" */}
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {joyas.map((joya, index) => (
                <tr key={index}>
                  <td>{joya.nombre}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={cantidades[index]}
                      onChange={(e) => handleChangeCantidad(index, e.target.value)}
                      className="cantidad-input" // Agregamos una clase "cantidad-input"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="separador"></div>
          <button type="submit" onClick={handleSubmit}>
            Agregar al inventario
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Carga_Cantidad;
