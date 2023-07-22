import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import './Joya.css';
import { useNavigate } from 'react-router-dom';
import { ruta_back } from '../utils/globals.js';
import '../utils/globals.css';
import { FaEdit } from 'react-icons/fa';
import Carga_Cantidad from '../Popups/Carga_Cantidad';

const CargaDatos = () => {
  const navigate = useNavigate();
  const [joyas, setJoyas] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState('');
  const [showEditarJoya, setShowEditarJoya] = useState(false);
  const [joyaSeleccionada, setJoyaSeleccionada] = useState(null);
  const [editarJoya, setEditarJoya] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJoyas, setSelectedJoyas] = useState([]);
  const [showCargaCantidad, setShowCargaCantidad] = useState(false);
  const [locacionSeleccionada, setLocacionSeleccionada] = useState('');
  const [locaciones, setLocaciones] = useState([]);
  const token = localStorage.getItem('accessToken');
  const user = localStorage.getItem('user');
  const userData = JSON.parse(user); // Convertir el string a un objeto


  const getJoyas = async () => {
    try {
      const res = await axios.get(ruta_back + 'joya',{
        headers: {
          Authorization: token, 
        }
      });
      setJoyas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSelectedJoya = (joya) => {
    if (selectedJoyas.includes(joya)) {
      setSelectedJoyas((prevJoyas) => prevJoyas.filter((item) => item !== joya));
    } else {
      setSelectedJoyas((prevJoyas) => [...prevJoyas, joya]);
    }
  };

  const handleEditClick = (joya) => {
    toggleSelectedJoya(joya);
  };

  const handlePopupSubmit = async () => {
    try {
      await getJoyas();
    } catch (error) {
      console.log(error);
    }
    setShowEditarJoya(false);
  };

  const getTipos = async () => {
    try {
      const res = await axios.get(ruta_back + 'tipojoya',{
        headers: {
          Authorization: token, 
        }
      });
      const tiposUnicos = [...new Set(res.data.map((tipo) => tipo.nombre))];
      setTipos(tiposUnicos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJoyas();
    getTipos();
  }, []);

  const displayedJoyas = joyas.filter((joya) =>
    joya.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectedJoyas = (joyas) => {
    console.log(selectedJoyas);
    setShowCargaCantidad(true);
  };

  return (
    <Container style={{ marginTop: '50px', textAlign: 'center' }} className="container-table">
      <h1 className="titulo">Carga de Inventario</h1>

      <Row style={{ marginTop: '20px' }}>
        <Col className="left-col" md={6}>
          <span style={{ marginRight: '10px', fontWeight: 'bold' }}>Joyas:</span>
          <span>{displayedJoyas.length}</span>
        </Col>
        <Col className="right-col" md={6}>
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
      </Row>

      <div style={{ overflow: 'auto', maxHeight: '55vh', marginTop: '20px' }}>
        <Table bordered hover className="table">
          <thead>
            <tr className="cabeceras">
              <th>Nombre</th>
              <th>Tipo de Joya</th>
              <th>Precio Costo</th>
              <th>Seleccionar</th>
            </tr>
          </thead>
          <tbody>
            {displayedJoyas.map((joya, index) => (
              <tr key={index}>
                <td>{joya.nombre}</td>
                <td>{joya.tipo_joya}</td>
                <td>${joya.cost}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedJoyas.includes(joya)}
                    onChange={() => handleEditClick(joya)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

      </div>

      <Button onClick={handleSelectedJoyas}>Continuar</Button>
     
      {showCargaCantidad && (
        <Carga_Cantidad
          joyas={selectedJoyas}
          onCancel={() => setShowCargaCantidad(false)}
          onSubmit={() => setShowCargaCantidad(false)}
        />
         )}
    </Container>
  );
};

export default CargaDatos;