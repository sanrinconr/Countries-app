const {Router} = require('express');
const {cargarDatosDB,getPaises, buscarPaises, buscarPorId, getActividadesPais} = require("./db")
const router = Router();
router.get("/", function (req, res) {
    cargarDatosDB()
    .then(()=>{
      if(req.query.hasOwnProperty("name")){
        buscarPaises(req.query.name)
        .then(response=>{
          res.send(response)
        })
      }else if(req.query.hasOwnProperty("page")){
        getPaises(req.query.page)
        .then(resp=>{
          res.send(resp)
        })
      }else{
        getPaises(0)
        .then((resp) => {
          res.send(resp)
        })
      }
    })
   
})

router.get("/:idPais", async function(req,res){
  const pais = await buscarPorId(req.params.idPais)
  const actividades = await getActividadesPais(req.params.idPais)
  res.send({...pais, actividades:actividades})
})


module.exports = router;