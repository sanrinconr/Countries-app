const {Router} = require('express');
const {agregar10Primeros, buscarPaises, buscarPorId, getActividadesPais} = require("./db")
const router = Router();
router.get("/", function (req, res) {
    if(!req.query.hasOwnProperty("name")){
       agregar10Primeros()
		.then((resp) => {
			res.send(resp)
		})
    }else{
        buscarPaises(req.query.name)
		.then(response=>res.send(response))
    }
})

router.get("/:idPais", async function(req,res){
  const pais = await buscarPorId(req.params.idPais)
  const actividades = await getActividadesPais(req.params.idPais)
  res.send({...pais, actividades:actividades})
})


module.exports = router;