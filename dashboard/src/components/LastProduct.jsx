import logo from "../assets/images/Logo.png";

import {useState, useEffect} from 'react';

const LastProduct = () => {
 

  const [lastProduct, setLastProduct] = useState({});

    useEffect(() => {
        const obtenerLastProduct = async () => {
          try {
            const res = await fetch(
              `http://localhost:8080/api/products`
            );
            const data = await res.json();
       
            const last=data.products[data.products.length-1];

            console.log(last);

            const resDetalle = await fetch(
              `http://localhost:8080/api/products/${last.idProduct}`
            );
            const dataDetalle = await resDetalle.json();

            console.log(dataDetalle);
            setLastProduct(dataDetalle.product || {})
            
          } catch (error) {
            console.log(error);
          }
        };
        
        obtenerLastProduct();

       
      }, []);
  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Último producto en la Base de Datos
          </h5>
        </div>
        {lastProduct &&  
        <div className="card-body">
          <div className="text-center">
            <img
              className="img-fluid px-3 px-sm-4 mt-3 mb-4"
              src={lastProduct.imagenes ? lastProduct.imagenes[0] : logo}
              alt={lastProduct.productName}
        /> 
           
          </div>
          <p>{lastProduct.description}</p>
          <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">
            Ver detalle del producto
          </a>
        </div>}
      </div>
    </div>
  );
};

export default LastProduct;
