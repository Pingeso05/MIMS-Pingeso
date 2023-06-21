import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import './Modificar_Inventario.css';
import '../utils/globals';
import {ruta_back} from '../utils/globals';

const Popup = ({ product, onCancel, onSubmit }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [action, setAction] = useState('');
  const [location, setLocation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [locaciones, setLocaciones] = useState([]);
  const [productoReal, setProductoReal] = useState();



  const getLocaciones = async () => {
    try {
      const res = await axios.get(ruta_back + 'locacion');
      const locacionesUnicas = res.data;
      setLocaciones(locacionesUnicas);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductoReal = async () => {
    try {
      const res = await axios.get(ruta_back + 'inventario/' + product.id);
      const productoR = res.data;
      setProductoReal(productoR);
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(action.trim() === "Mover Stock" || action.trim() === "Venta"){
      if(product.cantidad - quantity < 0 ){
        alert('Por favor, ingresa una cantidad menor a ' + (product.cantidad+1));
        return;
      }
    }

    if (
      action.trim() === "Mover Stock"
      
    )
     {
      if (
        location.trim() === '' ||
        quantity.trim() === '' ||
        description.trim() === ''
      )
      {
        alert('Por favor, completa todos los campos');
        return;
      }
      try{

      
        try {
          await axios.put(ruta_back + 'inventario/' + product.id, {
            id_locacion: productoReal.id_locacion,
            id_joya: productoReal.id_joya,
            cantidad: productoReal.cantidad - quantity,
            precio_venta: productoReal.precio_venta,
            deleted: false
          }); 
    
        } catch (error) {
          console.log(error);
          alert('Ocurrió un error al modificar el inventario');
          return;
        }
        try {
          try {
            const res = await axios.get(ruta_back + 'inventario');
            const productos = res.data;
            const filteredProducto = productos
              .filter(producto => (location ? producto.local === location : true))
              .filter(producto => (product.joya ? producto.joya === product.joya : true));
            if (filteredProducto.length > 0) {
              try {
                const res = await axios.get(ruta_back + 'inventario/' + filteredProducto[0].id);
                const producto_cambiar = res.data;
                try{
                  await axios.put(ruta_back + 'inventario/' + producto_cambiar.id, {
                    id_locacion: producto_cambiar.id_locacion,
                    id_joya: producto_cambiar.id_joya,
                    cantidad: Number(producto_cambiar.cantidad) + Number(quantity),
                    precio_venta: producto_cambiar.precio_venta,
                    deleted: false
                  }); 
                } catch (error) {
                  console.log(error);
                  alert('Ocurrió un error al modificar el inventario');
                  return;
                }
              } catch (error) {
                console.log(error);
                alert('Ocurrió un error al modificar el inventario');
                return;
              }
            } else {
              try {
                const res = await axios.get(ruta_back + 'locacion');
                const localReal = res.data
                  .filter(local => (location ? local.nombre === location : true))[0]
                await axios.post(ruta_back + 'inventario', {
                  id_locacion: localReal.id,
                  id_joya: productoReal.id_joya,
                  cantidad: quantity,
                  precio_venta: productoReal.precio_venta,
                  deleted: false
                }); 
          
              } catch (error) {
                console.log(error);
                alert('Ocurrió un error al modificar el inventario');
                return;
            }
          }
          } catch (error) {
            console.log(error);
            return;
          }
          
          
        } catch (error) {
          console.log(error);
          alert('Ocurrió un error al modificar el producto');
        }
        alert('Se movieron correctamente ' + quantity + ' unidades de ' + product.joya +  ' desde ' + product.local + ' hacia ' + location);
        setIsOpen(false);
        onSubmit();
        setAction('');
        setQuantity('');
        setLocation('');
        setDescription('');
        return;
      } catch (error){
        console.log(error);
        alert('Ocurrió un error al modificar el inventario');
        return;
      }
      
    
    } else{
        if(
        action.trim() === '' ||
        quantity.trim() === '' ||
        description.trim() === ''
      )
        {
          alert('Por favor, completa todos los campos');
          return;
    }
        if(action.trim() === 'Compra'){
          try {
            await axios.put(ruta_back + 'inventario/' + product.id, {
              id_locacion: productoReal.id_locacion,
              id_joya: productoReal.id_joya,
              cantidad: productoReal.cantidad + quantity,
              precio_venta: productoReal.precio_venta,
              deleted: false
            }); 
          alert('Se añadió correctamente ' + quantity + ' unidades de ' + product.joya +  ' al local ' + product.local);
          } catch (error) {
            console.log(error);
            alert('Ocurrió un error al agregar stock al inventario');
            return;
          }
        }
        else if(action.trim() === 'Venta'){
          try {
            await axios.put(ruta_back + 'inventario/' + product.id, {
              id_locacion: productoReal.id_locacion,
              id_joya: productoReal.id_joya,
              cantidad: productoReal.cantidad - quantity,
              precio_venta: productoReal.precio_venta,
              deleted: false
            }); 
          alert('Se quitaron correctamente ' + quantity + ' unidades de ' + product.joya +  ' a ' + product.local);
          } catch (error) {
            console.log(error);
            alert('Ocurrió un error al agregar stock al inventario');
            return;
          }
        }
        setIsOpen(false);
        onSubmit();
        setAction('');
        setQuantity('');
        setLocation('');
        setDescription('');
        return;
  }


  };

  const handleActionChange = (event) => {
    setAction(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCancel = () => {
    setIsOpen(false);
    onCancel();
  };

  useEffect(() => {
    getLocaciones();
    getProductoReal();
  }, []);

  const otrasLocaciones = locaciones.filter((locaciones) => locaciones.nombre !== product.local);

  if (!isOpen) {
    return null;
  }

  return (
    
      <div className="popup-container">
        <Container style={{ textAlign: 'center' }} className="container-popup">
            <div className="popup-header">
              <button className='button-exit' onClick={handleCancel}>Salir</button>
            </div>
            <div className="popup-body">
              <h2>{product.joya}</h2>
              <h2>{product.local} - Cantidad: {product.cantidad}</h2>           
              <form onSubmit={handleSubmit}>
                <label>¿Qué desea realizar?</label>
                <select value={action} onChange={handleActionChange}>
                  <option value="">Seleccionar opción</option>
                  <option value="Compra">Compra</option>
                  <option value="Venta">Venta</option>
                  <option value="Mover Stock">Mover Stock</option>
                </select>
                {action === 'Mover Stock' && (
                  <>
                    <label>¿A qué ubicación desea mover?</label>
                    <select value={location}
                      onChange={handleLocationChange}
                    >
                      <option value="">Seleccione Locación</option>
                      {otrasLocaciones.map((locacion, index) => (
                        <option value={locacion.nombre} key={index}>{locacion.nombre}</option>
                      ))}
                    </select>
                  </>
                )}
                <label>Cantidad:</label>
                <input type="number" min="1" value={quantity} onChange={handleQuantityChange} />
                <label>Ingrese una descripción:</label>
                <input type="text" value={description} onChange={handleDescriptionChange} />
                <button type='submit'>Enviar</button>
              </form>
            </div>
        </Container>
      </div>
    
  );
};

export default Popup;