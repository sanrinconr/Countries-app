const { Router } = require('express');
const { models } = require('../sequelize/db');

const router = Router();

router.get("/", function(req,res){
    return res.send({mensaje:"Bienvenido a la api de paises",
            rutas:[{nombre:"/countries"},{nombre:"/actividad"}],
            autor:"sanrinconr"})
})

module.exports = router;
