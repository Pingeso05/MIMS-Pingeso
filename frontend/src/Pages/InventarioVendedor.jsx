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
import Ver_Inventario from '../Popups/Ver_Inventario';
import Button from 'react-bootstrap/Button';
import Venta_Inventario from '../Popups/Venta_Inventario';

const InventarioVendedor = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [locaciones, setLocaciones] = useState([]);
  const [locacionSeleccionada, setLocacionSeleccionada] = useState('');
  const [showVentaInventario, setShowVentaInventario] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [showInventario, setShowInventario] = useState(false);
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


  const handleLocacionChange = (event) => {
    const locacion = event.target.value;
    setLocacionSeleccionada(locacion);
  };



  const handleViewClick = (producto) => {
    setProductoSeleccionado(producto);
    setShowInventario(true);
  };


  const handleChangeClick = (producto) => {
    setProductoSeleccionado(producto);
    setShowVentaInventario(true);
  };

  const handlePopupSubmit = async () => {
    try {
      await getProductos();
    } catch (error) {
      console.log(error);
    }
    setShowVentaInventario(false);
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
      const res = await axios.get(ruta_back + 'tipojoya',{
        headers: {
          Authorization: token, 
        }
      });
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
      <h1 className='titulo' >LISTA DE PRODUCTOS</h1>
      
      <Row className="fila-dp" style={{ marginTop: '10px' }}>
        <Col className="columna-dp" style={{ padding:'5px',display: 'flex', alignItems: 'left' }}>
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
              value={locacionSeleccionada}
              onChange={handleLocacionChange}
            >
              <option value="">LOCAL</option>
              {locaciones.map((locacion, index) => (
                <option value={locacion} key={index}>{locacion}</option>
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
                <th>CANTIDAD</th>
                <th>TIPO JOYA</th>
                <th>LOCACION</th>
                <th className='ocultar-columna'>PRECIO COSTO</th>
                <th className='ocultar-columna'>PRECIO VENTA</th>
                <th>OPCIONES</th>
                
              </tr>
            </thead>
            <tbody>
              {filteredProductos.map((producto, index) => (
                <tr key={index}>
                  <td>
                  {producto.joya}
                  </td>
                  <td>{Number(producto.cantidad).toLocaleString()}</td>
                  <td>{producto.tipo_joya}</td>
                  <td>{producto.local}</td>
                  <td className='ocultar-columna'>${Number(producto.cost).toLocaleString()}</td>
                  <td className='ocultar-columna'>${Number(producto.precio_venta).toLocaleString()}</td>
                  <td>
                  <div>
                    <Row>
                      <Col style={{padding:'1px'}}><Button variant="success" onClick={() => handleViewClick(producto)} style={{backgroundColor: 'success', borderRadius: '10', borderColor: 'transparent',fontSize:'10px'}}>DETALLE</Button></Col>
                      <Col style={{padding:'1px'}}><Button variant="primary" onClick={() => handleChangeClick(producto)} style={{backgroundColor: '#D5418F', borderRadius: '10', borderColor: 'transparent',fontSize:'10px'}}>VENTA</Button></Col>
                    </Row>
                 
                    
                  </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>  
        </div>



        {showVentaInventario && (
        <Venta_Inventario
          product={productoSeleccionado}
          onCancel={() => setShowVentaInventario(false)}
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
  
  export default InventarioVendedor;