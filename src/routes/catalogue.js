const express = require("express")
const path = require("path")
const router = express.Router()
const catC = new (require("../controllers/catalogueController"))()
//const { body, validationResult } = require("express-validator")

/* GET home page. */
router.get("/", (req, res, next) => {
	catC.retrieveList().then((results) => {
		res.render("catalogue.ejs", { list: results })
	})
})

router.post("/newOggetto/", (req, res, next) => {
	catC.addOggetto(req.body)
	res.redirect("/cat")
})

router.put("/updateOggetto", (req, res, next) => {
	// catC.updateOggetto()
	res.redirect("/cat")
})

router.delete("/deleteOggetto", (req, res, next) => {
	catC.deleteOggetto(req.body.id)
	res.redirect("/cat")
})

router.get("/listOggetto", (req, res, next) => {
	catC.retrieveList().then((result) => res.json(result))
})

module.exports = router
