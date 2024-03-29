
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';
import logo from '../images/logo-letras.png';
import { useAuth } from '../context/AuthContext';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState } from 'react';

const Navbar = () => {
  const { pathname } = useLocation();
  const { userLogout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onLogout = () => {
    userLogout();
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      {isMenuOpen && <div className="navbar__overlay" onClick={handleMenuToggle}></div>}
      <div className='navb_small'>
        <div className="navbar__toggler" onClick={handleMenuToggle}>
          <GiHamburgerMenu />
          
        </div>
        {isMenuOpen ? (
          <div className="navbar__collapse">
            <ul className="navbar__list">
              <li className="navbar__item">
                <Link onClick={handleMenuItemClick} to="/admin/inventario" className={`navbar__link ${pathname === '/admin/inventario' ? 'active' : ''}`}>
                  Inventario
                </Link>
              </li>
              <li className="navbar__item">
              <Link onClick={handleMenuItemClick} to="/admin/transito" className={`navbar__link ${pathname === '/admin/transito' ? 'active' : ''}`}>
                Transito
              </Link>
            </li>
            <li className="navbar__item">
              <Link onClick={handleMenuItemClick} to="/admin/registros" className={`navbar__link ${pathname === '/admin/registros' ? 'active' : ''}`}>
                Transacciones
              </Link>
            </li>
            <li className="navbar__item">
              <Link onClick={handleMenuItemClick} to="/admin/locaciones" className={`navbar__link ${pathname === '/admin/locaciones' ? 'active' : ''}`}>
                Locaciones
              </Link>
            </li>
            <li className="navbar__item">
              <Link onClick={handleMenuItemClick} to="/admin/tipos-de-joya" className={`navbar__link ${pathname === '/admin/tipos-de-joya' ? 'active' : ''}`}>
                Tipos de joya
              </Link>
            </li>
            <li className="navbar__item">
              <Link onClick={handleMenuItemClick} to="/admin/joyas" className={`navbar__link ${pathname === '/admin/joyas' ? 'active' : ''}`}>
                Joyas
              </Link>
            </li>
            <li className="navbar__item">
              <Link onClick={handleMenuItemClick} to="/admin/carga-datos" className={`navbar__link ${pathname === '/admin/carga-datos' ? 'active' : ''}`}>
                Carga de datos
              </Link>
            </li>
            <li className="navbar__item">
              
              <Link onClick={handleMenuItemClick} to="/admin/usuarios" className={`navbar__link ${pathname === '/admin/usuarios' ? 'active' : ''}`}>
                Usuarios
              </Link>
            </li>
            <li className="navbar__item">
              <Link onClick={handleMenuItemClick} to="/admin/inventario/agregar-producto" className={`navbar__link ${pathname === '/admin/inventario/agregar-producto' ? 'active' : ''}`}>
                Agregar Producto
              </Link>
            </li>
            </ul>

          </div>
        ) : null}
        <div className="navbar__right">
          <button className="nav-item nav-link btn" onClick={onLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>


      <div className='navb_big'>
        <div className="navbar__left">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className={`navbar__center }`}>
          <ul className="navbar__list">
            <li className="navbar__item">
              <Link to="/admin/inventario" className={`navbar__link ${pathname === '/admin/inventario' ? 'active' : ''}`}>
                Inventario
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="/admin/transito" className={`navbar__link ${pathname === '/admin/transito' ? 'active' : ''}`}>
                Transito
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="/admin/registros" className={`navbar__link ${pathname === '/admin/registros' ? 'active' : ''}`}>
                Transacciones
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="/admin/locaciones" className={`navbar__link ${pathname === '/admin/locaciones' ? 'active' : ''}`}>
                Locaciones
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="/admin/tipos-de-joya" className={`navbar__link ${pathname === '/admin/tipos-de-joya' ? 'active' : ''}`}>
                Tipos de joya
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="/admin/joyas" className={`navbar__link ${pathname === '/admin/joyas' ? 'active' : ''}`}>
                Joyas
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="/admin/carga-datos" className={`navbar__link ${pathname === '/admin/carga-datos' ? 'active' : ''}`}>
                Carga de datos
              </Link>
            </li>
            <li className="navbar__item">
              
              <Link to="/admin/usuarios" className={`navbar__link ${pathname === '/admin/usuarios' ? 'active' : ''}`}>
                Usuarios
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="/admin/inventario/agregar-producto" className={`navbar__link ${pathname === '/admin/inventario/agregar-producto' ? 'active' : ''}`}>
                Agregar Producto
              </Link>
            </li>
          </ul>
        </div>
        <div className={`navbar__right `}>
          <button className="nav-item nav-link btn" onClick={onLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

    