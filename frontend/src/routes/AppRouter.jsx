import { Routes, Route, Navigate } from 'react-router-dom';
import InventarioRoutes from './inventarioRoutes';
import VendedorRoutes from './vendedorRoutes';
import Login from '../Autenticacion/Login';
import { AuthProvider } from '../context/AuthContext';
import PrivateRoute from '../misc/PrivateRoute';
import { useAuth } from '../context/AuthContext';

export const AppRouter = () => {
  const { userIsAuthenticated, getRol } = useAuth();
  const rol = getRol();

  return (
    <Routes>
      {/* Rutas de login */}
      <Route path="/login/*" element={<Login />} />

      {/* Rutas para el rol de Administrador */}
      <Route path="/admin/*" element={<PrivateRoute role={0}><InventarioRoutes /></PrivateRoute>} />

      {/* Rutas para el rol de Vendedor */}
      <Route path="/vendedor/*" element={<PrivateRoute role={1}><VendedorRoutes /></PrivateRoute>} />

      {/* Redirigir cualquier otra ruta a la página de inicio */}
      <Route
        path="/*"
        element={
          rol === 1 ? (
            <Navigate to="/vendedor/inventario" />
          ) : rol === 0 ? (
            <Navigate to="/admin/inventario" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
};

