import TopPanels from "./TopPanels"
import Categories from "./Categories"
import LastProduct from "./LastProduct"
import * as Icon from 'react-bootstrap-icons';
import ProductsList from "./ProductsList";


const Panels = () => {
  const topPanels = [
    { titulo: "Total de Productos", cifra: 21, colorBorde: "info", icon: <Icon.Box size={35} color="rgba(0,0,0,0.2)"/>},
    { titulo: "Total de Usuarios", cifra: 79, colorBorde: "danger", icon: <Icon.People size={35} color="rgba(0,0,0,0.2)"/>},
    { titulo: "Total de Categorías", cifra: 49, colorBorde: "warning", icon: <Icon.Grid size={35} color="rgba(0,0,0,0.2)"/>}
  ]

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">InnovatechShop Dashboard</h1>
        </div>

        <div className="row">
          {topPanels.map((content, index) => 
              <TopPanels
                key = {index + content}
                titulo = {content.titulo}
                cifra = {content.cifra}
                colorBorde = {content.colorBorde}
                icono = {content.icon}
                />
            )}
        </div>
        
        <div className="row">
            <LastProduct />
            <Categories />
        </div>
            <ProductsList />
    </div>
  )
}

export default Panels