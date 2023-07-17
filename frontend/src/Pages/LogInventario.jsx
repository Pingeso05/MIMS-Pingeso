import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Inventario.css';
import React from 'react';
import {ruta_back} from '../utils/globals.js';
import '../utils/globals.css';
import { FaEye, FaEdit } from 'react-icons/fa';
import { MdOutlineInventory } from "react-icons/md";
import Modificar_Inventario from '../Popups/Modificar_Inventario';
import Editar_Inventario from '../Popups/Editar_Inventario';
import Ver_Inventario from '../Popups/Ver_Inventario';

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

  const getLocaciones = async () => {
    try {
      const res = await axios.get(ruta_back + 'locacion');
      const locacionesUnicas = [...new Set(res.data.map(locacion => locacion.nombre))];
      setLocaciones(locacionesUnicas);
    } catch (error) {
      console.log(error);
      console.log('error: No se pudieron obtener la locaciones!');
    }
  };


  const handleLocacionChange = (event) => {
    const locacion = event.target.value;
    setLocacionSeleccionada(locacion);
  };



  const handleViewClick = (producto) => {
    setProductoSeleccionado(producto);
    setShowInventario(true);
  };
  
  const handleEditClick = (producto) => {
    setProductoSeleccionado(producto);
    setEditarInventario(true);
  };
  
  const handleChangeClick = (producto) => {
    setProductoSeleccionado(producto);
    setModificarInventario(true);
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
        const res = await axios.get(ruta_back + 'log_inventario');
        setLogInventario(res.data);
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
};



  const getProductos = async () => {
    try {
      const res = await axios.get(ruta_back + 'inventario');
      setProductos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategorias = async () => {
    try {
      const res = await axios.get(ruta_back + 'tipojoya');
      const categoriasUnicas = [...new Set(res.data.map(categoria => categoria.nombre))];
      setCategorias(categoriasUnicas);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoriaChange = (event) => {
    const categoria = event.target.value;
    setCategoriaSeleccionada(categoria);
  };
  
  useEffect(() => {
    getProductos();
    getCategorias();
    getLocaciones();
    getLogInventario();
  }, []);

  const filteredProductos = productos
  .filter(producto => (categoriaSeleccionada ? producto.tipo_joya === categoriaSeleccionada : true))
  .filter(producto => (locacionSeleccionada ? producto.local === locacionSeleccionada : true));

  return (
    <Container style={{ marginTop: '50px', textAlign: 'center' }} className="container-table">
      <h1 className='titulo' >Registros de transacciones</h1>
      
        
          

      <Row className="fila-dp" style={{ marginTop: '20px' }}>
        <Col className="columna-dp" style={{ display: 'flex', alignItems: 'left' }}>
          <Col md={6} style={{ display: 'flex', alignItems: 'left' }}>
            <select className='dropdown-tb'
              value={categoriaSeleccionada}
              onChange={handleCategoriaChange}
            >
              <option value="">Categoría</option>
              {categorias.map((categoria, index) => (
                <option value={categoria} key={index}>{categoria}</option>
              ))}
            </select>
          </Col>
          <Col md={6} style={{ display: 'flex', alignItems: 'left' }}>
            <select className='dropdown-tb'
              value={locacionSeleccionada}
              onChange={handleLocacionChange}
            >
              <option value="">Local</option>
              {locaciones.map((locacion, index) => (
                <option value={locacion} key={index}>{locacion}</option>
              ))}
            </select>
          </Col>
          <Col md={6} style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px', fontWeight: 'bold' }}>Productos:</span>
            <span>{filteredProductos.length}</span>
          </Col>
        </Col>
        <Col className="agregar-pd d-flex justify-content-md-end" >
           
        </Col>

      </Row>
      
          <div style={{ overflow: 'auto', maxHeight: '60vh', marginTop: '20px' }}>
          <Table bordered hover className='table'>
            <thead>
              <tr className='cabeceras'>
                <th>Id transaccion</th>
                <th>Id producto</th>
                <th>Nombre producto</th>
                <th>Fecha</th>
                <th>Responsable transaccion</th>
                <th>Cantidad</th>
                <th>Tipo de transaccion</th>
                <th>Nombre locacion</th>
                <th>Acciones</th>
                
              </tr>
            </thead>
            <tbody>
              {logInventario.map((registro, index) => (
                <tr key={index}>
                  <td>
                  {registro.id}
                  </td>
                  <td>{registro.id_producto}</td>
                  <td>{registro.nombre_producto}</td>
                  <td>{registro.fecha_transaccion}</td>
                  <td>{registro.responsable_transaccion}</td>
                  <td>{registro.cantidad}</td>
                  <td>{registro.transaccion}</td>
                  <td>{registro.nombre_locacion}</td>
                  <td>
                  <div className='icono-columna'>
                    <FaEye title='Ver detalle' className='icono' />
                    <FaEdit title='Editar Producto' className='icono'  />
                    <MdOutlineInventory title='Modificar inventario' className='icono'  />
                  </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>  
        </div>

        {showModificarInventario && (
        <Modificar_Inventario
          product={productoSeleccionado}
          onCancel={() => setModificarInventario(false)}
          onSubmit={handlePopupSubmit}
        />
         )}

        {showEditarInventario && (
        <Editar_Inventario
          id={productoSeleccionado.id}
          onCancel={() => setEditarInventario(false)}
          onSubmit={handlePopupSubmit}
        />
         )}
        
        {showInventario && (
        <Ver_Inventario
          id={productoSeleccionado.id}
          onCancel={() => setShowInventario(false)}
        />
         )}
        </Container>
    );
  };
  
  export default LogInventario;