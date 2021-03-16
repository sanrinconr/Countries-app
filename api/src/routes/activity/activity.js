const { Router } = require('express');
const {crearActividad} = require("./db")
const router = Router();

router.post("/", function(req,res){
    const {nombre, dificultad,duracion,temporada} = req.body
    crearActividad(nombre,dificultad,duracion,temporada)
    .then(resp=>res.send(resp))
})


module.exports = router;
