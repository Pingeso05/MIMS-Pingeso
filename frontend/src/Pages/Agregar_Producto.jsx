import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import './AgregarProducto.css'; 
import {ruta_back, ruta_front} from '../utils/globals.js';
import '../utils/globals.css';

const AgregarProducto = () => {
  const [precioVenta, setPrecioVenta] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [locacionSeleccionada, setLocacionSeleccionada] = useState('');
  const [locaciones, setLocaciones] = useState([]);
  const [joyas, setJoyas] = useState([]);
  const [joyaSeleccionada, setJoyaSeleccionada] = useState('');


  const getLocaciones = async () => {
    try {
      const res = await axios.get(ruta_back + 'locacion');
      const locacionesUnicas = res.data;
      setLocaciones(locacionesUnicas);
    } catch (error) {
      console.log(error);
    }
  };

  const getJoyas = async () => {
    try {
      const res = await axios.get(ruta_back + 'joya');
      const joyasUnicas = res.data;
      setJoyas(joyasUnicas);
    } catch (error) {
      console.log(error);
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      joyaSeleccionada.trim() === '' ||
      precioVenta.trim() === '' ||
      cantidad.trim() === '' ||
      locacionSeleccionada.trim() === ''
    ) {
      alert('Por favor, completa todos los campos');
      return;
    }

    try {
      const res = await axios.get(ruta_back + 'inventario');
      const productos = res.data;
      const res2 = await axios.get(ruta_back + 'joya/' + joyaSeleccionada);
      const joya = res2.data.nombre;
      const res3 = await axios.get(ruta_back + 'locacion/' + locacionSeleccionada);
      const local = res3.data.nombre;
      const buscarProd = productos
      .filter(producto => (local ? producto.local === local : true))
      .filter(producto => (joya ? producto.joya === joya : true));
      if(buscarProd.length === 0){
      await axios.post(ruta_back + 'inventario', {
        id_locacion: locacionSeleccionada,
        id_joya: joyaSeleccionada,
        cantidad: cantidad,
        precio_venta: precioVenta,
        deleted: false
      });

     
      setPrecioVenta('');
      setCantidad('');
      setLocacionSeleccionada('');

      alert('Producto agregado exitosamente');
      window.location.href = ruta_front + 'inventario';
    } else {
      alert('El producto ya existe en esta ubicación, por favor revise los datos');
      return;
    }
    } catch (error) {
      console.log(error);
      alert('Ocurrió un error al agregar el producto');
    }
  };

  useEffect(() => {
    getLocaciones();
    getJoyas();
  }, []);

  return (
    <Container style={{ textAlign: 'center' }} className="container-add-edit">
      <div>
        <h2 className="titulo">Agregar Producto</h2>
  
        <form onSubmit={handleSubmit}>

          <div>
            <label htmlFor="joya">Joya:</label>
            <select
              id="joya"
              value={joyaSeleccionada}
              onChange={(e) => setJoyaSeleccionada(e.target.value)}
            >
              <option value="">Seleccione una Joya</option>
              {joyas.map((joya) => (
                <option value={joya.id} key={joya.id}>
                  {joya.nombre}
                </option>
              ))}
            </select>
          </div>

          <div  >
            <label htmlFor="precioVenta">Precio venta:</label>
            <input
              type="number"
              min="0"
              step="1"
              id="precioVenta"
              value={precioVenta}
              onChange={(e) => setPrecioVenta(e.target.value)}
            />
          </div>
  
          <div >
            <label htmlFor="cantidad">Cantidad:</label>
            <input
              type="number"
              min="0"
              step="1"
              id="cantidad"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
          </div>
  
          <div>
            <label htmlFor="locacion">Locación:</label>
            <select
              id="locacion"
              value={locacionSeleccionada}
              onChange={(e) => setLocacionSeleccionada(e.target.value)}
            >
              <option value="">Seleccione una Locación</option>
                {locaciones.map((locacion) => (
                  <option value={locacion.id} key={locacion.id}>
                    {locacion.nombre}
                  </option>
                ))}
            </select>
          </div>
          <button type="submit">Agregar Producto</button>
        </form>
        
        <div className="separador"> </div>
      </div>
    </Container>
  );
};

export default AgregarProducto;
