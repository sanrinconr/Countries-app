const { Router } = require('express');
const {crearActividad, obtenerActividades} = require("./db")
const router = Router();

router.post("/", function(req,res){
    const {nombre, dificultad,duracion,temporada, paises} = req.body
    crearActividad(nombre,dificultad,duracion,temporada,paises)
    .then(resp=>{
        res.send(resp)
    })
})
router.get("/", function(req,res){
    obtenerActividades()
    .then(resp=>{
        console.log(resp)
        res.send(resp)
    })
    .catch(err=>res.send(err))
})


module.exports = router;
