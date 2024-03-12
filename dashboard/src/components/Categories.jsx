import {useState, useEffect} from 'react';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const obtenerCategorias = async () => {
          try {
            const res = await fetch(
              `http://localhost:8080/api/products`
            );
            const data = await res.json();
            setCategories(data.meta.countByCategory || []);
          } catch (error) {
            console.log(error);
          }
        };

        obtenerCategorias();
      }, []);
    
      return (
        <div className="col-lg-6 mb-4">						
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Categorías en la Base de Datos</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        { categories.map( (objeto, index) => 
                            <div className="col-lg-6 mb-4" key={index + objeto.categoria}>
                                <div className="card bg-dark text-white shadow">
                                    <div className="card-body text-center">
                                        {objeto.categoria}: {objeto.cantidad}
                                    </div>
                                </div>
                            </div>
                         ) }
                    </div>
                </div>
            </div>
        </div>
      )
    }
    
    export default Categories