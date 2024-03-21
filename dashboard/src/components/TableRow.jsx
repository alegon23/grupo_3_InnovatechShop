import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ChartRow = ({idProduct, productName, category, detalle}) => {
    return (
        <tr>
            <td>{idProduct}</td>
            <td>{productName}</td>
            <td>{category}</td>
            <td>
                <Link to={`/ProductDetail/${idProduct}`} className="btn btn-info" rel="nofollow">
                    {detalle}
                </Link>
            </td>
        </tr>
    )
}
    
    ChartRow.propTypes = {
        idProduct: PropTypes.number,
        productName: PropTypes.string,
        category: PropTypes.string,
        detalle: PropTypes.string
    }
    
    ChartRow.defaultProps = {
        idProduct: 0,
        productName: "",
        category: "",
        detalle: ""
    }
        

export default ChartRow;