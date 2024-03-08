const Categories = () => {
    const categories = ["Celulares", "Monitores", "Tablets", "Notebooks", "Hardware", "Accesorios"];
    
      return (
        <div className="col-lg-6 mb-4">						
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Categorías en la Base de Datos</h5>
                </div>
                <div className="card-body">
                    <div className="row">
    
                        { categories.map( (genre, index) => 
                            <div className="col-lg-6 mb-4" key={index}>
                                <div className="card bg-dark text-white shadow">
                                    <div className="card-body text-center">
                                        {genre}
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