import {connect} from "react-redux"
import fetchPaises from "../../redux/actions/fetchPaises";
import Paises from "./Paises";
const mapStateToProps = (state)=>{
        return state.paisesReducer
};

const mapDispatchToProps = (dispatch, ownProps) => ({
        fet: (paginaSiguiente) => {
                dispatch(fetchPaises(paginaSiguiente))
        }
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Paises)

//   function(props){
//     console.log(props)
//   return props.paises?.map(pais=>{
//       return <CardPais id="prueba" nombre="prueba" continente="wefw" bandera="wfe"/>
//   })
// }
