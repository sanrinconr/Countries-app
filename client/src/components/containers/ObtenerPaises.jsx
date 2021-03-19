import {connect} from "react-redux"
import CardPais from "../views/CardPais/CardPais"
const mapStateToProps = (state)=>{
        return state
};
// const mapDispatchToProps = (dispatch, ownProps) => ({
//         addPaises: (paises) => {
//                 dispatch(cargarPaises(paises))
//         }
// })
      
export default connect(
    mapStateToProps,
    null
  )(function({paises}){
    return paises?.map(pais=>{
        return <CardPais id="prueba" nombre="prueba" continente="wefw" bandera="wfe"/>
    })
  })
