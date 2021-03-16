const {Router} = require('express');
const {agregar10Primeros, buscarPais, buscarPorId} = require("./db")
const router = Router();
router.get("/", function (req, res) {
    if(!req.query.hasOwnProperty("name")){
       agregar10Primeros()
		.then((resp) => {
			res.send(resp)  
		})
    }else{
        buscarPais(req.query.name)
		.then(response=>res.send(response))
    }
})

router.get("/:idPais", function(req,res){
  buscarPorId(req.params.idPais)
  .then(resp=>res.send(resp))
})


module.exports = router;