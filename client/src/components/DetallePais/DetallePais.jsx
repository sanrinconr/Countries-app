import ButtonVolver from "./ButtonVolver/ButtonVolver";
import CardDetallePais from "./CardDetallePais/CardDetallePais";

export default function DetallePais({id}){
        return <div>
                <CardDetallePais id={id}/>
                <ButtonVolver/>
        </div>
}