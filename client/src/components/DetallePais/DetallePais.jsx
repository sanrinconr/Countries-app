import ButtonVolver from "./ButtonVolver/ButtonVolver";
import CardDetallePais from "./CardDetallePais/CardDetallePais";

import "./DetallePais.scss"
export default function DetallePais({id}){
        return <div className="containerDetallePais">
                <CardDetallePais id={id}/>
                <ButtonVolver/>
        </div>
}