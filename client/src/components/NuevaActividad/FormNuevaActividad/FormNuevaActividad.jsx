import { useState } from "react"
import "./FormNuevaActividad.scss"
export default function FormNuevaActividad(){
    const [input, setInput] = useState({
        nombre: "",
        dificultad: "",
        duracion:"",
        temporada:"",
        paises:[]
      })
      const [errors, setErrors] = useState({})
      function handleChange(event){
        setInput({
          ...input,
          [event.target.name]: event.target.value
        })
        // setErrors(validate({
        //   ...input,
        //   [event.target.name]: event.target.value
        // }))
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
                            value={input.nombre}
                            onChange={handleChange}/>
                        </div>
                        <div>
                            <input type="text"
                            //   className={errors.username ? 'danger':''} 
                            name="temporada" 
                            placeholder="Temporada"
                            value={input.temporada}
                            onChange={handleChange}/>
                        </div>
                        <div>
                            <input type="submit" 
                            value="Registrarse!"/>
                        </div>
                    </div>
                    <div className="derecha">
                        <div>
                            <input type="text"
                            className={errors.password ? 'danger':''} 
                            name="dificultad"
                            placeholder="Dificultad"
                            value={input.dificultad}
                            onChange={handleChange}/>
                        </div>
                        <div>
                            <input type="text"
                            className={errors.password ? 'danger':''} 
                            name="duracion"
                            placeholder="Duracion"
                            value={input.duracion}
                            onChange={handleChange}/>
                        </div>
                    </div>
                </div>
                <div className="paises">
                    <span>Paises</span>
                    <div>
                            <input type="text"
                            className={errors.password ? 'danger':''} 
                            name="nombrePais"
                            placeholder="Pais"
                            value={input.nombrePais}
                            onChange={handleChange}/>
                    </div>
                    
                    <div > <button className="nuevoPais">+</button></div>
                </div>

          </form>
          </div>
      )
}