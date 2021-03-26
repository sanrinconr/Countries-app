/**
 * Boton empleado para volver a la pagina principal /home
 */
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { cleanPaisesDetalle } from "../../../redux/actions/limpiar";
import "./ButtonVolver.scss"
function ButtonVolver({limpiarDetalle}){
 
    return <div className="containerButtonVolver">
        <Link to="/home">
        <input onClick={limpiarDetalle} className="buttonVolver" type="button" value={`Volver <`}></input>
    </Link>
    </div>
}


const mapDispatchToProps = (dispatch, ownProps) => ({
    limpiarDetalle: () => {
            dispatch(cleanPaisesDetalle())
    }
})

export default connect(
    null,
    mapDispatchToProps
    )(ButtonVolver)