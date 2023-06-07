import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import './Joya.css';

const Joya = () => {
  const [joyas, setJoyas] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState('');

  const getJoyas = async () => {
    try {
      const res = await axios.get('http://localhost:8080/joya');
      setJoyas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTipos = async () => {
    try {
      const res = await axios.get('http://localhost:8080/tipojoya');
      const tiposUnicos = [...new Set(res.data.map(tipo => tipo.nombre))];
      setTipos(tiposUnicos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTipoChange = (event) => {
    const tipo = event.target.value;
    setTipoSeleccionado(tipo);
  };

  useEffect(() => {
    getJoyas();
    getTipos();
  }, []);

  const filteredJoyas = tipoSeleccionado ? joyas.filter(joya => joya.tipo_joya === tipoSeleccionado) : joyas;

  return (
    <Container style={{ marginTop: '50px', textAlign: 'center' }} className="container-joya-table">
      <h1 style={{ fontSize: '48px' }}>Joyas</h1>

      <Row style={{ marginTop: '20px' }}>
        <Col style={{ display: 'flex', alignItems: 'left' }}>
          <Col md={6} style={{ display: 'flex', alignItems: 'left' }}>
            <select className='dropdown'
              value={tipoSeleccionado}
              onChange={handleTipoChange}
            >
              <option value="">Todos los tipos</option>
              {tipos.map((tipo, index) => (
                <option value={tipo} key={index}>{tipo}</option>
              ))}
            </select>
          </Col>
          <Col md={6} style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px', fontWeight: 'bold' }}>Joyas:</span>
            <span>{filteredJoyas.length}</span>
          </Col>
        </Col>
        <Col md={6} style={{ display: 'flex', alignItems: 'left', justifyContent: 'flex-end' }}>
          <Link to="/joyas/agregar-joya">
            <Button variant="primary"  style={{ marginRight: '10px' , backgroundColor: '#D5418F', borderRadius: '10', borderColor: 'transparent'}}>Agregar Joya</Button>
          </Link>    
        </Col>
      </Row>

      <div style={{ overflow: 'auto', maxHeight: '60vh', marginTop: '20px' }}>
        <Table bordered hover className='table_joyas'>
          <thead>
            <tr className='cabeceras'>
              <th>#</th>
              <th>Nombre</th>
              <th>Tipo de Joya</th>
            </tr>
          </thead>
          <tbody>
            {filteredJoyas.map((joya, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{joya.nombre}</td>
                <td>{joya.tipo_joya}</td>
              </tr>
            ))}
          </tbody>
        </Table>    
      </div>
    </Container>
  );
};
  
export default Joya;
