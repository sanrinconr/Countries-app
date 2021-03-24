import {useState } from "react"
import axios from "axios"
import "./FormNuevaActividad.scss"
export default function FormNuevaActividad(){
    const [cantPais, setCantPais] = useState(1)
    const [paises, setPaises] = useState({0:{value:""}})
    const [inputActividad, setInputActividad] = useState({
        nombre: "cala",
        dificultad: "1",
        duracion:"250",
        temporada:"verano",
      })
      function handleChangeActividad(event){
        setInputActividad({
          ...inputActividad,
          [event.target.name]: event.target.value
        })
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

      function guardarActividad(e){
          e.preventDefault()
        const {nombre, dificultad,duracion,temporada} = inputActividad
        axios.post(process.env.REACT_APP_URL_API+"activity",{
            nombre, dificultad,duracion,temporada,paises:Object.keys(paises).map(claveId=>{
                return paises[claveId].value
            })
        })
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err.data))
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
                            <label> Temporada: </label>
                            <select name="temporada" onChange={handleChangeActividad} value={inputActividad.temporada}>
                                <option value="verano">Verano</option>
                                <option value="otoño">Otoño</option>
                                <option value="invierno">Invierno</option>
                                <option value="primavera">Primavera</option>
                            </select>
                        </div>
                    </div>
                    <div className="derecha">
                        <div>
                        <label> Dificultad: </label>
                            <select name="dificultad" onChange={handleChangeActividad} value={inputActividad.dificultad}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div>
                            <input type="text"
                            // className={errors.password ? 'danger':''} 
                            name="duracion"
                            placeholder="Duracion (dias)"
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
                <div>
                    <input onClick={guardarActividad} type="submit" value="Crear actividad!"/>
                </div>

          </form>
          </div>
      )
}