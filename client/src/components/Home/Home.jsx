/**
 * Contenedor de la ventana /home
 * Incluye un searchBar encargado de buscar paises
 * y el container que trae los paises
 */
import SearchBar from "./SearchBar/SearchBar";
import ContainerPaises from "./ContainerPaises/ContainerPaises";
import "./Home.scss"
import Filtros from "./Filtros/Filtros";
export default function Home(){
    return <div className="home">
        <SearchBar/>
        <Filtros/>
        <ContainerPaises/>
    </div>
}