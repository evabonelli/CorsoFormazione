const express = require("express")
const router  = express.Router()
const filmControllers = require("../controllers/filmControllers")

router.get("/", filmControllers.index);

router.get("/:id", filmControllers.filmById);

router.post("", filmControllers.addFilm);

router.delete("/:id", filmControllers.deleteFilm);

router.put("/:id", filmControllers.sostituisciFilm);

router.patch("/:id", filmControllers.modificaFilm);

module.exports = router;