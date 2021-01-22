const express = require("express")
const path = require("path")
const router = express.Router()
const catC = new (require("../controllers/catalogueController"))()
//const { body, validationResult } = require("express-validator")

/* GET home page. */
router.get("/", (req, res, next) => {
	res.render("catalogue.ejs", {})
})

router.post("/newOggetto/", (req, res) => {
	//val
	catC.addOggetto(req.body)
})

module.exports = router
