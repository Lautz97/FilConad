const express = require("express")
const path = require("path")
const router = express.Router()
const catC = new (require("../controllers/catalogueController"))()
//const { body, validationResult } = require("express-validator")

/* GET home page. */
router.get("/", (req, res, next) => {
	res.render("catalogue.ejs", {})
})

router.post("/newOggetto/", (req, res, next) => {
	//val
	try {
		catC.addOggetto(req.body)
	} catch (error) {
		console.dir(error)
		res.redirect("/")
	} finally {
		res.redirect("/cat")
	}
})

router.get("/listOggetto", (req, res, next) => {
	const list = catC.retrieveList()
})

module.exports = router
