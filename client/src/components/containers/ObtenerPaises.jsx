import { useEffect } from "react";
import {connect} from "react-redux"
import fetchPaises from "../../redux/actions/paises";
import CardPais from "../views/CardPais/CardPais"
const mapStateToProps = (state)=>{
        return state
};

const mapDispatchToProps = (dispatch, ownProps) => ({
        fet: () => {
                dispatch(fetchPaises())
        }
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(function(props){
    useEffect(()=>{
        props.fet()
    },[])

    if(Array.isArray(props.paises)){
        return <div>
        {props.paises?.map(pais=><CardPais key={pais.Id} id={pais.Id} nombre={pais.Nombre} continente={pais.Continente} bandera={pais.Bandera}/>)}
    </div>
    }else{
        return <div>
            Error
        </div>
    }
    
})

//   function(props){
//     console.log(props)
//   return props.paises?.map(pais=>{
//       return <CardPais id="prueba" nombre="prueba" continente="wefw" bandera="wfe"/>
//   })
// }
