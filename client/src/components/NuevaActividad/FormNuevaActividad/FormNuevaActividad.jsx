import { useEffect, useState } from "react"
import "./FormNuevaActividad.scss"
export default function FormNuevaActividad(){
    const [cantPais, setCantPais] = useState(1)
    const [paises, setPaises] = useState({0:{value:""}})
    const [inputActividad, setInputActividad] = useState({
        nombre: "",
        dificultad: "",
        duracion:"",
        temporada:"",
      })
      const [errors, setErrors] = useState()
      function handleChangeActividad(event){
        setInputActividad({
          ...inputActividad,
          [event.target.name]: event.target.value
        })
        // setErrors(validate({
        //   ...input,
        //   [event.target.name]: event.target.value
        // }))
      }
      function handleChangePais(event){
        //https://stackoverflow.com/questions/29537299/react-how-to-update-state-item1-in-state-using-setstate
        const {id} = event.target
        let original = {...paises}
        let elemento = {...paises[id]}
        elemento.value = event.target.value
        original[id] = elemento
        setPaises(original)
      }
      function nuevoSpanPais(e){
        e.preventDefault()
        let original = {...paises}
        let elemento = {...paises[cantPais]}
        elemento.value = ""
        original[cantPais] = elemento
        console.log(original)
        setPaises(original)
        setCantPais(cantPais+1)
      }
      return (
          <div className="formNuevaActividad" >
            <form >
                <div className="title">
                    <span>Nueva actividad</span>
                </div>
                <div className="paneles">
                    <div className="izquierda">
                        <div>
                            <input type="text"
                            //   className={errors.username ? 'danger':''} 
                            name="nombre" 
                            placeholder="Nombre"
                            value={inputActividad.nombre}
                            onChange={handleChangeActividad}/>
                        </div>
                        <div>
                            <input type="text"
                            //   className={errors.username ? 'danger':''} 
                            name="temporada" 
                            placeholder="Temporada"
                            value={inputActividad.temporada}
                            onChange={handleChangeActividad}/>
                        </div>
                        <div>
                            <input type="submit" 
                            value="Registrarse!"/>
                        </div>
                    </div>
                    <div className="derecha">
                        <div>
                            <input type="text"
                            // className={errors.password ? 'danger':''} 
                            name="dificultad"
                            placeholder="Dificultad"
                            value={inputActividad.dificultad}
                            onChange={handleChangeActividad}/>
                        </div>
                        <div>
                            <input type="text"
                            // className={errors.password ? 'danger':''} 
                            name="duracion"
                            placeholder="Duracion"
                            value={inputActividad.duracion}
                            onChange={handleChangeActividad}/>
                        </div>
                    </div>
                </div>
                <div className="paises">
                    <span>Paises</span>
                    {Object.keys(paises).map(claveId=>{
                        return <div key={claveId} >
                             <input type="text"
                             id={claveId}
                             key={claveId}
                            //  className={errors.password ? 'danger':''} 
                             name="pais"
                             placeholder="Pais"
                             value={paises[claveId].value}
                             onChange={handleChangePais}/>
                         </div>
                    })}
                    <div > <button className="nuevoPais" onClick={nuevoSpanPais}>+</button></div>
                </div>

          </form>
          </div>
      )
}