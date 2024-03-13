import logo from "../assets/images/Logo.png";
import { useState,useEffect } from "react";

const getImageURL = (name) => {
  return new URL(name, 'http://localhost:8080').href;
};

const ProductDetail = () => {
  const [lastProduct, setLastProduct] = useState({});

    useEffect(() => {
        const obtenerLastProduct = async () => {
          try {
            const res = await fetch( `http://localhost:8080/api/products` );
            const data = await res.json();
            const last = data.products[ data.products.length - 1 ];

            const resDetalle = await fetch( `http://localhost:8080/api/products/${last.idProduct}` );
            const dataDetalle = await resDetalle.json();
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
            Producto: {lastProduct.productName}
          </h5>
        </div>
        <div className="card-body text-dark">
          <div className="text-center">
            <img
              className="img-fluid px-3 px-sm-4"
              src={lastProduct.imagenes ? getImageURL(lastProduct.imagenes[0]) : logo}
              alt={lastProduct.productName}
              />
              <div className="row">
                {lastProduct && lastProduct.imagenes?.map((img, i) => {
                    return (
                    <div className="col" key={ i + img}>
                        <img className="img-fluid px-3 px-sm-4" src={getImageURL(img)} alt={lastProduct.productName + i} />
                    </div>
                    )
                })}
            
              </div> 
          </div>
          <p>ID: {lastProduct.idProduct}</p>
          <p>Nombre: {lastProduct.productName}</p>
          <p>Precio: ${lastProduct.originalPrice}</p>
          <p>Descuento: {lastProduct.onDiscount ? "Si" : "No"}</p>
          <p>Porcentaje de Descuento: {lastProduct.discount}%</p>
          <p>Producto Principal: {lastProduct.mainProduct ? "Si" : "No"}</p>
          <p>Descripcion: {lastProduct.description}</p>
          <p>Stock: {lastProduct.stock}</p>
          <p>Categoría: {lastProduct.category}</p>
          <p>Marca: {lastProduct.brand}</p>
           <p>Características:</p>
            <ul>
                {lastProduct && lastProduct.features?.map((feature, i) => {
                    return <li key={i}>{feature}</li>
                })}
            </ul>
            
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
