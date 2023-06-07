import Inventario from './Pages/Inventario';
import './App.css';
import Container from 'react-bootstrap/Container';
import Layout from './Components/Layout';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AgregarProducto from './Pages/Agregar_Producto';
import Locaciones from './Pages/Locaciones';
import AgregarLocacion from './Pages/Agregar_Locacion';

function App() {
  return(
    <Layout>
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/inventario" />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/inventario/agregar-producto" element={<AgregarProducto />} />
          <Route path="/locaciones" element={<Locaciones />} />          
          <Route path="/locaciones/agregar-locacion" element={<AgregarLocacion />} />
          <Route path="/tipos-de-joya" element={<Inventario />} />
          <Route path="/joyas" element={<Inventario />} />
        </Routes>
      </Container>
    </Layout>
  );
}

export default App;
