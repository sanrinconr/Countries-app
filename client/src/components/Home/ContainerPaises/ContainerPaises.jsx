import {connect} from "react-redux"
import { useEffect } from "react"
import fetchPaises from "../../../redux/actions/fetchPaises";
import CardPais from "./CardPais/CardPais"

import "./ContainerPaises.scss"
function ContainerPaises(props){
    useEffect(()=>{
        props.fet(props.paginaSiguiente)
    },[])

    if(Array.isArray(props.paises)){
        return <div>
        <div className="containerPaises">
        {props.paises?.map(pais=>{
            return  <CardPais
            key={pais.Id} 
            id={pais.Id} 
            nombre={pais.Nombre} 
            continente={pais.Continente} 
            bandera={pais.Bandera}/>
            }
        )}
        </div>
        <div className="containerMasElementos">
        <button className = "btn btnGray" onClick={()=>props.fet(props.paginaSiguiente)}>¡Mas paises!</button>
        </div>
    </div>
    }else{
        return <div>
            Error
        </div>
    }
    
}

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
)(ContainerPaises)