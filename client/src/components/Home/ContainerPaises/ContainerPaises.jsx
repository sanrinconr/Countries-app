/**
 * Este contenedor se encarga de renderizar cada card de pais
 * 
 * Explicacion sobre pagina siguiente:
 * El back devuelve de a 10 paises por pagina, de modo que se tiene la pagina 0,1,2,3,4....
 * en redux se va guardando la pagina siguiente a consultar por lo que al 
 * llamar la funcion de traer paises se le pasa este parametro pagina siguiente
 * si la consulta fue correcta en redux este valor cambia +1 logrando asi un paginado dinamico tipo
 * instagram
 */
import {connect} from "react-redux"
import { useEffect } from "react"
import fetchPaises from "../../../redux/actions/fetchPaises";
import CardPais from "./CardPais/CardPais"

import "./ContainerPaises.scss"
import ButtonMasPaises from "../../common/ButtonMasPaises/ButtonMasPaises";
function ContainerPaises({fet, paises, filtroContinentes}){
    useEffect(()=>{
        //Como se ejecuta una sola vez pues se dejan valores fijos
        fet(0, "ASC")
    },[])

    if(Array.isArray(paises)){
        return <div>
        <div className="containerPaises">
        {paises?.map(pais=>{
            if(filtroContinentes !== "Todos"){
                if(filtroContinentes === pais.Continente){
                    return  <CardPais
                    key={pais.Id} 
                    id={pais.Id} 
                    nombre={pais.Nombre} 
                    continente={pais.Continente} 
                    bandera={pais.Bandera}/>
                    }
            }else{
                return  <CardPais
                key={pais.Id} 
                id={pais.Id} 
                nombre={pais.Nombre} 
                continente={pais.Continente} 
                bandera={pais.Bandera}/>
            }
            }
            
        )}
        </div>
        <ButtonMasPaises/>
    </div>
    }else{
        return <div>
            Error
        </div>
    }
    
}

//Para conocer que paises existen actualmente
const mapStateToProps = (state)=>{
    return state.paisesReducer
};
//Para poder pedir los primeros 10 paises
const mapDispatchToProps = (dispatch, ownProps) => ({
    fet: (paginaSiguiente, orden) => {
            dispatch(fetchPaises(paginaSiguiente, orden))
    }
})


export default connect(
mapStateToProps,
mapDispatchToProps
)(ContainerPaises)