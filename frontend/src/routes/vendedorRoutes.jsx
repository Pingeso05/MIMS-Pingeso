
import '../App.css';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LogInventario from '../Pages/LogInventario';
import Transito from '../Pages/Transito';
import LayoutVendedor from '../Components/LayoutVendedor';
import InventarioVendedor from '../Pages/InventarioVendedor';


function VendedorRoutes() {
  return(
    <LayoutVendedor>
      <Container>
        <Routes>
          <Route path="/*" element={<Navigate to="/inventario" />} />
          <Route path="/inventario" element={<InventarioVendedor />} />
          <Route path="/transito" element={<Transito/>} />
          <Route path="/registros" element={<LogInventario/>} />
        </Routes>
      </Container>
    </LayoutVendedor>
  );
}

export default VendedorRoutes;