import { useParams } from "react-router-dom";
import logo from "../assets/images/Logo.png";
import { useState, useEffect } from "react";
import Error404 from "./Error404";

const getImageURL = (name) => {
  return new URL(name, "http://localhost:8080").href;
};

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const resDetalle = await fetch(
          `http://localhost:8080/api/products/${id}`
        );
        const dataDetalle = await resDetalle.json();
        if (dataDetalle.error) {
          setError('error')
        }
        setProduct(dataDetalle.product || {});
      } catch (err) {
        setError(err.message)
      }
    };

    obtenerProducto();
  }, [id]);

  if(error != "") {
    return (
      <Error404/>
    )
  }

  return (
    <div className="mx-auto" style={{ maxWidth: "1200px" }}>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Producto: {product.productName}
          </h5>
        </div>
        <div className="card-body text-dark">
          <div className="text-center">
            <img
              className="img-fluid px-3 px-sm-4"
              src={product.imagenes ? getImageURL(product.imagenes[0]) : logo}
              alt={product.productName}
            />
            <div className="row">
              {product.imagenes?.map((img, i) => {
                  return (
                    <div className="col" key={i + img}>
                      <img
                        className="img-fluid px-3 px-sm-4"
                        src={getImageURL(img)}
                        alt={product.productName + i}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
          <p>ID: {product.idProduct}</p>
          <p>Nombre: {product.productName}</p>
          <p>Precio: ${product.originalPrice}</p>
          <p>Descuento: {product.onDiscount ? "Si" : "No"}</p>
          <p>Porcentaje de Descuento: {product.discount}%</p>
          <p>Producto Principal: {product.mainProduct ? "Si" : "No"}</p>
          <p>Descripcion: {product.description}</p>
          <p>Stock: {product.stock}</p>
          <p>Categoría: {product.category}</p>
          <p>Marca: {product.brand}</p>
          <p>Características:</p>
          <ul>
            {product.features?.map((feature, i) => {
                return <li key={i}>{feature}</li>;
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
