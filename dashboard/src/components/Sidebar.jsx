import logo from "../assets/images/Logo-letras.png"
import * as Icon from 'react-bootstrap-icons';

const Sidebar = () => {
  return (
    <>
        <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">
        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
            <div className="sidebar-brand-icon">
                <img className="w-100" src={logo} alt="InnovatechShop Logo" style={{filter: "drop-shadow(3px 1px 0px black)"}}/>
            </div>
        </a>

        <hr className="sidebar-divider my-0" />

        <li className="nav-item active">
            <a className="nav-link" href="/">
                <Icon.Speedometer2 /> <span>Dashboard</span></a>
        </li>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Acciones</div>

        <li className="nav-item">
            <a className="nav-link collapsed" href="/">
                <Icon.FolderFill /> <span>Pages</span>
            </a>
        </li>

        <li className="nav-item">
            <a className="nav-link" href="/">
            <Icon.BarChartFill /> <span>Charts</span></a>
        </li>

        <li className="nav-item">
            <a className="nav-link" href="/">
            <Icon.Table /> <span>Tables</span></a>
        </li>

        <hr className="sidebar-divider d-none d-md-block" />
        </ul>
    </>
  )
}

export default Sidebar