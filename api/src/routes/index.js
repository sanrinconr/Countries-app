const { Router } = require('express');

const router = Router();

router.get("/", function(req,res){
    res.send("Hola! soy la principal")
})



module.exports = router;
