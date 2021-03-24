export default function Filtros(){
    return <div className="filtros">
        <div className="filtroAlfabetico">
            <button>Ascendentemente</button>
            <button>Descendentemente</button>
        </div>
        <div className="filtroContinente">
            <select className='select' name="temporada">
                <option value="">America del sur</option>
                <option value="">America del norte</option>
                <option value="">Europa</option>
                <option value="">Antartida</option>
            </select>
        </div>
        <div className="filtroActividades">
        <select className='select' name="temporada">
                <option value="test1">test1</option>
            </select>
        </div>
    </div>
}