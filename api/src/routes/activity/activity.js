const { Router } = require('express');

const router = Router();

router.post("/", function(req,res){
    res.send(req.body)
})

module.exports = router;
