import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Inventario.css';

const Inventario = () => {
  const [productos, setProductos] = useState([]);
  const [productoReal, setProductoReal] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  const getProductoReal = async (id) => {
    try {
      const res = await axios.get('http://localhost:8080/inventario/' + id);
      setProductoReal(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductos = async () => {
    try {
      const res = await axios.get('http://localhost:8080/inventario');
      setProductos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategorias = async () => {
    try {
      const res = await axios.get('http://localhost:8080/tipojoya');
      const categoriasUnicas = [...new Set(res.data.map(categoria => categoria.nombre))];
      setCategorias(categoriasUnicas);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (productoReal) => {
    try {
      let url = 'http://localhost:8080/inventario/' + productoReal.id;
      const res = await axios.put(url, productoReal);
      if (res.status === 200) {
        getProductos();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoriaChange = (event) => {
    const categoria = event.target.value;
    setCategoriaSeleccionada(categoria);
  };

  const handleChangeplus = async (producto) => {
    await getProductoReal(producto.id);
    setProductoReal((prevState) => {
      const updatedProductoReal = { ...prevState, cantidad: prevState.cantidad + 1 };
      handleUpdate(updatedProductoReal);
      return updatedProductoReal;
    });
  };

  const handleChangeless = async (producto) => {
    await getProductoReal(producto.id);
    setProductoReal((prevState) => {
      const updatedProductoReal = { ...prevState, cantidad: prevState.cantidad - 1 };
      handleUpdate(updatedProductoReal);
      return updatedProductoReal;
    });
  };

  useEffect(() => {
    getProductos();
    getCategorias();
  }, []);

  const filteredProductos = categoriaSeleccionada ? productos.filter(producto => producto.tipo_joya === categoriaSeleccionada) : productos;

  return (
    <Container style={{ marginTop: '50px', textAlign: 'center' }} className="container">
      <h1 style={{ fontSize: '48px' }}>Inventario</h1>
      <Row style={{ marginTop: '20px' }}>
        <Col>
          <Button variant="primary" style={{ marginRight: '10px' }}>Agregar</Button>
          <Button variant="danger">Eliminar</Button>
        </Col>
      </Row>

      <Row style={{ marginTop: '20px' }}>
        <Col md={6} style={{ display: 'flex', alignItems: 'center' }}>
          <select className='dropdown'
            value={categoriaSeleccionada}
            onChange={handleCategoriaChange}
            style={{
              width: '250px',
              height: '40px',
              color: '#1A1D1F',
              backgroundColor: '#FFFFFF',
              border: '1px solid #EFEFEF',
              borderRadius: '5px',
              fontSize: '14px',
            }}
          >
            <option value="">Todas las categorías</option>
            {categorias.map((categoria, index) => (
              <option value={categoria} key={index}>{categoria}</option>
            ))}
          </select>
        </Col>
        <Col md={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <span style={{ marginRight: '10px', fontWeight: 'bold' }}>Productos:</span>
          <span>{filteredProductos.length}</span>
        </Col>
      </Row>
      
          <div style={{ overflow: 'auto', maxHeight: '60vh', marginTop: '20px' }}>
            <Table bordered hover className='table_productos'>
            <thead >
                <tr className='cabeceras'>
                    <th>#</th>
                    <th>Local</th>
                    <th>Cantidad</th>
                    <th>Joya</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {filteredProductos.map((producto, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{producto.local}</td>
                        <td>{producto.cantidad}</td>
                        <td>{producto.joya}</td>
                        <td>{producto.precio}</td>
                        <td>
                            <Button variant='primary' style={{ marginRight: '5px' }} onClick={() => handleChangeplus(producto)}> + </Button>
                            <Button variant='danger' style={{ marginLeft: '5px' }} onClick={() => handleChangeless(producto)}> - </Button>
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