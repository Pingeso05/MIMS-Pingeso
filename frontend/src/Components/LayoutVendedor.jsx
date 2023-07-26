import Navbar from './NavBar';
import Navbar_Vendedor from './NavBar_Vendedor';

const LayoutVendedor = ({ children }) => {
  return (
    <>
      <Navbar_Vendedor />
      <main>{children}</main>
    </>
  );
}
export default LayoutVendedor;