import ButtonVolver from "../common/ButtonVolver/ButtonVolver"
import FormNuevaActividad from "./FormNuevaActividad/FormNuevaActividad"
import "./NuevaActividad.scss"
export default function NuevaActividad(){
    return <div>
        <div className="containerNuevaActividad">
        <FormNuevaActividad/>
    </div>
    <ButtonVolver/>
    </div>
}