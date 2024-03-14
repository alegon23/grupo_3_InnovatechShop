import PropTypes from 'prop-types';

const Error = ({msg}) => {
  return (
    <div>
        <h2 className='text-danger'>Oops! Ocurrió un error</h2>
        <h4>{msg}</h4>
    </div>
  )
}

Error.propTypes = {
    msg: PropTypes.string,
}
   

export default Error