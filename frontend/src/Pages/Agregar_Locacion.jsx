import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import './AgregarLocacion.css'; 

const AgregarLocacion = () => {
  const [nombreLocacion, setNombreLocacion] = useState('');
  const [region, setRegion] = useState('');
  const [comuna, setComuna] = useState('');
  const [direccion, setDireccion] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      nombreLocacion.trim() === '' ||
      region.trim() === '' ||
      comuna.trim() === '' ||
      direccion.trim() === ''
    ) {
      alert('Por favor, completa todos los campos');
      return;
    }

    try {
      const response1 = await axios.post('http://localhost:8080/locacion', {
        nombre: nombreLocacion,
        deleted: false
      });

    setNombreLocacion('');
    setRegion('');
    setComuna('');
    setDireccion('');

    alert('Locación agregada exitosamente');
    window.location.href = 'http://localhost:3000/locaciones';
  } catch (error) {
    console.log(error);
    alert('Ocurrió un error al agregar la locación');
  }
  };
      

  return (
    <Container style={{ textAlign: 'center' }} className="container-product">
      <div>
        <h2 className="titulo">Agregar Locación</h2>
  
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombreProducto">Nombre de la Locación:</label>
            <input
              type="text"
              id="nombreLocacion"
              value={nombreLocacion}
              onChange={(e) => setNombreLocacion(e.target.value)}
            />
          </div>

          <div  >
            <label htmlFor="region">Región:</label>
            <input
              type="text"
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>

          <div  >
            <label htmlFor="comuna">Comuna:</label>
            <input
              type="text"
              id="comuna"
              value={comuna}
              onChange={(e) => setComuna(e.target.value)}
            />
          </div>

          <div  >
            <label htmlFor="direccion">Dirección:</label>
            <input
              type="text"
              id="direccion"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>
  
          <button type="submit">Agregar Producto</button>
        </form>
        
        <div className="separador"> </div>
      </div>
    </Container>
  );
};

export default AgregarLocacion;
