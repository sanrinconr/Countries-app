const { Router } = require('express');
const { models } = require('../sequelize/db');

const router = Router();

router.get("/", function(req,res){
    return res.send("Hola! soy la pagina principal")
    models.Actividad.create({
        Nombre:"Prueba",
        Dificultad:"5",
        Duracion:"100",
        Temporada:"Invierno",
        Pais:[{
            Id:"ESP",
            Nombre:"España",
            Continente:"UE",
            Capital:"Madrid"
        },
        {
            Id:"FRA",
            Nombre:"Francia",
            Continente:"UE",
            Capital:"Paris"
        }]
    },{include:[models.Pais]})
    .then(()=>res.send("Creado!"))
    .catch((err)=>{
        console.log(err)
        res.send("Error")
    })
})

router.get("/separado",async function(req,res){
    let pais = await models.Pais.findOrCreate({
        where:{
            Id:"FRA",
        },
        defaults:{
            Id:"FRA",
            Nombre:"Francias",
            Continente:"UE",
            Capital:"Paris"
        } 
    })
    let actividad = await models.Actividad.findOrCreate({
        where:{
            Nombre:"Prueba"
        },
        defaults:{
            Nombre:"Prueba",
        Dificultad:"5",
        Duracion:"100",
        Temporada:"Invierno",
        }
    })
    console.log(pais[0].addActividad(actividad[0]))
    //let a = await pais[0].setActividad(actividad[0])

    res.send("wef")

})



module.exports = router;
