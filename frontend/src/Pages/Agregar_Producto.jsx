import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import './AgregarProducto.css'; 

const AgregarProducto = () => {
  const [nombreProducto, setNombreProducto] = useState('');
  const [precioCosto, setPrecioCosto] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [locacionSeleccionada, setLocacionSeleccionada] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [locaciones, setLocaciones] = useState([]);

  const getLocaciones = async () => {
    try {
      const res = await axios.get('http://localhost:8080/locacion');
      const locacionesUnicas = res.data;
      setLocaciones(locacionesUnicas);
    } catch (error) {
      console.log(error);
    }
  };



  const getCategorias = async () => {
    try {
      const res = await axios.get('http://localhost:8080/tipojoya');
      const categoriasUnicas = res.data;
      setCategorias(categoriasUnicas);
    } catch (error) {
      console.log(error);
    }
  };



  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      nombreProducto.trim() === '' ||
      precioCosto.trim() === '' ||
      precioVenta.trim() === '' ||
      cantidad.trim() === '' ||
      categoriaSeleccionada.trim() === '' ||
      locacionSeleccionada.trim() === ''
    ) {
      alert('Por favor, completa todos los campos');
      return;
    }

    try {
      const currentDate = new Date();
      const response1 = await axios.post('http://localhost:8080/joya', {
        id_tipo_joya: categoriaSeleccionada,
        nombre: nombreProducto,
        created_at: currentDate.toISOString(),
        updated_at: currentDate.toISOString(),
        deleted: false
      });
      const joyaId = response1.data.id;

      const currentDate2 = new Date();
      await axios.post('http://localhost:8080/inventario', {
        id_locacion: locacionSeleccionada,
        id_joya: joyaId,
        id_tipo_joya: categoriaSeleccionada,
        cantidad: cantidad,
        precio_venta: precioVenta,
        precio_costo: precioCosto,
        created_at: currentDate2.toISOString(),
        updated_at: currentDate2.toISOString(),
        deleted: false
      });

     
      setNombreProducto('');
      setPrecioCosto('');
      setPrecioVenta('');
      setCantidad('');
      setCategoriaSeleccionada('');
      setLocacionSeleccionada('');

      alert('Producto agregado exitosamente');
      window.location.href = 'http://localhost:3000/inventario';
    } catch (error) {
      console.log(error);
      alert('Ocurrió un error al agregar el producto');
    }
  };

  useEffect(() => {
    getCategorias();
    getLocaciones();
  }, []);

  return (
    <Container style={{ textAlign: 'center' }} className="container-product">
      <div>
        <h2 className="titulo">Agregar Producto</h2>
  
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombreProducto">Nombre del Producto:</label>
            <input
              type="text"
              id="nombreProducto"
              value={nombreProducto}
              onChange={(e) => setNombreProducto(e.target.value)}
            />
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
          <button type="submit">Agregar Producto</button>
        </form>
        
        <div className="separador"> </div>
      </div>
    </Container>
  );
};

export default AgregarProducto;
