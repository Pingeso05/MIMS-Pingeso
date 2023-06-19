import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Inventario.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import {ruta_back} from '../utils/globals.js';
import '../utils/globals.css';

const Inventario = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [locaciones, setLocaciones] = useState([]);
  const [locacionSeleccionada, setLocacionSeleccionada] = useState('');

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

  const getEditView = (id) => {
    navigate('/inventario/editar-producto/' + id);
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
  }, []);

  const filteredProductos = productos
  .filter(producto => (categoriaSeleccionada ? producto.tipo_joya === categoriaSeleccionada : true))
  .filter(producto => (locacionSeleccionada ? producto.local === locacionSeleccionada : true));

  return (
    <Container style={{ marginTop: '50px', textAlign: 'center' }} className="container-table">
      <h1 className='titulo' >Lista de productos</h1>
      
        
          

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
      
          <div style={{ overflowx: 'auto', maxHeight: '60vh', marginTop: '20px' }}>
          <Table bordered hover className='table'>
            <thead>
              <tr className='cabeceras'>
                <th>#</th>
                <th>Joya</th>
                <th>Cantidad</th>
                <th>Tipo Joya</th>
                <th>Local</th>
                <th className='ocultar-columna'>Precio Costo</th>
                <th className='ocultar-columna'>Precio Venta</th>
                <th>Opciones</th>
                
              </tr>
            </thead>
            <tbody>
              {filteredProductos.map((producto, index) => (
                <tr key={index}>
                  <td>
                    {index + 1}
                  </td>
                  <td>
                  {producto.joya}
                  </td>
                  <td>{Number(producto.cantidad).toLocaleString()}</td>
                  <td>{producto.tipo_joya}</td>
                  <td>{producto.local}</td>
                  <td className='ocultar-columna'>${Number(producto.precio_costo).toLocaleString()}</td>
                  <td className='ocultar-columna'>${Number(producto.precio_venta).toLocaleString()}</td>
                  <td>
                  <Button style={{width:'5px'}} variant='success' onClick={() => getEditView(producto.id)}>Op</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>  
        </div>
        </Container>
    );
  };
  
  export default Inventario;