import PropTypes from 'prop-types';

const TopPanels = ({titulo, cifra, colorBorde, icono}) => {

  return (
    <div className="col-md-4 mb-4">
            <div className={`card shadow border-left-${colorBorde} h-100 py-2`}>
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">{titulo}</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{cifra}</div>
                        </div>
                        <div className="col-auto">
                            {icono}
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

TopPanels.propTypes = {
    titulo: PropTypes.string.isRequired,
    colorBorde: PropTypes.oneOf(["primary", "success", "warning", "danger", "info"]),
    cifra: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    icono: PropTypes.element
}

TopPanels.defaultProps = {
    titulo: "N/A",
    colorBorde: "danger",
    cifra: "N/A",
    icono: ""
}

export default TopPanels