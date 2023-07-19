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
import Button from 'react-bootstrap/Button';

const Transito = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [locaciones, setLocaciones] = useState([]);
  const [locacion1Seleccionada, setLocacion1Seleccionada] = useState('');
  const [locacion2Seleccionada, setLocacion2Seleccionada] = useState('');
  const [showModificarInventario, setModificarInventario] = useState(false);
  const [showEditarInventario, setEditarInventario] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [showInventario, setShowInventario] = useState(false);

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


  const handleLocacion1Change = (event) => {
    const locacion1 = event.target.value;
    setLocacion1Seleccionada(locacion1);
  };
  const handleLocacion2Change = (event) => {
    const locacion2 = event.target.value;
    setLocacion1Seleccionada(locacion2);
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


  const getProductos = async () => {
    try {
      const res = await axios.get(ruta_back + 'transito');
      setProductos(res.data);
      console.log(res.data);
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
  }, []);

  const filteredProductos = productos
  .filter(producto => (categoriaSeleccionada ? producto.tipo_producto === categoriaSeleccionada : true))
  .filter(producto => (locacion1Seleccionada ? producto.origen === locacion1Seleccionada : true))
  .filter(producto => (locacion2Seleccionada ? producto.destino === locacion2Seleccionada : true));

  return (
    <Container style={{ marginTop: '50px', textAlign: 'center' }} className="container-table">
      <h1 className='titulo' >PRODUCTOS EN TRANSITO</h1>
      
        
          

      <Row className="fila-dp" style={{ marginTop: '10px' }}>
        <Col className="columna-dp" style={{ display: 'flex', alignItems: 'left' }}>
          <Col md={6} style={{ display: 'flex', alignItems: 'left' }}>
            <select className='dropdown-tb'
              value={categoriaSeleccionada}
              onChange={handleCategoriaChange}
            >
              <option value="">CATEGORÍA</option>
              {categorias.map((categoria, index) => (
                <option value={categoria} key={index}>{categoria}</option>
              ))}
            </select>
          </Col>
          <Col md={6} style={{ display: 'flex', alignItems: 'left' }}>
            <select className='dropdown-tb'
              value={locacion1Seleccionada}
              onChange={handleLocacion1Change}
            >
              <option value="">ORIGEN</option>
              {locaciones.map((locacion1, index) => (
                <option value={locacion1} key={index}>{locacion1}</option>
              ))}
            </select>
            
            
            <select className='dropdown-tb'
              value={locacion2Seleccionada}
              onChange={handleLocacion2Change}
            >
              <option value="">DESTINO</option>
              {locaciones.map((locacion2, index) => (
                <option value={locacion2} key={index}>{locacion2}</option>
              ))}
            </select>
            
          </Col>
          
        </Col>

      </Row>
      <Row style={{padding:'10px'}}>
      <Col md={6} style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px', fontWeight: 'bold' }}>PRODUCTOS:</span>
            <span>{filteredProductos.length}</span>
          </Col>
      </Row>
      
          <div style={{ overflow: 'auto', maxHeight: '60vh', marginTop: '20px' }}>
          <Table bordered hover className='table'>
            <thead>
              <tr className='cabeceras'>
                <th>JOYA</th>
                <th>TIPO JOYA</th>
                <th>CANTIDAD</th>
                <th>ORIGEN</th>
                <th>DESTINO</th>
                <th>NÚMERO TRANSACCION</th>
                <th>FECHA SALIDA</th>
                <th>RESPONSABLE</th>
                <th>OPCIONES</th>
                
              </tr>
            </thead>
            <tbody>
              {filteredProductos.map((producto, index) => (
                <tr key={index}>
                  <td>
                  {producto.joya}
                  </td>
                  <td>{producto.tipo_producto}</td>
                  <td>{Number(producto.cantidad).toLocaleString()}</td>
                  <td>{producto.origen}</td>
                  <td>{producto.destino}</td>
                  <td>{producto.numero_transaccion}</td>
                  <td>{producto.fecha_salida}</td>
                  <td>{producto.responsable}</td>
                  <td>
                  <div className='icono-columna'>
                  
                    <Col style={{padding:'2px'}}><Button variant="primary" style={{ marginRight: '10px' , backgroundColor: '#D5418F', borderRadius: '10', borderColor: 'transparent',fontSize:'14px'}}>RECEPCIONAR</Button></Col>
                    <Col style={{padding:'2px'}}><Button variant="primary" style={{ marginRight: '10px' , backgroundColor: '#D5418F', borderRadius: '10', borderColor: 'transparent',fontSize:'14px'}}>CANCELAR</Button></Col>
                  
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
  
  export default Transito;