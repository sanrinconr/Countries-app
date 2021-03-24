import { Link } from "react-router-dom"
import "./NavBar.scss"
export default function NavBar(){
    return <div className="containerNavBar">
        <div className="tituloNavBar">
        <span>Paises</span>
        </div>
        <div className="opcionesNavBar">
            <Link to="/home">
                <span>Home</span>
            </Link>
            <Link to="/nuevaActividad">
                <span>Nueva actividad</span>
            </Link>
            
        </div>
    </div>
}