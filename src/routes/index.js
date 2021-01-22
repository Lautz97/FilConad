const express = require("express")
const path = require("path")
const router = express.Router()
const config = require("../config")

router.all("/*/", (req, res, next) => {
	console.dir(`requested: ` + req.url + `    ` + `with method: ` + req.method)
	next()
})

/* GET home page. */
router.get("/", (req, res, next) => {
	res.render("index.ejs", {})
})

router.get("/dump", (req, res, next) => {
	res.render("dumpster.ejs", {})
})
router.post("/dump", (req, res, next) => {
	new (require("../controllers"))().dropper(req.body.nomeCollezione)
	res.render("dumpster.ejs", {})
})

module.exports = router
