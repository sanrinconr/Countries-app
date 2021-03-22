import { useEffect, useState } from "react"
import "./CardDetallePais.scss"
export default function CardDetallePais({Id, Nombre, Continente, Bandera, Capital, SubRegion, Area, Poblacion, actividades, getDetalle}){
    useEffect(()=>{
        getDetalle()
    },[Id])
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
}