import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {Container} from 'react-bootstrap';
import './InventarioEditar.css';
import {ruta_back, ruta_front} from '../utils/globals.js';
import '../utils/globals.css';

const EditarProducto = () => {
  const { id } = useParams();

  const [nombreProducto, setNombreProducto] = useState('');
  const [precioCosto, setPrecioCosto] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [locacionSeleccionada, setLocacionSeleccionada] = useState('');
  const [categorias, setCategorias] = useState([]);
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

  const getCategorias = async () => {
    try {
      const res = await axios.get(ruta_back + 'tipojoya');
      const categoriasUnicas = res.data;
      setCategorias(categoriasUnicas);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      joyaSeleccionada === '' ||
      precioCosto === '' ||
      precioVenta === '' ||
      cantidad === '' ||
      categoriaSeleccionada === '' ||
      locacionSeleccionada === ''
    ) {
      alert('Por favor, completa todos los campos');
      return;
    }

    try {
      await axios.put(ruta_back + 'inventario/' + id, {
        id_locacion: locacionSeleccionada,
        id_joya: joyaSeleccionada,
        cantidad: cantidad,
        precio_venta: precioVenta,
        deleted: false
      });

      setNombreProducto('');
      setPrecioCosto('');
      setPrecioVenta('');
      setCantidad('');
      setCategoriaSeleccionada('');
      setLocacionSeleccionada('');

      alert('Producto actualizado exitosamente');
      window.location.href = ruta_front + 'inventario';
    } catch (error) {
      console.log(error);
      alert('Ocurrió un error al actualizar el producto');
    }
  };

  useEffect(() => {
    const getProducto = async () => {
      try {
        const res = await axios.get(ruta_back + 'inventario/' + id);
        const producto = res.data;

        setPrecioCosto(producto.precio_costo);
        setPrecioVenta(producto.precio_venta);
        setCantidad(producto.cantidad);
        setCategoriaSeleccionada(producto.id_tipo_joya);
        setLocacionSeleccionada(producto.id_locacion);
        setJoyaSeleccionada(producto.id_joya);
      } catch (error) {
        console.log(error);
      }
    };

    getProducto();
    getCategorias();
    getLocaciones();
    getJoyas();
  }, [id]);

  return (
    <Container style={{ textAlign: 'center' }} className="container-add-edit">
      <div>
        <h2 className="titulo">Editar Producto</h2>

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
            <label htmlFor="precioCosto">Precio costo:</label>
            <input
              type="number"
              min="0"
              step="1"
              id="precioCosto"
              value={precioCosto}
              onChange={(e) => setPrecioCosto(e.target.value)}
            />
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
              id="cantidad"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="categoria">Categoría:</label>
            <select
              id="categoria"
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((categoria) => (
                <option value={categoria.id} key={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
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
          

          <button type="submit">Actualizar Producto</button>
        </form>

        <div className="separador"> </div>
      </div>
    </Container>
  );
};

export default EditarProducto;
