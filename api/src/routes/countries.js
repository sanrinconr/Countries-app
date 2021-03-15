const { Router } = require('express');

const router = Router();

router.get("/", function(req,res){
    axios.get("https://restcountries.eu/rest/v2/all")
    .then(response=>console.log(response))
    res.send("Hola! soy la contries")
})

module.exports = router;
