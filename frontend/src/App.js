import Inventario from './Pages/Inventario';
import AgregarProducto from './Pages/Agregar_Producto';
import TipoJoya from './Pages/TipoJoya';
import AgregarTipoJoya from './Pages/AgregarTipoJoya';

import './App.css';
import Container from 'react-bootstrap/Container';
import Layout from './Components/Layout';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


function App() {
  return(
    <Layout>
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/inventario" />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/inventario/agregar-producto" element={<AgregarProducto />} />
          
          <Route path="/locaciones" element={<Inventario />} />
          <Route path="/tipos-de-joya" element={<TipoJoya />} />
          
          <Route path="/joyas" element={<Inventario />} />
        </Routes>
      </Container>
    </Layout>
  );
}

export default App;
