import Inventario from './Pages/Inventario';
import './App.css';
import Container from 'react-bootstrap/Container';
import Layout from './Components/Layout';
import { Routes, Route } from 'react-router-dom';
import AgregarProducto from './Pages/Agregar_Producto';

function App() {
  return(
    <Layout>
      <Container>
        <Routes>
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/inventario/agregar-producto" element={<AgregarProducto />} />
          <Route path="/locaciones" element={<Inventario />} />
          <Route path="/tipos-de-joya" element={<Inventario />} />
          <Route path="/joyas" element={<Inventario />} />
        </Routes>
      </Container>
    </Layout>
  );
}

export default App;
