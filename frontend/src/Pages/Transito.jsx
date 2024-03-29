import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Inventario.css';
import React from 'react';
import {ruta_back} from '../utils/globals.js';
import '../utils/globals.css';
import Button from 'react-bootstrap/Button';
import { alertaError } from '../utils/alertas';
import Swal from 'sweetalert2';

const Transito = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [locaciones, setLocaciones] = useState([]);
  const [locacion1Seleccionada, setLocacion1Seleccionada] = useState('');
  const [locacion2Seleccionada, setLocacion2Seleccionada] = useState('');
  const [T, setT] = useState(null);
  const [productoInventario, setProductoInventario] = useState(null); // [producto, setProducto
  const token = localStorage.getItem('accessToken');
  const user = localStorage.getItem('user');
  const userData = JSON.parse(user);

  const getLocaciones = async () => {
    try {
      const res = await axios.get(ruta_back + 'locacion', {
        headers: {
          Authorization: token, 
        }
      });
      const locacionesUnicas = [...new Set(res.data.map(locacion => locacion.nombre))];
      setLocaciones(locacionesUnicas);
    } catch (error) {
      console.log(error);
      console.log('error: No se pudieron obtener la locaciones!');
    }
  };
  const handleLocacion1Change = (event) => {
    const locacion1 = event.target.value;
    setLocacion1Seleccionada(locacion1);
  };
  const handleLocacion2Change = (event) => {
    const locacion2 = event.target.value;
    setLocacion1Seleccionada(locacion2);
  };
  const getProductos = async () => {
    try {
      const res = await axios.get(ruta_back + 'transito', {
        headers: {
          Authorization: token, 
        }
      });
      setProductos(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDevolver = async (producto) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro de cancelar el traslado de ' + producto.joya + ' hacia ' + producto.destino + '?',
        text: "El stock volverá a su lugar de origen.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Salir',
        confirmButtonText: 'Confirmar'
      });
  
      if (result.isConfirmed) {
        try {
          const res = await axios.get(ruta_back + 'transito/' + producto.id,{
            headers: {
              Authorization: token, // No incluye el prefijo "Bearer"
            }
          });
          const p = res.data;
          console.log("Aqui va el p:");
          console.log(p);
          const res2 = await axios.get(ruta_back + 'inventario/' + p.id_inventario,{
            headers: {
              Authorization: token, // No incluye el prefijo "Bearer"
            }
          });
          const p2 = res2.data;
          console.log("Aqui va el p2:");
          console.log(p2);
          await axios.put(ruta_back + 'inventario/' + p2.id,{
              id_locacion: p2.id_locacion,
              id_joya: p2.id_joya,
              cantidad: p2.cantidad + p.cantidad,
              precio_venta: p2.precio_venta,
              deleted: false
            },{headers: {
              Authorization: token, // No incluye el prefijo "Bearer"
            }
          });
          await axios.delete(ruta_back + 'transito/' + p.id,{
            headers: {
              Authorization: token, // No incluye el prefijo "Bearer"
            }
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
            id_producto: p2.id,
            nombre_producto: producto.joya,
            tipo_producto: p2.id,
            nombre_locacion: p2.id_locacion,
            cantidad: p.cantidad,
            tipo_transaccion: 'RETORNO',
            fecha_transaccion: fechaHoyFormateada,
            valor_transaccion: 0,
            responsable_transaccion: userData.data.id,
          }
          ,{
            headers: {
              Authorization: token, // No incluye el prefijo "Bearer"
            }
          });
    
          
        } catch (error) {
          alertaError("No se pudo obtener el producto");
        }
        setT(Date.now());

        Swal.fire(
          'Traslado Cancelado',
          'El traslado ha sido cancelado con éxito',
          'success'
        );
      } 
    } catch (error) {
      alertaError('Ha ocurrido un error al cancelar el traslado');
    }
  };
    
    

  const handleRecibir = async (producto) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro qué recepcionaste el producto ' + producto.joya + ' en ' + producto.destino + '?',
        text: "El stock se añadirá al lugar de destino.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar'
      });
  
      if (result.isConfirmed) {
        try {
          const res = await axios.get(ruta_back + 'transito/' + producto.id,{
            headers: {
              Authorization: token, // No incluye el prefijo "Bearer"
            }
          });
          const p = res.data;
          console.log("Aqui va el p:");
          console.log(p);
          const res2 = await axios.get(ruta_back + 'inventario/' + p.id_inventario,{
            headers: {
              Authorization: token, // No incluye el prefijo "Bearer"
            }
          });
          const p2 = res2.data;
          console.log("Aqui va el p2:");
          console.log(p2);
          const inventario = await axios.get(ruta_back + 'inventario',{
            headers: {
              Authorization: token, 
            }
          });
          const res_locacion = await axios.get(ruta_back + 'locacion/' + p.id_destino,{
            headers: {
              Authorization: token,
            }
          });
          const res_nombre_joya = await axios.get(ruta_back + 'joya/' + p2.id_joya,{
            headers: {
              Authorization: token,
            }
          });
          const joyaSeleccionada = res_nombre_joya.data.nombre;
          const locacionSeleccionada = res_locacion.data.nombre;
          const inventarioItem = inventario.data.filter(
              (item) => item.local?.trim() === locacionSeleccionada?.trim() && 
              item.joya?.trim() === joyaSeleccionada?.trim()
                
            )[0];
          // Obtener los componentes de la fecha (día, mes y año)
          const fechaHoy = new Date();
          const dia = String(fechaHoy.getDate()).padStart(2, '0');
          const mes = String(fechaHoy.getMonth() + 1).padStart(2, '0'); // Sumamos 1 al mes ya que los meses en JavaScript empiezan desde 0 (enero es 0)
          const anio = fechaHoy.getFullYear();
    
          // Formatear la fecha en el formato deseado (dd/mm/aaaa)
          const fechaHoyFormateada = dia+'/'+mes+'/'+anio;
    
          if (inventarioItem) {
              const cantidadInventario = inventarioItem.cantidad;
              const cantidadActual = p.cantidad;
              const nuevaCantidad = cantidadActual + cantidadInventario;
              console.log("Inventario Item");
              console.log(inventarioItem);
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
                      await axios.post(ruta_back + 'log_inventario', {
                      id_producto: producto_cambiar.id,
                      nombre_producto: producto.joya,
                      tipo_producto: producto_cambiar.id_joya,
                      nombre_locacion: producto_cambiar.id_locacion,
                      cantidad: cantidadActual,
                      tipo_transaccion: 'RECEPCION',
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
    
    
    
                //----------------------------
              } catch (error) {
                  alertaError('Error al actualizar el inventario:');
              }
    
          } else {
            try{
              const res2 = await axios.get(ruta_back + 'inventario',{
                headers: {
                  Authorization: token, 
                }
              });
              const producto_auxiliar = res2.data.find((item) => producto.joya === item.joya);
              //console.log("El producto auxiliar: " + {producto_auxiliar});
              await axios.post(ruta_back + 'inventario', {
                    id_locacion: p.id_destino,
                    id_joya: p2.id_joya,
                    cantidad: p.cantidad,
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
                      await axios.post(ruta_back + 'log_inventario', {
                        id_producto: last.id,
                        nombre_producto: producto.joya,
                        tipo_producto: 1,
                        nombre_locacion: p.id_destino,
                        cantidad: p.cantidad,
                        tipo_transaccion: 'RECEPCION',
                        fecha_transaccion: fechaHoyFormateada,
                        valor_transaccion: 0,
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
      } catch (error) {
        console.log(error);
      }
      await axios.delete(ruta_back + 'transito/' + producto.id,{
        headers: {
          Authorization: token, // No incluye el prefijo "Bearer"
        }
      });
      setT(Date.now());
        Swal.fire(
          'Producto Recepcionado',
          'El producto ha sido recepcionado con exito',
          'success'
        );
      } 
    } catch (error) {
      alertaError('Ha ocurrido un error al recepcionar el producto.');
    }
  };
    
  



  const getCategorias = async () => {
    try {
      const res = await axios.get(ruta_back + 'tipojoya', {
        headers: {
          Authorization: token, 
        }
      });
      const categoriasUnicas = [...new Set(res.data.map(categoria => categoria.nombre))];
      setCategorias(categoriasUnicas);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoriaChange = (event) => {
    const categoria = event.target.value;
    setCategoriaSeleccionada(categoria);
  };
  
  useEffect(() => {
    setProductoInventario();
    setT();
    getProductos();
    getCategorias();
    getLocaciones();
  }, [T]);

  const filteredProductos = productos
  .filter(producto => (categoriaSeleccionada ? producto.tipo_producto === categoriaSeleccionada : true))
  .filter(producto => (locacion1Seleccionada ? producto.origen === locacion1Seleccionada : true))
  .filter(producto => (locacion2Seleccionada ? producto.destino === locacion2Seleccionada : true));

  return (
    <Container style={{ marginTop: '30px', textAlign: 'center' }} className="container-table">
      <h1 className='titulo' >PRODUCTOS EN TRANSITO</h1>
      
        
          

      <Row className="fila-dp" style={{ marginTop: '10px' }}>

        <Col md={6} style={{ marginTop: '5px',display: 'flex', alignItems: 'left' }}>
          <select className='dropdown-tb'
            value={categoriaSeleccionada}
            onChange={handleCategoriaChange}
          >
            <option value="">CATEGORÍA</option>
            {categorias.map((categoria, index) => (
              <option value={categoria} key={index}>{categoria}</option>
            ))}
          </select>
        </Col>
      
                 

      </Row>
      <Row style={{padding:'10px'}}>
      <Col md={6} style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px', fontWeight: 'bold' }}>PRODUCTOS:</span>
            <span>{filteredProductos.length}</span>
          </Col>
      </Row>
      
          <div className='div-table'>
          <Table bordered hover className='table'>
            <thead>
              <tr className='cabeceras'>
                <th>#</th>
                <th>JOYA</th>
                <th>TIPO JOYA</th>
                <th>CANTIDAD</th>
                <th>ORIGEN</th>
                <th>DESTINO</th>
                <th>FECHA SALIDA</th>
                <th>RESPONSABLE</th>
                <th>OPCIONES</th>
                
              </tr>
            </thead>
            <tbody>
              {filteredProductos.map((producto, index) => (
                <tr key={index}>
                  <td>{producto.id}</td>
                  <td>{producto.joya}</td>
                  <td>{producto.tipo_producto}</td>
                  <td>{Number(producto.cantidad).toLocaleString()}</td>
                  <td>{producto.origen}</td>
                  <td>{producto.destino}</td>
                  <td>{producto.fecha_salida}</td>
                  <td>{producto.responsable}</td>
                  <td>
                  <div className='icono-columna'>
                  
                    <Col  style={{padding:'2px'}}><Button variant="primary" onClick ={() => handleRecibir(producto)} style={{ marginRight: '10px' , backgroundColor: '#D5418F', borderRadius: '10', borderColor: 'transparent',fontSize:'14px'}}>RECEPCIONAR</Button></Col>
                    <Col  style={{padding:'2px'}}>
                      <Button onClick={() => handleDevolver(producto)} variant="primary" style={{ marginRight: '10px' , backgroundColor: '#D5418F', borderRadius: '10', borderColor: 'transparent',fontSize:'14px'}}>
                        CANCELAR
                      </Button>
                    </Col>
                  
                  </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>  
        </div>

        </Container>
    );
  };
  
  export default Transito;