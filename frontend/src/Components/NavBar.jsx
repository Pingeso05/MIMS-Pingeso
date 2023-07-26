/*
import { NavLink } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function BasicExample() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">MIMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#inventario">Inventarios</Nav.Link>
            <Nav.Link href="#locacion">Locaciones</Nav.Link>
            <Nav.Link href="#tipos_de_joya">Tipos de Joya</Nav.Link>
            <Nav.Link href="#joya">Joyas</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
*/

import { Link,  useLocation } from 'react-router-dom';
import './navbar.css';
import logo from '../images/logo-letras.png';
import { useAuth } from '../context/AuthContext';



const Navbar = () => {
  const { pathname } = useLocation();
  const { userLogout } = useAuth();
  
  const onLogout = () => {
    userLogout();
  }

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="navbar__center">
        <ul className="navbar__list">
          <li className="navbar__item">
            <Link to="/inventario" className={`navbar__link ${pathname === '/inventario' ? 'active' : ''}`}>
              Inventario
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/transito" className={`navbar__link ${pathname === '/transito' ? 'active' : ''}`}>
              Transito
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/registros" className={`navbar__link ${pathname === '/registros' ? 'active' : ''}`}>
              Transacciones
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/locaciones" className={`navbar__link ${pathname === '/locaciones' ? 'active' : ''}`}>
              Locaciones
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/tipos-de-joya" className={`navbar__link ${pathname === '/tipos-de-joya' ? 'active' : ''}`}>
              Tipos de joya
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/joyas" className={`navbar__link ${pathname === '/joyas' ? 'active' : ''}`}>
              Joyas
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/carga-datos" className={`navbar__link ${pathname === '/carga-datos' ? 'active' : ''}`}>
              Carga de datos
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/inventario/agregar-producto" className={`navbar__link ${pathname === '/inventario/agregar-producto' ? 'active' : ''}`}>
              Agregar Producto
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar__right">
        <button
            className="nav-item nav-link btn"
            onClick={ onLogout }
        >
            Cerrar Sesión
        </button>
</div>
    </nav>
  );
}

export default Navbar;