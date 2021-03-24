
/**
 * Contenedor de toda la ventana de detalle pais
 * Incluye la tarjeta del detalle del pais
 * y tambien tiene el boton volver como parametro
 * 
 * Sobre CardDetallePais, el id que recibe es el pasado como parametro en la URL
 */
import ButtonVolver from "../common/ButtonVolver/ButtonVolver";
import CardDetallePais from "./CardDetallePais/CardDetallePais";

import "./DetallePais.scss"
export default function DetallePais({id}){
        return <div className="containerDetallePais">
                <CardDetallePais id={id}/>
                <ButtonVolver/>
        </div>
}