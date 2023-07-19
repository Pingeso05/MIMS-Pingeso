import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import './Modificar_Inventario.css';
import '../utils/globals';
import {ruta_back} from '../utils/globals';

const Modificar_Inventario = ({ product, onCancel, onSubmit }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [action, setAction] = useState('');
  const [location, setLocation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [locaciones, setLocaciones] = useState([]);
  const [productoReal, setProductoReal] = useState();
  const [submitting, setSubmitting] = useState(false);
  const token = localStorage.getItem('accessToken');


  const getLocaciones = async () => {
    try {
      const res = await axios.get(ruta_back + 'locacion',{
        headers: {
          Authorization: token, // No incluye el prefijo "Bearer"
        }
      });
      const locacionesUnicas = res.data;
      setLocaciones(locacionesUnicas);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductoReal = async () => {
    try {
      const res = await axios.get(ruta_back + 'inventario/' + product.id,{
        headers: {
          Authorization: token, // No incluye el prefijo "Bearer"
        }
      });
      const productoR = res.data;
      setProductoReal(productoR);
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleSubmit = async (event) => {
    if (submitting) {
      return; 
    }
    setSubmitting(true);

    event.preventDefault();
    await getProductoReal();
    if(action.trim() === "Mover Stock" || action.trim() === "Venta"){
      if(productoReal.cantidad - quantity < 0 ){
        alert('Por favor, ingresa una cantidad menor a ' + (productoReal.cantidad+1));
        setSubmitting(false);
        return;
      }
    }

    if (action.trim() === "Mover Stock"){
      if (location.trim() === '' || quantity.trim() === '' || description.trim() === ''){
        alert('Por favor, completa todos los campos');
        setSubmitting(false);
        return;
      }
      try {
        try {
          //Se rebaja el stock del producto en el local seleccionado
          await axios.put(ruta_back + 'inventario/' + product.id, {
            id_locacion: productoReal.id_locacion,
            id_joya: productoReal.id_joya,
            cantidad: productoReal.cantidad - quantity,
            precio_venta: productoReal.precio_venta,
            deleted: false
          });
          // Obtener la fecha de hoy
          const fechaHoy = new Date();

          // Obtener los componentes de la fecha (día, mes y año)
          const dia = String(fechaHoy.getDate()).padStart(2, '0');
          const mes = String(fechaHoy.getMonth() + 1).padStart(2, '0'); // Sumamos 1 al mes ya que los meses en JavaScript empiezan desde 0 (enero es 0)
          const anio = fechaHoy.getFullYear();

          // Formatear la fecha en el formato deseado (dd/mm/aaaa)
          const fechaHoyFormateada = dia+'/'+mes+'/'+anio;
          await axios.post(ruta_back + 'log_inventario', {
            id_producto: product.id,
            nombre_producto: product.joya,
            tipo_producto: productoReal.id_joya,
            nombre_locacion: productoReal.id_locacion,
            cantidad: quantity,
            tipo_transaccion: 'SALIDA',
            fecha_transaccion: fechaHoyFormateada,
            valor_transaccion: 99999,
            responsable_transaccion: 'ALEN GALINDO',
          });
           
          },{
            headers: {
              Authorization: token, // No incluye el prefijo "Bearer"
            }
          }); 
    
        } catch (error) {
          console.log(error);
          alert('Ocurrió un error al rebajar el inventario');
          setSubmitting(false);
          return;
        }
        try {
          try {
            const res = await axios.get(ruta_back + 'inventario',{
              headers: {
                Authorization: token, // No incluye el prefijo "Bearer"
              }
            });
            const productos = res.data;
            const filteredProducto = productos
              .filter(producto => (location ? producto.local === location : true))
              .filter(producto => (product.joya ? producto.joya === product.joya : true));
            if (filteredProducto.length > 0) {
              try {
                const res = await axios.get(ruta_back + 'inventario/' + filteredProducto[0].id,{
                  headers: {
                    Authorization: token, // No incluye el prefijo "Bearer"
                  }
                });
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
                  setSubmitting(false);
                  return;
                }
              } catch (error) {
                console.log(error);
                alert('Ocurrió un error al modificar el inventario');
                setSubmitting(false);
                return;
              }
            } else {
              try {
                const res = await axios.get(ruta_back + 'locacion',{
                  headers: {
                    Authorization: token, // No incluye el prefijo "Bearer"
                  }
                });
                const localReal = res.data
                  .filter(local => (location ? local.nombre === location : true))[0]
                await axios.post(ruta_back + 'inventario', {
                  id_locacion: localReal.id,
                  id_joya: productoReal.id_joya,
                  cantidad: quantity,
                  precio_venta: productoReal.precio_venta,
                  deleted: false
                },{
                  headers: {
                    Authorization: token, // No incluye el prefijo "Bearer"
                  }
                }); 
          
              } catch (error) {
                console.log(error);
                alert('Ocurrió un error al modificar el inventario');
                setSubmitting(false);
                return;
            }
          }
          } catch (error) {
            console.log(error);
            setSubmitting(false);
            return;
          }
          
          
        } catch (error) {
          console.log(error);
          alert('Ocurrió un error al modificar el producto');
          setSubmitting(false);
          return;
        }
        alert('Se movieron correctamente ' + quantity + ' unidades de ' + product.joya +  ' desde ' + product.local + ' hacia ' + location);
        setIsOpen(false);
        onSubmit();
        setAction('');
        setQuantity('');
        setLocation('');
        setDescription('');
        setSubmitting(false);
        return;
      } catch (error){
        console.log(error);
        alert('Ocurrió un error al modificar el inventario');
        setSubmitting(false);
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
          setSubmitting(false);
          return;
    }
        if(action.trim() === 'Compra'){
          try {
            await axios.put(ruta_back + 'inventario/' + product.id, {
              id_locacion: productoReal.id_locacion,
              id_joya: productoReal.id_joya,
              cantidad: Number(productoReal.cantidad) + Number(quantity),
              precio_venta: productoReal.precio_venta,
              deleted: false
            },{
              headers: {
                Authorization: token, // No incluye el prefijo "Bearer"
              }
            }); 
          alert('Se añadió correctamente ' + quantity + ' unidades de ' + product.joya +  ' al local ' + product.local);
            console.log(product)
            console.log(productoReal)
            console.log(quantity)

            // Obtener la fecha de hoy
            const fechaHoy = new Date();

            // Obtener los componentes de la fecha (día, mes y año)
            const dia = String(fechaHoy.getDate()).padStart(2, '0');
            const mes = String(fechaHoy.getMonth() + 1).padStart(2, '0'); // Sumamos 1 al mes ya que los meses en JavaScript empiezan desde 0 (enero es 0)
            const anio = fechaHoy.getFullYear();

            // Formatear la fecha en el formato deseado (dd/mm/aaaa)
            const fechaHoyFormateada = dia+'/'+mes+'/'+anio;
            await axios.post(ruta_back + 'log_inventario', {
              id_producto: product.id,
              nombre_producto: product.joya,
              tipo_producto: productoReal.id_joya,
              nombre_locacion: productoReal.id_locacion,
              cantidad: quantity,
              tipo_transaccion: 'COMPRA',
              fecha_transaccion: fechaHoyFormateada,
              valor_transaccion: 99999,
              responsable_transaccion: 'ALEN GALINDO',
            });
          } catch (error) {
            console.log(error);
            alert('Ocurrió un error al agregar stock al inventario');
            setSubmitting(false);
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
          // Obtener la fecha de hoy
          const fechaHoy = new Date();

          // Obtener los componentes de la fecha (día, mes y año)
          const dia = String(fechaHoy.getDate()).padStart(2, '0');
          const mes = String(fechaHoy.getMonth() + 1).padStart(2, '0'); // Sumamos 1 al mes ya que los meses en JavaScript empiezan desde 0 (enero es 0)
          const anio = fechaHoy.getFullYear();

          // Formatear la fecha en el formato deseado (dd/mm/aaaa)
          const fechaHoyFormateada = dia+'/'+mes+'/'+anio;  
          await axios.post(ruta_back + 'log_inventario', {
              id_producto: product.id,
              nombre_producto: product.joya,
              tipo_producto: productoReal.id_joya,
              nombre_locacion: productoReal.id_locacion,
              cantidad: quantity,
              tipo_transaccion: 'VENTA',
              fecha_transaccion: fechaHoyFormateada,
              valor_transaccion: 99999,
              responsable_transaccion: 'ALEN GALINDO',
            });

          } catch (error) {
            console.log(error);
            alert('Ocurrió un error al agregar stock al inventario');
            setSubmitting(false);
            return;
          }
        }
        setIsOpen(false);
        onSubmit();
        setAction('');
        setQuantity('');
        setLocation('');
        setDescription('');
        setSubmitting(false);
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
  }, [product]);

  const otrasLocaciones = locaciones.filter((locaciones) => locaciones.nombre !== product.local);

  if (!isOpen || !productoReal) {
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
              <h2>{product.local} - CANTIDAD: {productoReal.cantidad}</h2>           
              <form onSubmit={handleSubmit}>
                <label>¿QUÉ DESEA REALIZAR?</label>
                <select value={action} onChange={handleActionChange}>
                  <option value="">SELECCIONAR OPCIÓN</option>
                  <option value="Compra">COMPRA</option>
                  <option value="Venta">VENTA</option>
                  <option value="Mover Stock">TRASLADO</option>
                </select>
                {action === 'Mover Stock' && (
                  <>
                    <label>¿CUAL ES EL DESTINO DE TRASLADO?</label>
                    <select value={location}
                      onChange={handleLocationChange}
                    >
                      <option value="">SELECCIONE DESTINO</option>
                      {otrasLocaciones.map((locacion, index) => (
                        <option value={locacion.nombre} key={index}>{locacion.nombre}</option>
                      ))}
                    </select>
                  </>
                )}
                <label>CANTIDAD:</label>
                <input type="number" min="1" value={quantity} onChange={handleQuantityChange} />
                <label>INGRESE UNA DESCRIPCION:</label>
                <input type="text" value={description} onChange={handleDescriptionChange} />
                <button type='submit' disabled={submitting}>Enviar</button>
              </form>
            </div>
        </Container>
      </div>
    
  );
};

export default Modificar_Inventario;