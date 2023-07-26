import React, { useState, useEffect, useContext } from 'react';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  };

  const getRol = () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.data && storedUser.data.rol !== undefined) {
        return storedUser.data.rol;
      }
    } catch (error) {
      return null; // Si no hay usuario almacenado o no se puede determinar el rol, retornar null
    }
    
  };

  const userIsAuthenticated = () => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      return false;
    }
    const user = JSON.parse(storedUser);
    const { data } = user;
  
    // Verificar si el token ha expirado
    if (!data || !data.exp || Date.now() > data.exp * 1000) {
      userLogout();
      return false;
    }
  
    return true;
  };

  const userLogin = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const userLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        getUser,
        getRol,
        userIsAuthenticated,
        userLogin,
        userLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
