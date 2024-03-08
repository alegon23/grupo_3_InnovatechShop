import logo from "../assets/images/Logo.png";

const LastProduct = () => {
  const lastProduct = {
    imagen: logo,
    alt: "Logo",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, consequatur explicabo officia inventore libero veritatis iure voluptate reiciendis a magnam, vitae, aperiam voluptatum non corporis quae dolorem culpa citationem ratione aperiam voluptatum non corporis ratione aperiam voluptatum quae dolorem culpa ratione aperiam voluptatum?",
  };

  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Último producto en la Base de Datos
          </h5>
        </div>
        <div className="card-body">
          <div className="text-center">
            <img
              className="img-fluid px-3 px-sm-4 mt-3 mb-4"
              src={lastProduct.imagen}
              alt={lastProduct.alt}
            />
          </div>
          <p>{lastProduct.descripcion}</p>
          <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">
            Ver detalle del producto
          </a>
        </div>
      </div>
    </div>
  );
};

export default LastProduct;
