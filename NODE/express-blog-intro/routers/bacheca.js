//operazioni CRUD (per avere il  completo controllo sulla nostra applicazione) - create, read, update, delete

const express = require("express")
const router = express.Router()
const postController = require("../controllers/postControllers")

const checkTimeMiddleware = require("../middlewares/checkTime")

//Middleware per router
app.use(checkTimeMiddleware); 
//si può anche specificare una rotta specifica 
//router.get("/",checkTimeMiddleware, postController.index)

//index
router.get("/", postController.index); 

//show by titolo
router.get("/titolo/:titolo", postController.showByTitolo);

//show by id
router.get("/:id", postController.showById);

//delete
router.delete("/:id", postController.destroy);

//store
router.post("/" , postController.store);

//modifica totale (praticamnete sostituisci, va inserito un oggetto completo)
router.put("/:id" , postController.update);

//modifica parziale
router.patch("/:id" , postController.modify);

module.exports = router; //i dati vanno esportati