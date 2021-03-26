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
import CardPais from "./CardPais/CardPais"

import "./ContainerPaises.scss"
import ButtonMasPaises from "../../common/ButtonMasPaises/ButtonMasPaises";
function ContainerPaises({paises, filtrosActuales, consultando}){

    function filtrarContinente(paises, continente){
        let salida =  []
        for(let pais of paises){
            if(continente === "Todos" || continente === pais.Continente){
                salida.push(<CardPais
                    key={pais.Id} 
                    id={pais.Id} 
                    nombre={pais.Nombre} 
                    continente={pais.Continente} 
                    bandera={pais.Bandera}/>)
            }
        }
        if(salida.length === 0 && consultando){
            return "Cargando..."
        }
        if(salida.length === 0){
            return "Oh!, intenta probar otro filtro o has una nueva consulta"
        }
        

       return salida
    }
    return <div>
            <div className="containerPaises">
            {filtrarContinente(paises, filtrosActuales.continente)}
            </div>
            <ButtonMasPaises/>
        </div>
}

//Para conocer que paises existen actualmente
const mapStateToProps = (state)=>{
    return state.paisesReducer
};

export default connect(
mapStateToProps,
)(ContainerPaises)