const {Router} = require('express');
const {cargarDatosDB,getPaises, buscarPorId, getActividadesPais} = require("./db")
const router = Router();
router.get("/", function (req, res) {
    cargarDatosDB()
    .then(()=>{
      if(req.query.hasOwnProperty("page")){
        getPaises(req.query.page, req.query.orden, req.query.actividad, req.query.nombre)
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