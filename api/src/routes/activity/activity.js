const { Router } = require('express');
const {crearActividad, obtenerActividades, eliminarActividad} = require("./db")
const router = Router();

router.post("/", function(req,res){
    const {nombre, dificultad,duracion,temporada, paises} = req.body
    crearActividad(nombre,dificultad,duracion,temporada,paises)
    .then(resp=>{
        res.send(resp)
    })
})

router.post("/delete", function(req,res){
    const {nombre} = req.body    
    eliminarActividad(nombre)
    .then(resp=>res.send({registrosEliminados:resp}))
    .catch(err=>res.send({error:"Error al borrar activdades", details:err}))
})

router.get("/", function(req,res){
    obtenerActividades()
    .then(resp=>{
        res.send(resp)
    })
    .catch(err=>res.send(err))
})


module.exports = router;
