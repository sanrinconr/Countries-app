import SearchBar from "./SearchBar/SearchBar";
import ContainerPaises from "./ContainerPaises/ContainerPaises";
import "./Home.scss"
export default function Home(){
    return <div className="home">
        <SearchBar/>
        <ContainerPaises/>
    </div>
}