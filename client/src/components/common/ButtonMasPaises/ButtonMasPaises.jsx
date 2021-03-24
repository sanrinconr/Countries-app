import "./ButtonMasPaises.scss"
export default function ButtonMasPaises({fet, paginaSiguiente}){
    return <div className="containerMasElementos">
        <button className = "btn btnGray" onClick={()=>fet(paginaSiguiente)}>¡Mas paises!</button>
    </div>
}