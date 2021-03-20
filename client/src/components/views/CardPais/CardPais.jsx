import "./CardPais.scss"
import prueba from "./img/ala.svg"
export default function CardPais({id, nombre, continente, bandera}){
    return <div className="cardPais">
         <span  className="nombreCard">{nombre} ({id})</span>
         <img className="banderaCard" alt="" src={prueba}/>
         <span className="continenteCard">Continenete: {continente}</span>

</div>
}