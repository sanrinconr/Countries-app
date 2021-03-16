const {Router} = require('express');
const {agregar10Primeros, buscarPais} = require("./db")
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





router.get("/")
module.exports = router;