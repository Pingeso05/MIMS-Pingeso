

import { Link,  useLocation } from 'react-router-dom';
import './navbar.css';
import logo from '../images/logo-letras.png';
import { useAuth } from '../context/AuthContext';



const Navbar_Vendedor = () => {
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
            <Link to="/vendedor/inventario" className={`navbar__link ${pathname === '/vendedor/inventario' ? 'active' : ''}`}>
              Inventario
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/vendedor/transito" className={`navbar__link ${pathname === '/vendedor/transito' ? 'active' : ''}`}>
              Transito
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/vendedor/registros" className={`navbar__link ${pathname === '/vendedor/registros' ? 'active' : ''}`}>
              Transacciones
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

export default Navbar_Vendedor;