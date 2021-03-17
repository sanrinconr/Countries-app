import { Link } from "react-router-dom"
import playa from "./img/playa.jpg"
export default function Principal(){
    return <div>
        <img src={playa} width="500" height="300"/>
        <Link to="/home">
            <button>¡Empezar!</button>
        </Link>
    </div>
}