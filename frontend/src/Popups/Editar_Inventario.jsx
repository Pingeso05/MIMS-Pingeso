import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import './Modificar_Inventario.css';
import '../utils/globals';
import {ruta_back} from '../utils/globals';

const Editar_Inventario = ({ id, onCancel, onSubmit }) => {
  

  const [isOpen, setIsOpen] = useState(true);
  const [precioVenta, setPrecioVenta] = useState('');
  const [producto, setProducto] = useState();
  const [joya, setJoya] = useState();
  const [local, setLocal] = useState();
  const token = localStorage.getItem('accessToken');
  
  const getProducto = async () => {
    try {
      const res = await axios.get(ruta_back + 'inventario/' + id,{
        headers: {
          Authorization: token, 
        }
      });
      const productoR = res.data;
      setProducto(productoR);
      const res2 = await axios.get(ruta_back + 'joya/' + productoR.id_joya,{
        headers: {
          Authorization: token, 
        }
      });
      setJoya(res2.data.nombre);
      const res3 = await axios.get(ruta_back + 'locacion/' + productoR.id_locacion,{
        headers: {
          Authorization: token, 
        }
      });
      setLocal(res3.data.nombre);
      setPrecioVenta(productoR.precio_venta);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getProducto();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      precioVenta === ''
    ) {
      alert('Por favor, completa todos los campos');
      return;
    }

    try {
      const productoTReal = (await axios.get(ruta_back + 'inventario/' + id,{
        headers: {
          Authorization: token, 
        }
      })).data;
      await axios.put(ruta_back + 'inventario/' + id, {
        id_locacion: productoTReal.id_locacion,
        id_joya: productoTReal.id_joya,
        cantidad: productoTReal.cantidad,
        precio_venta: precioVenta,
        deleted: false
      },{
        headers: {
          Authorization: token, 
        }
      });

  
      setPrecioVenta('');
      setIsOpen(false);
      onSubmit();
      alert('Producto actualizado exitosamente');
    } catch (error) {
      console.log(error);
      alert('Ocurrió un error al actualizar el producto');
    }
  };


  const handleCancel = () => {
    setIsOpen(false);
    onCancel();
  };


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
            <div>
              <h2>{joya}</h2>
              {producto && (
                <h2>{local} - Cantidad: {producto.cantidad}</h2>
              )}    
              <form onSubmit={handleSubmit}>
                <div className="note-red">
                  Recuerde que para cambiar el nombre y tipo de joya se debe realizar directamente desde la tabla de joyas.
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

                <button type="submit">Actualizar Producto</button>
              </form>

              <div className="separador"> </div>
            </div>
            </div>
        </Container>
      </div>
    
  );
};

export default Editar_Inventario;