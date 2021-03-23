import { Link } from "react-router-dom";
import "./ButtonVolver.scss"
export default function ButtonVolver(){
    return <div className="containerButtonVolver">
        <Link to="/home">
        <input className="buttonVolver" type="button" value={`Volver \<`}></input>
    </Link>
    </div>
}