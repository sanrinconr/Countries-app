/**
 * Contenedor de la ventana /home
 * Incluye un searchBar encargado de buscar paises
 * y el container que trae los paises
 */
import SearchBar from "./SearchBar/SearchBar";
import ContainerPaises from "./ContainerPaises/ContainerPaises";
import "./Home.scss"
import Filtros from "./Filtros/Filtros";
import fetchPaises from "../../redux/actions/fetchPaises";
import { connect } from "react-redux";
import { useEffect } from "react";
function Home({cargarPaisesInicial}){
    useEffect(()=>{
        cargarPaisesInicial()
    },[])
    return <div className="home">
        <Filtros/>
        <SearchBar/>
        <ContainerPaises/>
    </div>
}

//Se cargaran los primeros 10 en redux
const mapDispatchToProps = (dispatch, ownProps) => ({
    cargarPaisesInicial: () => {
            dispatch(fetchPaises())
    }
})


export default connect(
null,
mapDispatchToProps
)(Home)