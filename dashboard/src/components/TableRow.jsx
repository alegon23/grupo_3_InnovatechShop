import PropTypes from 'prop-types';

const ChartRow = ({Title, Length, Rating, Categories, Awards}) => {
    return (
                <tr>
                    <td>{Title}</td>
                    <td>{Length}</td>
                    <td>{Rating}</td>
                    <td>
                        <ul>
                            {Categories.map( (category,i) => 
                                <li key={`category ${i}`}>{category}</li>
                            )}
                        </ul>
                    </td>
                    <td>{Awards}</td>
                </tr>
            )
    }
    
    ChartRow.propTypes = {
        Title: PropTypes.string.isRequired,
        Length: PropTypes.string,
        Rating: PropTypes.string,
        Categories: PropTypes.array,
        Awards: PropTypes.number
    }
    
    ChartRow.defaultProps = {
        Title: "",
        Length: "",
        Rating: "",
        Categories: [],
        Awards: 0
    }
        

export default ChartRow;