import Navbar from './NavBar';
import Navbar_Vendedor from './NavBar_Vendedor';

const Layout_Vendedor = ({ children }) => {
  return (
    <>
      <Navbar_Vendedor />
      <main>{children}</main>
    </>
  );
}
export default Layout_Vendedor;