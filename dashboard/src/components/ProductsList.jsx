import TableRow from './TableRow';
import {useState, useEffect} from 'react';

const ProductsList = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const obtenerProductos = async () => {
          try {
            const res = await fetch(
              `http://localhost:8080/api/products`
            );
            const data = await res.json();
            setProductos(data.products || []);
          } catch (error) {
            console.log(error);
          }
        };

        obtenerProductos();
      }, []);
    return (
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Categoría</th>
                                <th>Detalle</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {
                            productos.map( ( producto ) => {
                                return <TableRow idProduct={producto.idProduct} productName={producto.productName} category={producto.category} detalle={producto.detalle} key={producto.idProduct+producto.productName}/>
                            })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default ProductsList;