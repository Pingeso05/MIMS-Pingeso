
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
                <Link onClick={handleMenuItemClick} to="/vendedor/inventario" className={`navbar__link ${pathname === '/vendedor/inventario' ? 'active' : ''}`}>
                  Inventario
                </Link>
              </li>
              <li className="navbar__item">
                <Link onClick={handleMenuItemClick} to="/vendedor/transito" className={`navbar__link ${pathname === '/vendedor/transito' ? 'active' : ''}`}>
                  Transito
                </Link>
              </li>
              <li className="navbar__item">
                <Link onClick={handleMenuItemClick} to="/vendedor/registros" className={`navbar__link ${pathname === '/vendedor/registros' ? 'active' : ''}`}>
                  Transacciones
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

 