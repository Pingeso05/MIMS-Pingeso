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
import LogInventario from '../Pages/LogInventario';
import Transito from '../Pages/Transito';
import Administrar_Usuarios from '../Pages/Administrar_Usuarios';
import AgregarUsuario from '../Pages/AgregarUsuario';
import Layout_Vendedor from '../Components/Layout_Vendedor';


function VendedorRoutes() {
  return(
    <Layout_Vendedor>
      <Container>
        <Routes>
          <Route path="/*" element={<Navigate to="/inventario" />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/transito" element={<Transito/>} />
          <Route path="/registros" element={<LogInventario/>} />
        </Routes>
      </Container>
    </Layout_Vendedor>
  );
}

export default VendedorRoutes;