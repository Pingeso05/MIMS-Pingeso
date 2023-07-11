import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import './Modificar_Inventario.css';
import '../utils/globals';
import {ruta_back} from '../utils/globals';

const Editar_Joya = ({ id, onCancel, onSubmit }) => {
  

  const [isOpen, setIsOpen] = useState(true);
  const [costo, setCosto] = useState('');
  const [joya, setJoya] = useState();
  const [tiposJoya, setTiposJoya] = useState([]);
  const [nombre, setNombre] = useState('');
  const [joyaSeleccionada, setJoyaSeleccionada] = useState('');
  const [tipoJoyaSeleccionado, setTipoJoyaSeleccionado] = useState('');
  const token = localStorage.getItem('accessToken');

  //Obtener la joya a editar
  const getJoya = async () => {
    try {
      const res = await axios.get(ruta_back + 'joya/' + id,{
        headers: {
          Authorization: token, 
        }
      });
      const joyaR = res.data;
      setJoya(joyaR);
        setNombre(joyaR.nombre);
        setCosto(joyaR.cost);
        setTipoJoyaSeleccionado(joyaR.id_tipo_joya);
    } catch (error) {
      console.log(error);
    }
  };

    //Obtener los tipos de joya
    const getTiposJoya = async () => {
        try {
        const res = await axios.get(ruta_back + 'tipojoya',{
          headers: {
            Authorization: token, 
          }
        });
        const tiposJoyaR = res.data;
        setTiposJoya(tiposJoyaR);
        }
        catch (error) {
            console.log(error);
        }
    };
  
    useEffect(() => {
        getJoya();
        getTiposJoya();
    }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      nombre === '' || costo === ''
    ) {
      alert('Por favor, completa todos los campos');
      return;
    }

    try {
        await axios.put(ruta_back + 'joya/' + id, {
        nombre: nombre,
        id_tipo_joya: tipoJoyaSeleccionado,
        cost: costo,
        deleted: false
      },{
        headers: {
          Authorization: token, 
        }
      });

  
      setTipoJoyaSeleccionado('');
      setNombre('');
      setCosto('');
      setIsOpen(false);
      onSubmit();
      alert('Producto actualizado exitosamente');
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
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
              <form onSubmit={handleSubmit}>
                <div className="note-red">
                  <h3>Recuerde que aqui esta editando una joya no un producto</h3>
                </div>
                <div  >
                  <label htmlFor="costo">Precio costo:</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    id="costo"
                    value={costo}
                    onChange={(e) => setCosto(e.target.value)}
                  />
                </div>
                <div  >
                  <label htmlFor="nombre">Nombre de joya:</label>
                  <input
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>

                <div>
                <label htmlFor="tipojoya">Tipo de joya:</label>
                    <select
                    id="tipojoya"
                    value={tipoJoyaSeleccionado}
                    onChange={(e) => setTipoJoyaSeleccionado(e.target.value)}
                    >
                    <option value="">Seleccione una tipo de joya</option>
                        {tiposJoya.map((tipoJoya) => (
                        <option value={tipoJoya.id} key={tipoJoya.id}>
                            {tipoJoya.nombre}
                        </option>
                        ))}
                    </select>
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

export default Editar_Joya;