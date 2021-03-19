import {connect} from "react-redux"
import fetchPaisesNombre from "../../redux/actions/fetchPaisesNombre";
import SearchBar from "../views/SearchBar/SearchBar";
const mapStateToProps = (state)=>{
        return state
};

const mapDispatchToProps = (dispatch, ownProps) => ({
        obtenerPaisesPorNombre: (nombre) => {
                dispatch(fetchPaisesNombre(nombre,0))
        }
})


export default connect(
    null,
    mapDispatchToProps
  )(SearchBar)

//   function(props){
//     console.log(props)
//   return props.paises?.map(pais=>{
//       return <CardPais id="prueba" nombre="prueba" continente="wefw" bandera="wfe"/>
//   })
// }
