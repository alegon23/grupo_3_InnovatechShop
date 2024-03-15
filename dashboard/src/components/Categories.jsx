import {useState, useEffect} from 'react';
import Error404 from './Error404';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const obtenerCategorias = async () => {
          try {
            const res = await fetch(
              `http://localhost:8080/api/products`
            );
            const data = await res.json();
            setCategories(data.meta.countByCategory || []);
          } catch (err) {
            setError(err.message)
          }
        };

        obtenerCategorias();
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
                    <h5 className="m-0 font-weight-bold text-gray-800">Categorías en la Base de Datos</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        { categories.map( (objeto, index) => 
                            <div className="col-lg-12 mb-4" key={index + objeto.categoria}>
                                <div className="card text-dark shadow" style={{border: 'solid 3px #9E8FFF'}}>
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