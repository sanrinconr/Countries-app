import { useEffect, useState } from "react"
import "./CardPais.scss"
import prueba from "./img/ala.svg"
import axios from "axios"
export default function CardPais({id, nombre, continente, bandera}){
   

        return <div className="cardPais">
        <img className="banderaCard" alt="" src={bandera}/>
        <span  className="nombreCard">{nombre} ({id})</span>
        <span className="continenteCard">{continente}</span>
        </div>

    
}