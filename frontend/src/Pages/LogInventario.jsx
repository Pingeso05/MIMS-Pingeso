import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Inventario.css';
import React from 'react';
import { ruta_back } from '../utils/globals.js';
import '../utils/globals.css';
import { FaEye, FaEdit } from 'react-icons/fa';
import { MdOutlineInventory } from "react-icons/md";
import Modificar_Inventario from '../Popups/Modificar_Inventario';
import Editar_Inventario from '../Popups/Editar_Inventario';
import Ver_Inventario from '../Popups/Ver_Inventario';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const LogInventario = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [locaciones, setLocaciones] = useState([]);
  const [locacionSeleccionada, setLocacionSeleccionada] = useState('');
  const [showModificarInventario, setModificarInventario] = useState(false);
  const [showEditarInventario, setEditarInventario] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [showInventario, setShowInventario] = useState(false);
  const [logInventario, setLogInventario] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const token = localStorage.getItem('accessToken');

  const getLocaciones = async () => {
    try {
      const res = await axios.get(ruta_back + 'locacion', {
        headers: {
          Authorization: token,
        }
      });
      const locacionesUnicas = [...new Set(res.data.map(locacion => locacion.nombre))];
      setLocaciones(locacionesUnicas);
    } catch (error) {
      console.log(error);
      console.log('error: No se pudieron obtener la locaciones!');
    }
  };

  const handlePopupSubmit = async () => {
    try {
      await getProductos();
    } catch (error) {
      console.log(error);
    }
    setModificarInventario(false);
    setEditarInventario(false);
  };

  const getLogInventario = async () => {
    try {
      const res = await axios.get(ruta_back + 'log_inventario', {
        headers: {
          Authorization: token,
        }
      });
      const flippedRes = res.data.reverse();
      setLogInventario(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductos = async () => {
    try {
      const res = await axios.get(ruta_back + 'inventario', {
        headers: {
          Authorization: token,
        }
      });
      setProductos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategorias = async () => {
    try {
      const res = await axios.get(ruta_back + 'log_inventario', {
        headers: {
          Authorization: token,
        }
      });
  
      // Obtener los valores únicos de registro.transaccion
      const categoriasUnicas = [...new Set(res.data.map(registro => registro.transaccion))];
      setCategorias(categoriasUnicas);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleCategoriaChange = (event) => {
    const categoria = event.target.value;
    setCategoriaSeleccionada(categoria);
  };
  
  const handleLocacionChange = (event) => {
    const locacion = event.target.value;
    setLocacionSeleccionada(locacion);
  };
  
  const handleFechaChange = (date) => {
    setFechaSeleccionada(date === null ? null : date);
  };

  // Función para formatear la fecha a "dd/MM/yyyy"
  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  useEffect(() => {
    getProductos();
    getCategorias();
    getLocaciones();
    getLogInventario();
  }, []);
  
  const filteredProductos = logInventario.filter(registro => (
    (!categoriaSeleccionada || registro.transaccion === categoriaSeleccionada) &&
    (!locacionSeleccionada || registro.nombre_locacion === locacionSeleccionada) &&
    (!fechaSeleccionada || registro.fecha_transaccion === formatDate(fechaSeleccionada))
  ));
  
  return (
    <Container style={{ marginTop: '50px', textAlign: 'center' }} className="container-table">
      <h1 className='titulo' >REGISTRO DE TRANSACCIONES</h1>

      <Row className="fila-dp" style={{ marginTop: '20px' }}>
        <Col md={3} style={{ display: 'flex', alignItems: 'left' }}>
          <select className='dropdown-tb'
            style={{ marginTop: '10px' }}
            value={categoriaSeleccionada}
            onChange={handleCategoriaChange}
          >
            <option value="">CATEGORÍA</option>
            {categorias.map((categoria, index) => (
              <option value={categoria} key={index}>{categoria}</option>
            ))}
          </select>
        </Col>
        <Col md={3} style={{ display: 'flex', alignItems: 'left', }}>
          <select className='dropdown-tb'
            style={{ marginTop: '10px' }}
            value={locacionSeleccionada}
            onChange={handleLocacionChange}
          >
            <option value="">Local</option>
            {locaciones.map((locacion, index) => (
              <option value={locacion} key={index}>{locacion}</option>
            ))}
          </select>
        </Col>
        <Col md={3} style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <DatePicker
            className='datepicker'
            selected={fechaSeleccionada}
            onChange={handleFechaChange}
            placeholderText='Seleccionar fecha'
            dateFormat='dd/MM/yyyy'
          />
        </Col>
        <Col md={3} style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '10px', fontWeight: 'bold' }}>Registros:</span>
          <span>{filteredProductos.length}</span>
        </Col>
      </Row>
  
      <div style={{ overflow: 'auto', maxHeight: '60vh', marginTop: '20px' }}>
        <Table bordered hover className='table'>
          <thead>
            <tr className='cabeceras'>
              <th className='ocultar-columna'>ID TRANSACCION</th>
              <th className='ocultar-columna'>ID PRODUCTO</th>
              <th>NOMBRE PRODUCTO</th>
              <th>FECHA</th>
              <th>RESPONSABLE</th>
              <th>CANTIDAD</th>
              <th>TIPO TRANSACCION</th>
              <th>ORIGEN TRANSACCION</th>
            </tr>
          </thead>
          <tbody>
            {filteredProductos.map((registro, index) => (
              <tr key={index}>
                <td className='ocultar-columna'>{registro.id}</td>
                <td className='ocultar-columna'>{registro.id_producto}</td>
                <td>{registro.nombre_producto}</td>
                <td>{registro.fecha_transaccion}</td>
                <td>{registro.responsable_transaccion}</td>
                <td>{registro.cantidad}</td>
                <td>{registro.transaccion}</td>
                <td>{registro.nombre_locacion}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default LogInventario;
