import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import './Inventario.css';

const TipoJoya = () => {
  const [tipos, setTipos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  const getTipos = async () => {
    try {
      const res = await axios.get('http://localhost:8080/tipojoya');
      setTipos(res.data);
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

  const handleCategoriaChange = (event) => {
    const categoria = event.target.value;
    setCategoriaSeleccionada(categoria);
  };

  useEffect(() => {
    getTipos();
    getCategorias();
  }, []);

  const filteredTipos = categoriaSeleccionada ? tipos.filter(tipo => tipo.material === categoriaSeleccionada || tipo.nombre.includes(categoriaSeleccionada)) : tipos;

  return (
    <Container style={{ marginTop: '50px', textAlign: 'center' }} className="container-tipojoya">
      <h1 style={{ fontSize: '48px' }}>Tipos de Joya</h1>

      <Row style={{ marginTop: '20px' }}>
        <Col style={{ display: 'flex', alignItems: 'left' }}>
          <Col md={6} style={{ display: 'flex', alignItems: 'left' }}>
            <select className='dropdown'
              value={categoriaSeleccionada}
              onChange={handleCategoriaChange}
            >
              <option value="">Todos los tipos</option>
              {categorias.map((categoria, index) => (
                <option value={categoria} key={index}>{categoria}</option>
              ))}
            </select>
          </Col>
          <Col md={6} style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px', fontWeight: 'bold' }}>Tipos:</span>
            <span>{filteredTipos.length}</span>
          </Col>
        </Col>
        <Col md={6} style={{ display: 'flex', alignItems: 'left', justifyContent: 'flex-end' }}>
          <Link to="/tipos-de-joya/agregar-tipo">
            <Button variant="primary"  style={{ marginRight: '10px' , backgroundColor: '#D5418F', borderRadius: '10', borderColor: 'transparent'}}>Agregar Tipo Joya</Button>
          </Link>    
        </Col>
      </Row>

      <div style={{ overflow: 'auto', maxHeight: '60vh', marginTop: '20px' }}>
        <Table bordered hover className='table_tipos'>
        <thead >
            <tr className='cabeceras'>
                <th>#</th>
                <th>Nombre</th>
                <th>Material</th>
            </tr>
        </thead>
        <tbody>
            {filteredTipos.map((tipo, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{tipo.nombre}</td>
                    <td>{tipo.material}</td>
                </tr>
            ))}

        </tbody>
        </Table>    
    </div>
    </Container>
  );
};

export default TipoJoya;
