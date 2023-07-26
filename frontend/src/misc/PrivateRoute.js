import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children, role }) {
  const { userIsAuthenticated, getRol } = useAuth();
  const isAuthenticated = userIsAuthenticated();
  const userRol = getRol();

  // Si el usuario no está autenticado, redirigir a '/login'
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }


  if (role === 0 && userRol !== 0) {
    return <Navigate to="/" />;
  }


  if (role === 1 && userRol !== 1) {
    return <Navigate to="/" />;
  }

  // Si el rol del usuario coincide con el rol requerido para esta ruta, mostrar el contenido
  if (userRol === role) {
    return children;
  }

  // Si el usuario tiene un rol desconocido, redirigir a '/login'
  return <Navigate to="/login" />;
}

export default PrivateRoute;
