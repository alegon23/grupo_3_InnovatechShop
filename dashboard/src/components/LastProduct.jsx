import logo from "../assets/images/Logo.png";
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Error404 from './Error404';

const getImageURL = (name) => {
  return new URL(name, 'http://localhost:8080').href;
};

const LastProduct = () => {
  const [lastProduct, setLastProduct] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerLastProduct = async () => {
      try {
        const res = await fetch( `http://localhost:8080/api/products` );
        const data = await res.json();
        const last = data.products[ data.products.length - 1 ];

        const resDetalle = await fetch( `http://localhost:8080/api/products/${last.idProduct}` );
        const dataDetalle = await resDetalle.json();
        if (dataDetalle.error) {
          setError('error')
        }
        setLastProduct(dataDetalle.product || {})
      } catch (err) {
        setError(err.message)
      }
    };
    
    obtenerLastProduct();
  }, []);

  if(error !== "") {
    return (
      <Error404/>
    )
  }

  return (
    <div className="col-lg-6 mb-4 mx-auto">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Último producto en la Base de Datos
          </h5>
        </div>
        <div className="card-body">
          <div className="text-center">
            <img
              className="img-fluid px-3 px-sm-4"
              src={lastProduct.imagenes ? getImageURL(lastProduct.imagenes[0]) : logo}
              alt={lastProduct.productName}
              /> 
              <p className="h4 "><mark><u>{lastProduct.productName}</u></mark></p>
          </div>
          <p>{lastProduct.description}</p>
          
          <Link to={`/ProductDetail/${lastProduct.idProduct}`} className="btn btn-danger" rel="nofollow">
            Ver detalle del producto
          </Link>
          
          
        </div>
      </div>
    </div>
  );
};

export default LastProduct;
