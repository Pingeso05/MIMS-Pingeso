import React, { useDeferredValue, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import './Modificar_Inventario.css';
import '../utils/globals';
import {ruta_back} from '../utils/globals';
import { alertaError, alertaSuccess, alertaWarning } from '../utils/alertas';

const Venta_Inventario = ({ product, onCancel, onSubmit }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [action, setAction] = useState('');
  const [location, setLocation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [locaciones, setLocaciones] = useState([]);
  const [productoReal, setProductoReal] = useState();
  const [submitting, setSubmitting] = useState(false);
  const token = localStorage.getItem('accessToken');
  const user = localStorage.getItem('user');
  const userData = JSON.parse(user); // Convertir el string a un objeto

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

    if(productoReal.cantidad - quantity < 0 ){
      alertaWarning('Por favor, ingresa una cantidad menor a ' + (productoReal.cantidad+1));
      setSubmitting(false);
      return;
    }

    if(
    quantity.trim() === '' ||
    description.trim() === ''
  )
    {
      alertaWarning('Por favor, completa todos los campos');
      setSubmitting(false);
      return;
}
       
       
    try {
      await axios.put(ruta_back + 'inventario/' + product.id, {
        id_locacion: productoReal.id_locacion,
        id_joya: productoReal.id_joya,
        cantidad: Number(productoReal.cantidad) - Number(quantity),
        precio_venta: productoReal.precio_venta,
        deleted: false
      },{
        headers: {
          Authorization: token, // No incluye el prefijo "Bearer"
        }
      }); 
      alertaSuccess('Se vendieron ' + quantity + ' unidades de ' + product.joya );
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
        valor_transaccion: productoReal.precio_venta,
        responsable_transaccion: userData.data.id,
      },
      {
        headers:{
          Authorization: token,
        }
      });
    } catch (error) {
      console.log(error);
      alertaError('Ocurrió un error al agregar stock al inventario');
      setSubmitting(false);
      return;
    }
    setIsOpen(false);
    onSubmit();
    setAction('');
    setQuantity('');
    setLocation('');
    setDescription('');
    setSubmitting(false);
    return;
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
            <h2>VENTA DE PRODUCTO</h2>
              <h2>{product.joya}</h2>
              <h2>{product.local} - CANTIDAD: {productoReal.cantidad}</h2>           
              <form onSubmit={handleSubmit}>
                

          
                <label>INGRESE CANTIDAD:</label>
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

export default Venta_Inventario;