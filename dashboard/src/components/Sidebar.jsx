import logo from "../assets/images/Logo-letras.png";
import * as Icon from 'react-bootstrap-icons';
import {NavLink} from 'react-router-dom';

const Sidebar = () => {
  return (
    <>
        <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">
        <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" to='/'>
            <div className="sidebar-brand-icon">
                <img className="w-100" src={logo} alt="InnovatechShop Logo" style={{filter: "drop-shadow(3px 1px 0px black)"}}/>
            </div>
        </NavLink>

        <hr className="sidebar-divider my-0" />

        <li className="nav-item active">
            <NavLink className="nav-link" to="/">
                <Icon.Speedometer2 /> <span>Dashboard</span>
            </NavLink>
        </li>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Información</div>

        <li className="nav-item">
            <NavLink className="nav-link collapsed" to="/lastProduct">
                <Icon.FolderFill /> <span>Ultimo Producto</span>
            </NavLink>
        </li>

        <li className="nav-item">
            <NavLink className="nav-link" to="/categories">
                <Icon.BarChartFill /> <span>Categorias</span>
            </NavLink>
        </li>

        <li className="nav-item">
            <NavLink className="nav-link" to="/products">
                <Icon.Table /> <span>Productos</span>
            </NavLink>
        </li>

        <li className="nav-item">
            <a className="nav-link" href="http://localhost:8080" target="_blank">
            <Icon.Cart4 /><span> Innovatech Shop</span></a>
        </li>

        <hr className="sidebar-divider d-none d-md-block" />
        </ul>
    </>
  )
}

export default Sidebar