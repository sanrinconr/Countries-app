import { useEffect, useState } from "react"
import "./CardDetallePais.scss"
export default function CardDetallePais({Id, Nombre, Continente, Bandera, Capital, SubRegion, Area, Poblacion, actividades, getDetalle}){
    const [lstActividades , setLstActividades] = useState("")
    useEffect(()=>{
        getDetalle()
        setLstActividades(
            actividades?.map(actividad=>{
            return actividad.Nombre
        }).join(", ")
        )
    },[])
    console.log(lstActividades)

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
            <span className="poblacion" >Actividades: {lstActividades}</span>
        </div>
        
    </div>
}