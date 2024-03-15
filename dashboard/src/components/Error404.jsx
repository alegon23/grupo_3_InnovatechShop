import { Player } from '@lottiefiles/react-lottie-player'
import { Link } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';

const Error404 = () => {
  return (
    <div className='d-flex flex-column w-100'>
        <Player
            autoplay
            loop
            src="https://lottie.host/a538a47c-cb07-47da-abb9-4b12264096df/8g91PuhCaN.json"
                 
            style={{
                height: "60vh",
                margin: "auto",
            }}
        ></Player>

        <div style={{fontSize: "22px", color: 'rgba(0,0,0,0.7)', textAlign: "center"}}>
            <h2 style={{color: "#9E8FFF"}}> Ingresaste una página no disponible <Icon.ExclamationTriangleFill /></h2>
            <h5>Puedes volver al home haciendo click <Link to="/" style={{color: "#9E8FFF"}}>aquí</Link> </h5>
        </div>
    </div>
  )
}  

export default Error404