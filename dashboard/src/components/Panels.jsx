import TopPanels from "./TopPanels"
import Categories from "./Categories"
import LastProduct from "./LastProduct"
import * as Icon from 'react-bootstrap-icons';
import ProductsList from "./ProductsList";

import {useState, useEffect} from 'react';
import Error404 from "./Error404";


const Panels = () => {
  const [cantProduct,setCantProduct] = useState(0);
  const [cantUser,setCantUser] = useState(0);
  const [cantCategory,setCategory] = useState(0);
  const [error, setError] = useState("");


    useEffect(() => {
        const obtenerCantidadProduct= async () => {
          try {
            const res = await fetch(
              `http://localhost:8080/api/products`
            );
            const data = await res.json();
            if (data.error) {
              setError('error')
            }
            setCantProduct(data.meta.count || 0);
            setCategory(data.meta.countByCategory.length || 0 );
          } catch (err) {
            setError(err.message)
          }
        };
        obtenerCantidadProduct();

        const obtenerCantidadUser= async () => {
          try {
            const res = await fetch(
              `http://localhost:8080/api/users`
            );
            const data = await res.json();

            setCantUser(data.meta.count || 0 );
          } catch (error) {
            console.log(error);
          }};

          obtenerCantidadUser();


      }, []);




  const topPanels = [
    { titulo: "Total de Productos", cifra: cantProduct, colorBorde: "info", icon: <Icon.Box size={35} color="rgba(0,0,0,0.2)"/>},
    { titulo: "Total de Usuarios", cifra: cantUser, colorBorde: "danger", icon: <Icon.People size={35} color="rgba(0,0,0,0.2)"/>},
    { titulo: "Total de Categorías", cifra: cantCategory, colorBorde: "warning", icon: <Icon.Grid size={35} color="rgba(0,0,0,0.2)"/>}
  ]

  if(error !== "") {
    return (
      <Error404/>
    )
  }

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