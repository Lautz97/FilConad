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
router.post("/dump", async (req, res, next) => {
	if (await new (require("../controllers"))().dropper(req.body.nomeCollezione)) {
		res.redirect("/")
	} else console.log("error while deleting " + req.body.nomeCollezione)
})

module.exports = router
