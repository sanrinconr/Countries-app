import { connect } from "react-redux";
import fetchPaises from "../../../redux/actions/fetchPaises";
import "./ButtonMasPaises.scss"
function ButtonMasPaises({fet, paginaSiguiente, filtrosActuales}){
    return <div className="containerMasElementos">
        <button className = "btn btnGray" onClick={()=>fet(paginaSiguiente, filtrosActuales.orden)}>¡Mas paises!</button>
    </div>
}

const mapStateToProps = (state)=>{
    return state.paisesReducer
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    fet: (paginaSiguiente, orden) => {
            dispatch(fetchPaises(paginaSiguiente, orden))
    }
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(ButtonMasPaises)