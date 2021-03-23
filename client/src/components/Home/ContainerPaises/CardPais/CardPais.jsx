/**
 * Elemento encargado de renderizar todos los detalles de la card
 * de un pais
 */
import {NavLink} from "react-router-dom"
import "./CardPais.scss"
export default function CardPais({id, nombre, continente, bandera}){
        return <NavLink to={`/paises/${id}`} activeStyle={{
                fontWeight: "bold",
                color: "red"
                 }}>
                <div className="cardPais">
                <img className="banderaCard" alt="" src={bandera}/>
                <span  className="nombreCard">{nombre} ({id})</span>
                <span className="continenteCard">{continente}</span>
                </div>
        </NavLink>

    
}