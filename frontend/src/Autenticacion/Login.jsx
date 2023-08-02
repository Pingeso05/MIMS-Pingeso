import React, { useState, useContext, useEffect } from 'react';
import './Login.css';
import logo from '../images/Logo_Mimstransparent.png';
import { useNavigate, Navigate } from 'react-router-dom';
import { ruta_back } from '../utils/globals';
import {  useAuth } from '../context/AuthContext';
import axios from 'axios';
import { alertaError, alertaWarning } from '../utils/alertas';

const Login = () => {

  const { userIsAuthenticated, userLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = userIsAuthenticated();
    setLoggedIn(isLoggedIn);
  }, [userIsAuthenticated]);



  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      alertaWarning('Por favor, ingrese su correo electrónico y contraseña.');
      return;
    }

    try {
      const response = await axios.post(ruta_back + 'login', {
        email: email,
        password: password
      });

      const accessToken = response.headers["authorization"];
      
      localStorage.setItem('accessToken', accessToken);
      const currentDate = new Date();
      const expirationDate = new Date(currentDate.getTime() + 86400000);
      const expirationTimestamp = expirationDate.getTime();


      
      const userData = {
        data: {
          exp: expirationTimestamp,
          nombre: response.data.user,
          id: Number(response.data.userId),
          rol: Number(response.data.rol)
        }
      };
      userLogin(userData);

      setEmail('');
      setPassword('');
      setLoggedIn(true);

      if (response.data.message === 'Login Success') {
        const lastPath = localStorage.getItem('lastPath') || '/';
        navigate(lastPath, {
          replace: true,
        });
      } 
    } catch (error) {
        alertaError('No encontramos un usuario con esas credenciales.');
      }
      
  };

  if (isLoggedIn) {
    return <Navigate to={'/'} />;
  } else {
  return (
    <div className="pagina-login">
      <div id="loginform">
        <h2 id="headerTitle">Iniciar Sesión</h2>
        <div>
          <div className="row">
            <label>Email</label>
            <input
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese su correo"
              type='email'
            />
          </div>
          <div className="row">
            <label>Contraseña</label>
            <input
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              type="password"
            />
          </div>
          <div className="row">
            <button onClick={handleLogin}>Iniciar Sesión</button>
          </div>
        </div>
        <div id="alternativeLogin">
        <img src={logo} alt="Logo" className="logo-login" />
       </div>
      </div>
      
    </div>
  );
  }
};

export default Login;
