import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import './Modificar_Inventario.css';
import '../utils/globals';
import {ruta_back} from '../utils/globals';

const Ver_Inventario = ({ id, onCancel}) => {
  

  const [isOpen, setIsOpen] = useState(true);
  const [producto, setProducto] = useState();
  const [joya, setJoya] = useState();
  const [local, setLocal] = useState();
  const [tipoJoya, setTipoJoya] = useState();
  const [precioCosto, setPrecioCosto] = useState();

  
  const getProducto = async () => {
    try {
      const res = await axios.get(ruta_back + 'inventario/' + id);
      const productoR = res.data;
      setProducto(productoR);
      const res2 = await axios.get(ruta_back + 'joya/' + productoR.id_joya);
      setJoya(res2.data.nombre);
      const res3 = await axios.get(ruta_back + 'locacion/' + productoR.id_locacion);
      setLocal(res3.data.nombre);
      const res4 = await axios.get(ruta_back + 'tipojoya/' + res2.data.id_tipo_joya);
      setTipoJoya(res4.data.nombre);
      setPrecioCosto(res2.data.cost);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getProducto();
  }, []);


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
              <h2 className="titulo">Detalle Producto</h2>
              <div>
                <h3 >
                  <span className="info-label">Nombre de joya:</span> <br />
                  <span className="info-value">{joya}</span>
                </h3>
                <h3 >
                  <span className="info-label">Tipo de joya:</span> <br />
                  <span className="info-value">{tipoJoya}</span>
                </h3>
                {producto && (
                  <>
                    <h3 >
                      <span className="info-label">Cantidad:</span> <br />
                      <span className="info-value">{producto.cantidad}</span>
                    </h3>
                    <h3 >
                      <span className="info-label">Locación:</span> <br />
                      <span className="info-value">{local}</span>
                    </h3>
                    <h3 >
                      <span className="info-label">Precio Costo:</span> <br />
                      <span className="info-value">{precioCosto}</span>
                    </h3>
                    <h3 >
                      <span className="info-label">Precio Venta:</span> <br />
                      <span className="info-value">{producto.precio_venta}</span>
                    </h3>
                  </>
                )}
              </div>
            </div>
        </Container>
      </div>
    
  );
};

export default Ver_Inventario;