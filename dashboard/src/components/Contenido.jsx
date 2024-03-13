import Panels from "./Panels"
import Footer from "./Footer"
import Topbar from "./Topbar"



const Contenido = () => {
  return (
    <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
            <Topbar />
            <Panels />
        </div>
        <Footer/>

    </div>
  )
}

export default Contenido