import { useEffect } from "react";
import {connect} from "react-redux"
import fetchPaises from "../../redux/actions/paises";
import CardPais from "../views/CardPais/CardPais"
const mapStateToProps = (state)=>{
        return state
};

const mapDispatchToProps = (dispatch, ownProps) => ({
        fet: (paginaSiguiente) => {
                dispatch(fetchPaises(paginaSiguiente))
        }
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(function(props){
    useEffect(()=>{
        props.fet(props.paginaSiguiente)
    },[])

    if(Array.isArray(props.paises)){
        return <div>
        <button onClick={()=>console.log(props.paginaSiguiente)}>Ver posSiguiente</button>
        {props.paises?.map(pais=><CardPais key={pais.Id} id={pais.Id} nombre={pais.Nombre} continente={pais.Continente} bandera={pais.Bandera}/>)}
        <button onClick={()=>props.fet(props.paginaSiguiente)}>Dame mas</button>

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
