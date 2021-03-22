import {connect} from "react-redux"
import fetchPaisDetalle from "../../redux/actions/fetchDetallePais";
import CardDetallePais from "../views/CardDetallePais/CardDetallePais"
const mapStateToProps = (state)=>{
        return state.detallePaisReducer.pais
};

const mapDispatchToProps = (dispatch, ownProps) => ({
        getDetalle: () => {
            console.log(ownProps.id)
                dispatch(fetchPaisDetalle(ownProps.id))
        }
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CardDetallePais)

//   function(props){
//     console.log(props)
//   return props.paises?.map(pais=>{
//       return <CardPais id="prueba" nombre="prueba" continente="wefw" bandera="wfe"/>
//   })
// }
