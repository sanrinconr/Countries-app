import { connect } from "react-redux";
import fetchPaises from "../../../redux/actions/fetchPaises";
import "./ButtonMasPaises.scss"

function ButtonMasPaises({fet}){
    function handleClick(e){
        e.preventDefault();
        fet()
    }
    return <div className="containerMasElementos">
        <button className = "btn btnGray" onClick={handleClick}>¡Mas paises!</button>
    </div>
}

const mapStateToProps = (state)=>{
    return state.paisesReducer
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    fet: () => {
            dispatch(fetchPaises())
    }
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(ButtonMasPaises)