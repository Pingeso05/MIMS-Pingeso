import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import './Modificar_Inventario.css';
import '../utils/globals';
import {ruta_back} from '../utils/globals';

const Editar_Tipo_Joya = ({ id, onCancel, onSubmit }) => {
  

  const [isOpen, setIsOpen] = useState(true);
  const [nombre, setNombre] = useState('');
  const [material, setMaterial] = useState('');
  const token = localStorage.getItem('accessToken');

  const getTipoJoya = async () => {
    try {
      const res = await axios.get(ruta_back + 'tipojoya/' + id,{
        headers: {
          Authorization: token, 
        }
      });
      const tipoJoya = res.data;

      setNombre(tipoJoya.nombre);
      setMaterial(tipoJoya.material);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (nombre.trim() === '' || material.trim() === '') {
      alert('Por favor, completa todos los campos');
      return;
    }

    try {
      await axios.put(ruta_back + 'tipojoya/' + id, {
        nombre: nombre,
        material: material,
      },{
        headers: {
          Authorization: token, 
        }
      });

      setNombre('');
      setMaterial('');
      onSubmit();
      setIsOpen(false);
      alert('Tipo de Joya actualizado exitosamente');
    } catch (error) {
      console.log(error);
      alert('Ocurrió un error al actualizar el tipo de joya');
    }
  };

  useEffect(() => {
    getTipoJoya();
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
            <div>
              <h2>Editar Tipo de Joya</h2>

              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="nombre">Nombre:</label>
                  <input
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="material">Material:</label>
                  <input
                    type="text"
                    id="material"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
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

export default Editar_Tipo_Joya;