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
        <button onClick={()=>props.fet(props.paginaSiguiente)}>Dame mas</button>
    </div>
    }else{
        return <div>
            Error
        </div>
    }
    
}