import { Route, Routes } from 'react-router-dom';

import  InventarioRoutes  from './inventarioRoutes';
import  Login  from '../Autenticacion/Login';
import PrivateRoute from '../misc/PrivateRoute';
import { AuthProvider } from '../context/AuthContext';



export const AppRouter = () => {
  return (
    <>
      <AuthProvider>
        <Routes>
            
            <Route path="login/*" element={
                  <Routes>
                    <Route path="/*" element={<Login />} />
                  </Routes>
              }
            />
            
            
            <Route path="/*" element={
                <PrivateRoute><InventarioRoutes /></PrivateRoute>
            } />

            
            

        </Routes>
      </AuthProvider>
    </>
  )
}