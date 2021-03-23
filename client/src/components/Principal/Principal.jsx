/**
 * Pagina inicial de la aplicacion
 * 
 * Se utiliza la etiqueta picture y source para asi tener la posibilidad de
 * mostrar una imagen adecuada dependiendo el tamaño del display del cliente 
 */
import { Link } from "react-router-dom"
import playaMedium from "./img/playaMedium.jpg"
import playaSmall from "./img/playaSmall.jpg"
import playaLarge from "./img/playaLarge.jpg"

import "./Principal.scss"
export default function Principal(){
    return <div className ="containerPrincipal">
        <picture>
        <source media="(max-width:700px)" srcSet={playaSmall}/>
        <source media="(max-width:1400px)" srcSet={playaMedium}/>
        <img alt="" src={playaSmall} />
        </picture>
        <Link to="/home">
            <button className="botonPresentacion" >¡Empezar!</button>
        </Link>
        
    </div> 

}