import {connect} from "react-redux"
import { useEffect } from "react"
import fetchPaisDetalle from "../../../redux/actions/fetchDetallePais"

import "./CardDetallePais.scss"

function CardDetallePais({Id, Nombre, Continente, Bandera, Capital, SubRegion, Area, Poblacion, actividades, getDetalle}){
    useEffect(()=>{
        getDetalle()
    },[Id])
    if(actividades){
        return <div className="containerCardDetallePais">
        <div className="header">
            <span>{Nombre}</span>
            <img src={Bandera} alt=""/>
        </div>
        <div className="data">
            <span className="continente">Continente: {Continente}</span>
            <span  className="capital" >Capital: {Capital}</span>
            <span className="subregion" >SubRegion: {SubRegion}</span>
            <span className="area" >Area: {Area}</span>
            <span className="poblacion" >Poblacion: {Poblacion}</span>
            <span className="actividad" >Actividades: {actividades?.map(act=>act.Nombre).join(", ")}</span>
        </div>
    </div>
    }else{
        return "Cargando"
    }
}


const mapStateToProps = (state)=>{
        return state.detallePaisReducer.pais
};

const mapDispatchToProps = (dispatch, ownProps) => ({
        getDetalle: () => {
                dispatch(fetchPaisDetalle(ownProps.id))
        }
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CardDetallePais)

