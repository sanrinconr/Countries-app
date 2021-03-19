import "./CardPais.scss"
export default function CardPais({id, nombre, continente, bandera}){
    return <div className="cardPais">
        <div>
         <span>Id: {id}</span>
        </div>
        <div>
            <span>Nombre: {nombre}</span>
        </div>
        <div>
            <span>Continenete: {continente}</span>
        </div>
        <div>
            <span>Bandera: {bandera}</span>
        </div>
    </div>
}