import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import './Modificar_Inventario.css';
import '../utils/globals';
import { ruta_back, ruta_front } from '../utils/globals';
import { alertaError, alertaSuccess, alertaWarning } from '../utils/alertas';

const Carga_Cantidad = ({ joyas, onCancel, onSubmit }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [cantidades, setCantidades] = useState(joyas.map(() => ''));
  const [locacionSeleccionada, setLocacionSeleccionada] = useState('');
  const [locaciones, setLocaciones] = useState([]);
  const token = localStorage.getItem('accessToken');
  const user = localStorage.getItem('user');
  const userData = JSON.parse(user); // Convertir el string a un objeto

  const getLocaciones = async () => {
    try {
      const res = await axios.get(ruta_back + 'locacion',{
        headers: {
          Authorization: token, 
        }});
      const locacionesUnicas = [...new Set(res.data.map(locacion => locacion.nombre))];
      setLocaciones(locacionesUnicas);
    } catch (error) {
      console.log(error);
      console.log('error: No se pudieron obtener la locaciones!');
    }
  };

  useEffect(() => {
    getLocaciones();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (cantidades.some((cantidad) => cantidad === '' || cantidad < 0)) {
      alertaWarning('Recuerde introducir una cantidad válida para cada joya');
      return;
    }

    try {
        const inventario = await axios.get(ruta_back + 'inventario',{
          headers: {
            Authorization: token, 
          }
        });
        const inventarioFiltrado = inventario.data.filter(
            (item) => item.local?.trim() === locacionSeleccionada?.trim() &&
              joyas.some((joya) => joya.nombre === item.joya)
          );
        // Obtener los componentes de la fecha (día, mes y año)
        const fechaHoy = new Date();
        const dia = String(fechaHoy.getDate()).padStart(2, '0');
        const mes = String(fechaHoy.getMonth() + 1).padStart(2, '0'); // Sumamos 1 al mes ya que los meses en JavaScript empiezan desde 0 (enero es 0)
        const anio = fechaHoy.getFullYear();

        // Formatear la fecha en el formato deseado (dd/mm/aaaa)
        const fechaHoyFormateada = dia+'/'+mes+'/'+anio;

        joyas.map(async (joya, index) => {
            var inventarioItem = inventarioFiltrado.find((item) => item.joya === joya.nombre);

            if (inventarioItem) {
              //console.log(inventarioItem);
                const cantidadInventario = inventarioItem.cantidad;
                const cantidadActual = parseInt(cantidades[index], 10);
                const nuevaCantidad = cantidadActual + cantidadInventario;
            
                try{
                    const res = await axios.get(ruta_back + 'inventario/' + inventarioItem.id,{
                      headers: {
                        Authorization: token, 
                      }
                    });
                    const producto_cambiar = res.data;
                    console.log(producto_cambiar);
                    try{
                        await axios.put(ruta_back + 'inventario/' + producto_cambiar.id, {
                            id_locacion: producto_cambiar.id_locacion,
                            id_joya: producto_cambiar.id_joya,
                            cantidad: nuevaCantidad,
                            precio_venta: producto_cambiar.precio_venta,
                            deleted: false
                        },{
                          headers: {
                            Authorization: token, 
                          }
                        });

                        try{
                          const res = await axios.get(ruta_back + 'locacion',{
                            headers: {
                              Authorization: token, 
                            }});
                          const local = res.data.find((local) => local.nombre === locacionSeleccionada);
                          console.log(locacionSeleccionada);
                          console.log(local);
                          await axios.post(ruta_back + 'log_inventario', {
                            id_producto: producto_cambiar.id,
                            nombre_producto: joya.nombre,
                            tipo_producto: producto_cambiar.id_joya,
                            nombre_locacion: producto_cambiar.id_locacion,
                            cantidad: cantidadActual,
                            tipo_transaccion: 'CARGA',
                            fecha_transaccion: fechaHoyFormateada,
                            valor_transaccion: producto_cambiar.precio_venta,
                            responsable_transaccion: userData.data.id,
                          },{
                            headers: {
                              Authorization: token, 
                            }
                          }); 
                          
                        }catch (error) {
                          console.log(error);
                          alertaError('Ocurrió un error al generar el log de inventario');
                          return;
                        }
                    } catch (error) {
                        console.log(error);
                        alertaError('Ocurrió un error al modificar el inventario');
                        return;
                    }
                } catch (error) {
                    alertaError('Error al actualizar el inventario:');
                }
            } else {
              try{
                const res = await axios.get(ruta_back + 'locacion',{
                  headers: {
                    Authorization: token, 
                  }
                });
                const locacion = res.data.find((locacion) => locacion.nombre === locacionSeleccionada);
                const res2 = await axios.get(ruta_back + 'inventario',{
                  headers: {
                    Authorization: token, 
                  }
                });
                const producto_auxiliar = res2.data.find((item) => joya.nombre === item.joya);
                //console.log("El producto auxiliar: " + {producto_auxiliar});

                await axios.post(ruta_back + 'inventario', {
                      id_locacion: locacion.id,
                      id_joya: joya.id,
                      cantidad: parseInt(cantidades[index], 10),
                      precio_venta: producto_auxiliar.precio_venta,
                      deleted: false
                      },{
                        headers: {
                          Authorization: token, 
                        }
                      });

                      try{
                        const res = await axios.get(ruta_back + 'inventario',{
                          headers: {
                            Authorization: token, 
                          }
                        });
                        const last = res.data[res.data.length - 1];
                        console.log(last);
                        console.log(joya.nombre);
                        console.log(locacion.id);
                        await axios.post(ruta_back + 'log_inventario', {
                          id_producto: last.id,
                          nombre_producto: joya.nombre,
                          tipo_producto: 1,
                          nombre_locacion: locacion.id,
                          cantidad: parseInt(cantidades[index], 10),
                          tipo_transaccion: 'CARGA',
                          fecha_transaccion: fechaHoyFormateada,
                          valor_transaccion: 999999,
                          responsable_transaccion: userData.data.id,
                        },{
                          headers: {
                            Authorization: token, 
                          }
                        }); 

                      }catch (error) {
                        console.log(error);
                        alertaError('Ocurrió un error al generar el log de inventario');
                        return;
                      }
                } catch (error) {
                    alertaError('Error al actualizar el inventario:');
                }

        }
      });      
      alertaSuccess('Se han cargado exitosamente los productos al inventario');
      //window.location.href = ruta_front + 'inventario';
    } catch (error) {
      console.log(error);
    }
    setIsOpen(false);
    onSubmit();

  };

  const handleCancel = () => {
    setIsOpen(false);
    onCancel();
  };

  const handleChangeCantidad = (index, value) => {
    const updatedCantidades = [...cantidades];
    if (value === '' || (value >= 0 && Number.isInteger(parseFloat(value)))) {
      updatedCantidades[index] = value;
    }
    setCantidades(updatedCantidades);
  };

  const handleLocacionChange = (event) => {
    const locacion = event.target.value;
    console.log(locacion);
    setLocacionSeleccionada(locacion);
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
          <div className="locaciones-menu">
            <label htmlFor="locacion">Seleccione la locación de destino:</label>
            <select className='dropdown-tb'
              value={locacionSeleccionada}
              onChange={handleLocacionChange}
            >
              <option value="">Local</option>
              {locaciones.map((locacion, index) => (
                <option value={locacion} key={index}>{locacion}</option>
              ))}
            </select>
          </div>
          <table className="joya-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {joyas.map((joya, index) => (
                <tr key={index}>
                  <td>{joya.nombre}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={cantidades[index]}
                      onChange={(e) => handleChangeCantidad(index, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="separador"></div>
          <button type="submit" onClick={handleSubmit}>
            Agregar al inventario
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Carga_Cantidad;
