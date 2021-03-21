import { useEffect } from "react"
import CardPais from "../views/CardPais/CardPais"
import "./Paises.scss"
export default function Paises(props){
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