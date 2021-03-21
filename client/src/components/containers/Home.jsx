import BuscarPorNombre from "./BuscarPorNombre";
import ObtenerPaises from "./ObtenerPaises";
import "./Home.scss"
export default function Home(){
    return <div className="home">
        <BuscarPorNombre/>
        <ObtenerPaises/>
    </div>
}