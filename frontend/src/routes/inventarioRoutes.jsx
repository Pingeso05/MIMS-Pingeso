import Inventario from '../Pages/Inventario';
import TipoJoya from '../Pages/TipoJoya';
import AgregarTipoJoya from '../Pages/AgregarTipoJoya';
import AgregarJoya from '../Pages/AgregarJoya';
import '../App.css';
import Container from 'react-bootstrap/Container';
import Layout from '../Components/Layout';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Joya from '../Pages/Joya';
import AgregarProducto from '../Pages/Agregar_Producto';
import Locaciones from '../Pages/Locaciones';
import AgregarLocacion from '../Pages/Agregar_Locacion';
import CargaDatos from '../Pages/CargaDatos';


function App() {
  return(
    <Layout>
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/inventario" />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/inventario/agregar-producto" element={<AgregarProducto />} />
          <Route path="/joyas" element={<Joya />} />
          <Route path="/joyas/agregar-joya" element={<AgregarJoya />} />
          <Route path="/tipos-de-joya" element={<TipoJoya />} />
          <Route path="/tipos-de-joya/agregar-tipo" element={<AgregarTipoJoya />} />
          <Route path="/locaciones" element={<Locaciones />} />          
          <Route path="/locaciones/agregar-locacion" element={<AgregarLocacion />} />
          <Route path="/joyas" element={<Inventario />} />
          <Route path="/carga-datos" element={<CargaDatos />} />
        </Routes>
      </Container>
    </Layout>
  );
}

export default App;